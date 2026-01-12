#!/usr/bin/env python3
"""
Populate database with menu data from frontend
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Menu data from frontend/restaurants/gus.ts
GUS_MENU_DATA = [
    {
        "category_name": "Entradas",
        "description": "Deliciosos aperitivos para comenzar",
        "sort_order": 1,
        "items": [
            {
                "frontend_id": "1",
                "name": "Bruschetta Italiana",
                "description": "Tomates frescos, albahaca, ajo y aceite de oliva sobre pan tostado.",
                "price": 4500,
                "image": "/images/gus/bruschetta.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "2",
                "name": "Carpaccio de Res",
                "description": "Finas láminas de res con parmesano, rúcula y alcaparras.",
                "price": 6800,
                "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Platos Fuertes",
        "description": "Nuestras especialidades principales",
        "sort_order": 2,
        "items": [
            {
                "frontend_id": "3",
                "name": "Hamburguesa Gus",
                "description": "200g de carne angus, queso cheddar, bacon y salsa especial.",
                "price": 8500,
                "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "4",
                "name": "Salmón a la Parrilla",
                "description": "Acompañado de puré de papas y vegetales salteados.",
                "price": 12500,
                "image": "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            },
            {
                "frontend_id": "5",
                "name": "Pasta Carbonara",
                "description": "Auténtica receta italiana con guanciale y pecorino.",
                "price": 7900,
                "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Postres",
        "description": "Dulces tentaciones para finalizar",
        "sort_order": 3,
        "items": [
            {
                "frontend_id": "cheesecake",
                "name": "Cheesecake NY",
                "description": "Clásico cheesecake estilo New York con salsa de frutos rojos.",
                "price": 4500,
                "image": "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop",
                "is_recommended": True
            },
            {
                "frontend_id": "cookie",
                "name": "Choco Cookie Skillet",
                "description": "Galleta horneada al momento con helado de vainilla.",
                "price": 3800,
                "image": "/images/gus/skillet.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "brownie",
                "name": "Brownie Fudge",
                "description": "Con nueces y doble chocolate.",
                "price": 3500,
                "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            }
        ]
    }
]


async def populate_menu():
    """Populate Gus restaurant with menu data from frontend"""

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

        # Get Gus restaurant ID
        restaurant = await conn.fetchrow(
            "SELECT id FROM restaurants WHERE slug = 'gus'"
        )

        if not restaurant:
            print("❌ Gus restaurant not found!")
            return False

        restaurant_id = restaurant['id']
        print(f"✅ Found Gus restaurant: {restaurant_id}")

        # Create mapping for frontend ID → database UUID
        frontend_to_uuid = {}

        # Process each category
        for category_data in GUS_MENU_DATA:
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

        print(f"\n🎉 Menu populated successfully!")
        print(f"📋 Frontend ID → Database UUID mapping:")
        for frontend_id, db_uuid in frontend_to_uuid.items():
            print(f"   {frontend_id} → {db_uuid}")

        await conn.close()
        return frontend_to_uuid

    except Exception as e:
        print(f"❌ Failed to populate menu: {e}")
        return False


if __name__ == "__main__":
    mapping = asyncio.run(populate_menu())
    if mapping:
        print(f"\n✅ SUCCESS! Now you can place orders with real menu items.")
    else:
        print(f"\n❌ FAILED to populate menu.")