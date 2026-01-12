import os
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from typing import AsyncGenerator
import logging

load_dotenv()

logger = logging.getLogger(__name__)


class DatabaseManager:
    def __init__(self):
        self.database_url = os.getenv("DATABASE_URL", "")
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable is required")

        # Convert to async URL and add prepared statements disable parameter
        if self.database_url.startswith("postgresql://"):
            self.async_database_url = self.database_url.replace(
                "postgresql://", "postgresql+asyncpg://", 1
            )
        else:
            self.async_database_url = self.database_url

        # Keep the async URL as is - asyncpg doesn't support prepared_statements parameter

        # Create async engine with Supabase PgBouncer compatibility
        import uuid

        def unique_prepared_statement_name():
            """Generate unique name for each prepared statement to avoid conflicts"""
            return f"stmt_{uuid.uuid4().hex[:8]}"

        self.async_engine = create_async_engine(
            self.async_database_url,
            echo=False,  # Set to True for SQL debugging
            pool_size=1,  # Minimal pool for PgBouncer
            max_overflow=0,  # No overflow for PgBouncer
            pool_pre_ping=False,  # Disable pre-ping to avoid extra queries
            pool_recycle=-1,  # Disable pool recycling
            connect_args={
                "statement_cache_size": 0,  # Disable asyncpg statement cache
                "prepared_statement_name_func": unique_prepared_statement_name,  # Unique names
                "ssl": "require"
            },
            # Disable prepared statements and caching at SQLAlchemy level
            execution_options={
                "compiled_cache": {},
                "autocommit": False
            },
            future=True  # Use future mode for better compatibility
        )

        # Create session factory
        self.async_session_factory = async_sessionmaker(
            bind=self.async_engine,
            class_=AsyncSession,
            expire_on_commit=False
        )

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        """Get async database session"""
        async with self.async_session_factory() as session:
            try:
                yield session
                await session.commit()
            except Exception as e:
                await session.rollback()
                logger.error(f"Database session error: {e}")
                raise
            finally:
                await session.close()

    async def close(self):
        """Close database connections"""
        await self.async_engine.dispose()

    async def health_check(self) -> bool:
        """Check database connectivity"""
        try:
            from sqlalchemy import text
            async with self.async_session_factory() as session:
                result = await session.execute(text("SELECT 1"))
                return result.scalar() == 1
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            return False


# Global database manager instance
db_manager = DatabaseManager()


# Dependency for FastAPI
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency for database sessions"""
    async for session in db_manager.get_session():
        yield session


# Utility functions
async def init_database():
    """Initialize database (create tables if needed)"""
    from .models import Base
    from sqlalchemy.ext.asyncio import create_async_engine
    import uuid

    def unique_prepared_statement_name():
        """Generate unique name for each prepared statement to avoid conflicts"""
        return f"stmt_{uuid.uuid4().hex[:8]}"

    # Create a separate engine for DDL operations with same PgBouncer settings
    ddl_url = db_manager.async_database_url
    ddl_engine = create_async_engine(
        ddl_url,
        echo=False,
        pool_size=1,
        max_overflow=0,
        pool_pre_ping=False,
        pool_recycle=-1,
        connect_args={
            "statement_cache_size": 0,
            "prepared_statement_name_func": unique_prepared_statement_name,
            "ssl": "require"
        },
        execution_options={
            "compiled_cache": {},
            "autocommit": False
        },
        future=True
    )

    try:
        async with ddl_engine.begin() as conn:
            # Import all models to ensure they're registered
            from .models import (
                Restaurant, Table, TableUser, MenuCategory,
                MenuItem, Order, OrderItem, Payment
            )

            # Create tables (only if they don't exist)
            await conn.run_sync(Base.metadata.create_all)
            logger.info("Database tables initialized successfully")
    finally:
        await ddl_engine.dispose()


async def cleanup_database():
    """Cleanup database connections"""
    await db_manager.close()
    logger.info("Database connections closed")