#!/usr/bin/env python3
"""
Populate database with Olive Garden menu data
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Olive Garden restaurant data
RESTAURANT_DATA = {
    "name": "Olive Garden",
    "slug": "olive-garden",
    "description": "When you're here, you're family.",
    "address": "123 Italian Way, Costa Rica",
    "phone": "+506 2222-6666",
    "logo": "/images/olive-garden/logo.png",
    "colors": {
        "primary": "#006633",    # Olive Garden green
        "secondary": "#CC9900",  # Gold
        "accent": "#8B4513"      # Brown
    }
}

# Menu categories with items
OLIVE_GARDEN_MENU_DATA = [
    {
        "category_name": "Appetizers",
        "description": "Start your meal the Italian way",
        "sort_order": 1,
        "items": [
            {
                "frontend_id": "og1",
                "name": "Breadsticks",
                "description": "Warm, garlic breadsticks served with marinara sauce.",
                "price": 3500,  # ¢3,500
                "image": "/images/olive-garden/breadsticks.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og2",
                "name": "Calamari",
                "description": "Hand-breaded, lightly fried and served with marinara and spicy ranch.",
                "price": 7200,
                "image": "/images/olive-garden/calamari.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "og3",
                "name": "Stuffed Mushrooms",
                "description": "Mushrooms stuffed with clams, shrimp, herb breadcrumbs and parmesan.",
                "price": 6800,
                "image": "/images/olive-garden/stuffed-mushrooms.jpg",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Pasta",
        "description": "Classic Italian pasta dishes",
        "sort_order": 2,
        "items": [
            {
                "frontend_id": "og4",
                "name": "Fettuccine Alfredo",
                "description": "Rich parmesan cream sauce with a hint of roasted garlic over fettuccine.",
                "price": 12500,
                "image": "/images/olive-garden/fettuccine-alfredo.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og5",
                "name": "Spaghetti & Meatballs",
                "description": "Traditional meat sauce and meatballs over spaghetti.",
                "price": 11800,
                "image": "/images/olive-garden/spaghetti-meatballs.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og6",
                "name": "Chicken Parmigiana",
                "description": "Crispy, tender chicken breast topped with marinara and melted mozzarella.",
                "price": 14200,
                "image": "/images/olive-garden/chicken-parmigiana.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og7",
                "name": "Lasagna Classico",
                "description": "Layers of pasta, meat sauce and cheese, baked until bubbly.",
                "price": 13900,
                "image": "/images/olive-garden/lasagna.jpg",
                "is_recommended": True
            }
        ]
    },
    {
        "category_name": "Entrees",
        "description": "Hearty Italian-inspired main courses",
        "sort_order": 3,
        "items": [
            {
                "frontend_id": "og8",
                "name": "Chicken Scampi",
                "description": "Tender chicken with bell peppers and onions in a creamy scampi sauce.",
                "price": 15600,
                "image": "/images/olive-garden/chicken-scampi.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og9",
                "name": "Tour of Italy",
                "description": "Three classics: chicken parmigiana, lasagna classico and fettuccine alfredo.",
                "price": 18500,
                "image": "/images/olive-garden/tour-italy.jpg",
                "is_recommended": True
            }
        ]
    },
    {
        "category_name": "Desserts",
        "description": "Sweet endings to your meal",
        "sort_order": 4,
        "items": [
            {
                "frontend_id": "og10",
                "name": "Tiramisu",
                "description": "The classic Italian dessert with ladyfingers, mascarpone and cocoa.",
                "price": 5200,
                "image": "/images/olive-garden/tiramisu.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "og11",
                "name": "Chocolate Brownie Lasagna",
                "description": "Rich chocolate brownie layered with chocolate mousse.",
                "price": 4800,
                "image": "/images/olive-garden/brownie-lasagna.jpg",
                "is_recommended": False
            }
        ]
    }
]

async def create_olive_garden():
    """Create Olive Garden restaurant with menu"""
    conn = await asyncpg.connect(os.getenv("DATABASE_URL"))

    try:
        print("🫒 Creating Olive Garden restaurant...")

        # Insert restaurant
        restaurant_id = await conn.fetchval("""
            INSERT INTO restaurants (name, slug, description, address, phone, logo, colors)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        """,
        RESTAURANT_DATA["name"],
        RESTAURANT_DATA["slug"],
        RESTAURANT_DATA["description"],
        RESTAURANT_DATA["address"],
        RESTAURANT_DATA["phone"],
        RESTAURANT_DATA["logo"],
        RESTAURANT_DATA["colors"]
        )

        print(f"✅ Created restaurant: {RESTAURANT_DATA['name']} (ID: {restaurant_id})")

        # Insert categories and menu items
        for category_data in OLIVE_GARDEN_MENU_DATA:
            print(f"\n📂 Adding category: {category_data['category_name']}")

            # Insert category
            category_id = await conn.fetchval("""
                INSERT INTO menu_categories (restaurant_id, name, description, sort_order)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            """,
            restaurant_id,
            category_data["category_name"],
            category_data["description"],
            category_data["sort_order"]
            )

            # Insert menu items
            for item in category_data["items"]:
                await conn.execute("""
                    INSERT INTO menu_items (
                        restaurant_id, category_id, name, description,
                        price, image, is_recommended, is_available
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                restaurant_id,
                category_id,
                item["name"],
                item["description"],
                item["price"],
                item["image"],
                item["is_recommended"],
                True  # is_available
                )

                print(f"   ✅ Added: {item['name']} (₡{item['price']})")

        print(f"\n🎉 Successfully created Olive Garden with {len([item for cat in OLIVE_GARDEN_MENU_DATA for item in cat['items']])} menu items!")

    except Exception as e:
        print(f"❌ Error: {e}")
        raise
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(create_olive_garden())