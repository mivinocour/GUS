#!/usr/bin/env python3
"""
Simple database setup script that doesn't rely on model imports
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Restaurant data
RESTAURANTS = [
    {
        "slug": "gus",
        "name": "Restaurante El Patio",
        "colors": '{"primary": "#2563EB", "primary-dark": "#1d4ed8", "background": "#F8FAFC"}',
        "address": "San José, Costa Rica",
        "phone": "+506 2222-3333",
        "email": "info@elpatio.cr"
    },
    {
        "slug": "sikwa",
        "name": "Sikwa Restaurant",
        "colors": '{"primary": "#059669", "primary-dark": "#047857", "background": "#F0FDF4"}',
        "address": "Escazú, Costa Rica",
        "phone": "+506 2289-4444",
        "email": "info@sikwa.cr"
    },
    {
        "slug": "filippo",
        "name": "Filippo Ristorante",
        "colors": '{"primary": "#DC2626", "primary-dark": "#B91C1C", "background": "#FEF2F2"}',
        "address": "San Pedro, Costa Rica",
        "phone": "+506 2225-5555",
        "email": "info@filippo.cr"
    }
]

async def setup_database():
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL not found in .env file")
        return False

    # Parse database URL for asyncpg
    if database_url.startswith('postgresql://') or database_url.startswith('postgres://'):
        # Extract connection details
        from urllib.parse import urlparse
        parsed = urlparse(database_url)

        conn_params = {
            'host': parsed.hostname,
            'port': parsed.port or 5432,
            'user': parsed.username,
            'password': parsed.password,
            'database': parsed.path[1:] if parsed.path else 'postgres'
        }
    else:
        print("❌ Invalid database URL format")
        return False

    try:
        print("🔄 Connecting to database...")
        # Disable prepared statements for Supabase pooler
        conn = await asyncpg.connect(**conn_params, statement_cache_size=0)

        print("📋 Running migrations...")

        # Add slug column if it doesn't exist
        try:
            await conn.execute("""
                ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS slug VARCHAR(50) UNIQUE;
            """)
            print("   ✅ Added slug column to restaurants")
        except Exception as e:
            print(f"   ⚠️  Slug column: {e}")

        # Insert restaurants
        for restaurant in RESTAURANTS:
            try:
                await conn.execute("""
                    INSERT INTO restaurants (slug, name, colors, address, phone, email)
                    VALUES ($1, $2, $3::jsonb, $4, $5, $6)
                    ON CONFLICT (slug) DO UPDATE SET
                        name = EXCLUDED.name,
                        colors = EXCLUDED.colors,
                        address = EXCLUDED.address,
                        phone = EXCLUDED.phone,
                        email = EXCLUDED.email
                """, restaurant['slug'], restaurant['name'], restaurant['colors'],
                    restaurant['address'], restaurant['phone'], restaurant['email'])

                print(f"   ✅ Upserted restaurant: {restaurant['name']}")

                # Get restaurant ID for tables
                restaurant_id = await conn.fetchval(
                    "SELECT id FROM restaurants WHERE slug = $1", restaurant['slug']
                )

                # Create tables for each restaurant
                table_counts = {"gus": 12, "sikwa": 8, "filippo": 6}
                table_count = table_counts.get(restaurant['slug'], 6)

                for i in range(1, table_count + 1):
                    await conn.execute("""
                        INSERT INTO tables (restaurant_id, table_number, seats, status)
                        VALUES ($1, $2, 4, 'available')
                        ON CONFLICT (restaurant_id, table_number) DO NOTHING
                    """, restaurant_id, i)

                print(f"   ✅ Created {table_count} tables for {restaurant['name']}")

            except Exception as e:
                print(f"   ❌ Error with {restaurant['name']}: {e}")

        # Check final status
        restaurant_count = await conn.fetchval("SELECT COUNT(*) FROM restaurants")
        table_count = await conn.fetchval("SELECT COUNT(*) FROM tables")

        print(f"\n🎉 Setup complete!")
        print(f"   📊 {restaurant_count} restaurants")
        print(f"   🪑 {table_count} tables")

        # List restaurants
        restaurants = await conn.fetch("SELECT name, slug FROM restaurants ORDER BY name")
        print("\n🏪 Available restaurants:")
        for row in restaurants:
            print(f"   • {row['name']} (slug: {row['slug']})")

        await conn.close()
        return True

    except Exception as e:
        print(f"❌ Setup failed: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(setup_database())
    if success:
        print("\n✅ Database setup successful!")
        print("🌐 Your API is now ready at:")
        print("   • GET /api/restaurants/gus")
        print("   • GET /api/restaurants/sikwa")
        print("   • GET /api/restaurants/filippo")
    else:
        print("\n❌ Database setup failed!")