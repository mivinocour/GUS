#!/usr/bin/env python3
"""
Populate database with Sikwa menu data from frontend
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Menu data from frontend/restaurants/sikwa.ts
SIKWA_MENU_DATA = [
    {
        "category_name": "Entradas",
        "description": "Deliciosos aperitivos tradicionales",
        "sort_order": 1,
        "items": [
            {
                "frontend_id": "cujiniquil",
                "name": "Cujiniquil",
                "description": "Ensalada de tubérculos rallados y coco",
                "price": 3900,
                "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            }
        ]
    },
    {
        "category_name": "Platos Estrella",
        "description": "Nuestras especialidades principales",
        "sort_order": 2,
        "items": [
            {
                "frontend_id": "pezgallopinto",
                "name": "Pez sobre Gallo Pinto",
                "description": "Filete de pescado fresco sobre gallo pinto con coco",
                "price": 7500,
                "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Bebidas",
        "description": "Bebidas tradicionales de la casa",
        "sort_order": 3,
        "items": [
            {
                "frontend_id": "cacao",
                "name": "Bebida de Cacao",
                "description": "Tradicional de la casa",
                "price": 3200,
                "image": "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            }
        ]
    },
    {
        "category_name": "Postres",
        "description": "Dulces tentaciones para finalizar",
        "sort_order": 4,
        "items": [
            {
                "frontend_id": "frutabosque",
                "name": "Frutas del Bosque",
                "description": "Frutas locales, cacao y miel",
                "price": 3300,
                "image": "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            }
        ]
    }
]


async def populate_sikwa_menu():
    """Populate Sikwa restaurant with menu data from frontend"""

    database_url = os.getenv('DATABASE_URL')
    parsed_url = database_url.replace('postgresql://', '').replace('postgres://', '')

    from urllib.parse import urlparse
    parsed = urlparse('postgresql://' + parsed_url)

    conn_params = {
        'host': parsed.hostname,
        'port': parsed.port or 5432,
        'user': parsed.username,
        'password': parsed.password,
        'database': parsed.path[1:] if parsed.path else 'postgres',
        'statement_cache_size': 0
    }

    try:
        conn = await asyncpg.connect(**conn_params)

        # Get Sikwa restaurant ID
        restaurant = await conn.fetchrow(
            "SELECT id FROM restaurants WHERE slug = 'sikwa'"
        )

        if not restaurant:
            print("❌ Sikwa restaurant not found!")
            return False

        restaurant_id = restaurant['id']
        print(f"✅ Found Sikwa restaurant: {restaurant_id}")

        # Create mapping for frontend ID → database UUID
        frontend_to_uuid = {}

        # Process each category
        for category_data in SIKWA_MENU_DATA:
            print(f"\n📂 Processing category: {category_data['category_name']}")

            # Check if category exists first
            existing_category = await conn.fetchrow("""
                SELECT id FROM menu_categories
                WHERE restaurant_id = $1 AND name = $2
            """, restaurant_id, category_data['category_name'])

            if existing_category:
                category_id = existing_category['id']
                print(f"   ♻️  Using existing category: {category_id}")
            else:
                # Insert new category
                category_id = await conn.fetchval("""
                    INSERT INTO menu_categories (restaurant_id, name, description, sort_order)
                    VALUES ($1, $2, $3, $4)
                    RETURNING id
                """, restaurant_id, category_data['category_name'],
                    category_data['description'], category_data['sort_order'])

            print(f"   ✅ Category ID: {category_id}")

            # Insert menu items
            for item in category_data['items']:
                # Check if item exists first
                existing_item = await conn.fetchrow("""
                    SELECT id FROM menu_items
                    WHERE restaurant_id = $1 AND name = $2
                """, restaurant_id, item['name'])

                if existing_item:
                    item_id = existing_item['id']
                    print(f"   ♻️  Using existing item: {item['name']} → {item_id}")
                else:
                    # Insert new item
                    item_id = await conn.fetchval("""
                        INSERT INTO menu_items
                        (restaurant_id, category_id, name, description, price, image, is_available, is_recommended)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING id
                    """, restaurant_id, category_id, item['name'], item['description'],
                        item['price'], item['image'], True, item['is_recommended'])
                    print(f"   ✅ Created item: {item['name']} → {item_id}")

                # Store mapping
                frontend_to_uuid[item['frontend_id']] = item_id
                print(f"   ✅ {item['name']}: {item['frontend_id']} → {item_id}")

        print(f"\n🎉 Sikwa menu populated successfully!")
        print(f"📋 Frontend ID → Database UUID mapping:")
        for frontend_id, db_uuid in frontend_to_uuid.items():
            print(f"   {frontend_id} → {db_uuid}")

        await conn.close()
        return frontend_to_uuid

    except Exception as e:
        print(f"❌ Failed to populate Sikwa menu: {e}")
        return False


if __name__ == "__main__":
    mapping = asyncio.run(populate_sikwa_menu())
    if mapping:
        print(f"\n✅ SUCCESS! Sikwa menu items added to database.")
        print(f"\nAdd these to /frontend/services/menuMapping.ts:")
        print("// Sikwa menu items:")
        for frontend_id, db_uuid in mapping.items():
            print(f"  '{frontend_id}': '{db_uuid}',  // Sikwa item")
    else:
        print(f"\n❌ FAILED to populate Sikwa menu.")