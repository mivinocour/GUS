#!/usr/bin/env python3
"""
Add tables for existing Olive Garden restaurant
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def add_tables_for_olive_garden():
    """Add tables for existing Olive Garden restaurant"""
    # Disable prepared statements for Supabase pgbouncer
    conn = await asyncpg.connect(os.getenv("DATABASE_URL"), statement_cache_size=0)

    try:
        print("🔍 Looking for Olive Garden restaurant...")

        # Find Olive Garden restaurant
        restaurant_id = await conn.fetchval("""
            SELECT id FROM restaurants WHERE slug = 'olivegarden'
        """)

        if not restaurant_id:
            print("❌ Olive Garden restaurant not found. Please create it first.")
            return

        print(f"✅ Found Olive Garden (ID: {restaurant_id})")

        # Check if tables already exist
        existing_tables = await conn.fetchval("""
            SELECT COUNT(*) FROM tables WHERE restaurant_id = $1
        """, restaurant_id)

        if existing_tables > 0:
            print(f"⚠️  Found {existing_tables} existing tables. Skipping table creation.")
            return

        # Create tables for the restaurant
        print(f"🪑 Creating tables for Olive Garden...")
        for table_num in range(1, 21):  # Create tables 1-20
            await conn.execute("""
                INSERT INTO tables (restaurant_id, table_number)
                VALUES ($1, $2)
            """,
            restaurant_id,
            table_num
            )

        print(f"✅ Successfully created 20 tables for Olive Garden")

    except Exception as e:
        print(f"❌ Error: {e}")
        raise
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(add_tables_for_olive_garden())