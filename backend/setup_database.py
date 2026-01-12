#!/usr/bin/env python3
"""
Database setup script for Gus Food backend.
Runs migrations and seeds initial data.
"""

import asyncio
import subprocess
import sys
from pathlib import Path

from schemas.database import db_manager, init_database
from seed_data import seed_restaurant_data, clear_all_data


async def run_migrations():
    """Run database migrations"""
    print("🔄 Running database migrations...")

    migrations_dir = Path(__file__).parent / "migrations"
    if not migrations_dir.exists():
        print("❌ Migrations directory not found")
        return False

    migration_files = sorted(migrations_dir.glob("*.sql"))
    if not migration_files:
        print("⚠️  No migration files found")
        return True

    # Initialize database connection
    await init_database()

    async with db_manager.get_session() as session:
        try:
            for migration_file in migration_files:
                print(f"   📄 Running {migration_file.name}...")

                # Read migration SQL
                with open(migration_file, 'r', encoding='utf-8') as f:
                    sql_content = f.read()

                # Split by semicolon and execute each statement
                statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]

                for statement in statements:
                    if statement:
                        try:
                            await session.execute(statement)
                        except Exception as e:
                            # Some statements might fail if already applied (e.g., CREATE EXTENSION)
                            # This is expected behavior for idempotent migrations
                            if "already exists" not in str(e).lower():
                                print(f"      ⚠️  Warning in {migration_file.name}: {e}")

                await session.commit()
                print(f"   ✅ Completed {migration_file.name}")

            print("🎉 All migrations completed successfully!")
            return True

        except Exception as e:
            await session.rollback()
            print(f"❌ Migration failed: {e}")
            return False


async def setup_database(reset: bool = False):
    """Complete database setup"""
    print("🚀 Starting Gus Food database setup...")

    try:
        if reset:
            print("\n⚠️  RESETTING DATABASE - All data will be lost!")
            answer = input("Are you sure? Type 'yes' to continue: ")
            if answer.lower() != 'yes':
                print("❌ Setup cancelled")
                return False

            await clear_all_data()

        # Run migrations
        migration_success = await run_migrations()
        if not migration_success:
            print("❌ Database setup failed during migrations")
            return False

        # Seed data
        print("\n🌱 Seeding restaurant data...")
        await seed_restaurant_data()

        print("\n🎉 Database setup completed successfully!")
        print("\n📋 What was created:")
        print("   • Restaurant: Restaurante El Patio (slug: gus)")
        print("   • Restaurant: Sikwa Restaurant (slug: sikwa)")
        print("   • Restaurant: Filippo Ristorante (slug: filippo)")
        print("   • Tables 1-12 for El Patio")
        print("   • Tables 1-8 for Sikwa")
        print("   • Tables 1-6 for Filippo")
        print("   • Full menu for El Patio")
        print("\n🌐 API endpoints now available:")
        print("   • GET /api/restaurants/gus - Get El Patio restaurant data")
        print("   • GET /api/restaurants/sikwa - Get Sikwa restaurant data")
        print("   • GET /api/restaurants/filippo - Get Filippo restaurant data")
        print("   • GET /api/restaurants/gus/tables/1/users - Get users at table 1")

        return True

    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        return False


async def check_database_status():
    """Check if database is set up and populated"""
    print("🔍 Checking database status...")

    try:
        await init_database()

        async with db_manager.get_session() as session:
            # Check if restaurants table exists and has data
            from sqlalchemy import select, func, text

            try:
                result = await session.execute(text("SELECT COUNT(*) FROM restaurants"))
                restaurant_count = result.scalar()

                if restaurant_count == 0:
                    print("❌ Database is empty - run with --setup to initialize")
                    return False
                else:
                    print(f"✅ Database contains {restaurant_count} restaurants")

                    # List restaurants
                    result = await session.execute(text("SELECT name, slug FROM restaurants"))
                    restaurants = result.fetchall()
                    for name, slug in restaurants:
                        print(f"   • {name} (slug: {slug})")

                    return True

            except Exception as e:
                if "does not exist" in str(e):
                    print("❌ Restaurant table does not exist - run with --setup to initialize")
                    return False
                else:
                    raise

    except Exception as e:
        print(f"❌ Database check failed: {e}")
        return False


def main():
    """Main CLI entry point"""
    if len(sys.argv) < 2:
        print("🍽️  Gus Food Database Setup")
        print("\nUsage:")
        print("  python setup_database.py --setup       Setup database with migrations and seed data")
        print("  python setup_database.py --reset       Reset and setup database (WARNING: deletes all data)")
        print("  python setup_database.py --check       Check database status")
        sys.exit(1)

    command = sys.argv[1]

    if command == "--setup":
        success = asyncio.run(setup_database(reset=False))
    elif command == "--reset":
        success = asyncio.run(setup_database(reset=True))
    elif command == "--check":
        success = asyncio.run(check_database_status())
    else:
        print(f"❌ Unknown command: {command}")
        success = False

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()