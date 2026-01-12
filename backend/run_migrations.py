#!/usr/bin/env python3
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def run_migrations():
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL not found")
        return False

    # Parse connection params
    from urllib.parse import urlparse
    parsed = urlparse(database_url)
    conn_params = {
        'host': parsed.hostname,
        'port': parsed.port or 5432,
        'user': parsed.username,
        'password': parsed.password,
        'database': parsed.path[1:] if parsed.path else 'postgres'
    }

    try:
        conn = await asyncpg.connect(**conn_params)

        # Run each migration step
        migrations = [
            # 1. Basic schema
            """
            -- Enable UUID extension
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            -- Create restaurants table
            CREATE TABLE IF NOT EXISTS restaurants (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                address TEXT,
                phone VARCHAR(20),
                email VARCHAR(255),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            """,

            # 2. Add missing columns to restaurants
            """
            ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS logo TEXT;
            ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '{}';
            ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS slug VARCHAR(50);
            """,

            # 3. Create other tables
            """
            -- Create tables table
            CREATE TABLE IF NOT EXISTS tables (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
                table_number INTEGER NOT NULL,
                seats INTEGER DEFAULT 4,
                status VARCHAR(20) DEFAULT 'available',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                UNIQUE(restaurant_id, table_number)
            );

            -- Create menu categories
            CREATE TABLE IF NOT EXISTS menu_categories (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );

            -- Create menu items
            CREATE TABLE IF NOT EXISTS menu_items (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
                category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price INTEGER NOT NULL,
                image TEXT,
                is_available BOOLEAN DEFAULT true,
                is_recommended BOOLEAN DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );

            -- Create orders table
            CREATE TABLE IF NOT EXISTS orders (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
                table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
                order_number INTEGER NOT NULL,
                total_amount INTEGER DEFAULT 0,
                notes TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            """,

            # 4. Add unique constraint and indexes
            """
            -- Add unique constraint for slug (if not exists)
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint
                    WHERE conname = 'restaurants_slug_unique'
                ) THEN
                    ALTER TABLE restaurants ADD CONSTRAINT restaurants_slug_unique UNIQUE (slug);
                END IF;
            END $$;

            -- Create indexes
            CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON restaurants(slug);
            CREATE INDEX IF NOT EXISTS idx_tables_restaurant_id ON tables(restaurant_id);
            """
        ]

        for i, migration in enumerate(migrations, 1):
            print(f"🔄 Running migration {i}...")
            await conn.execute(migration)
            print(f"✅ Migration {i} completed")

        await conn.close()
        print("🎉 All migrations completed!")
        return True

    except Exception as e:
        print(f"❌ Migration failed: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(run_migrations())