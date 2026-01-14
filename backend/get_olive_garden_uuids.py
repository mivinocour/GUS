#!/usr/bin/env python3
"""
Get Olive Garden menu item UUIDs for frontend mapping
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

async def get_olive_garden_uuids():
    """Get all Olive Garden menu item UUIDs"""
    conn = await asyncpg.connect(os.getenv("DATABASE_URL"), statement_cache_size=0)

    try:
        print("🔍 Getting Olive Garden menu item UUIDs...")

        # Get all menu items for Olive Garden
        results = await conn.fetch("""
            SELECT mi.id, mi.name, mc.name as category_name
            FROM menu_items mi
            JOIN menu_categories mc ON mi.category_id = mc.id
            JOIN restaurants r ON mi.restaurant_id = r.id
            WHERE r.slug = 'olivegarden'
            ORDER BY mc.sort_order, mi.name
        """)

        print(f"\n✅ Found {len(results)} Olive Garden menu items:")
        print("\n// Add these to menuMapping.ts MENU_ID_MAPPING:")

        for row in results:
            # Create a simple frontend ID from the name
            name = row['name']
            frontend_id = name.lower().replace(' ', '').replace('&', '').replace('(', '').replace(')', '').replace(',', '')

            print(f"  '{frontend_id}': '{row['id']}',  // {name}")

        print(f"\nTotal: {len(results)} items")

    except Exception as e:
        print(f"❌ Error: {e}")
        raise
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(get_olive_garden_uuids())