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
    "logo": "https://images.unsplash.com/photo-1554679665-f5537cf9b5ff?auto=format&fit=crop&q=80&w=200",
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
                "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og2",
                "name": "Calamari",
                "description": "Hand-breaded, lightly fried and served with marinara and spicy ranch.",
                "price": 7200,
                "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600",
                "is_recommended": False
            },
            {
                "frontend_id": "og3",
                "name": "Stuffed Mushrooms",
                "description": "Mushrooms stuffed with clams, shrimp, herb breadcrumbs and parmesan.",
                "price": 6800,
                "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=600",
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
                "image": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og5",
                "name": "Spaghetti & Meatballs",
                "description": "Traditional meat sauce and meatballs over spaghetti.",
                "price": 11800,
                "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og6",
                "name": "Chicken Parmigiana",
                "description": "Crispy, tender chicken breast topped with marinara and melted mozzarella.",
                "price": 14200,
                "image": "https://images.unsplash.com/photo-1565299585323-38174c364c3d?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og7",
                "name": "Lasagna Classico",
                "description": "Layers of pasta, meat sauce and cheese, baked until bubbly.",
                "price": 13900,
                "image": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600",
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
                "image": "https://images.unsplash.com/photo-1612392061787-2766c4cf8de8?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og9",
                "name": "Tour of Italy",
                "description": "Three classics: chicken parmigiana, lasagna classico and fettuccine alfredo.",
                "price": 18500,
                "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&q=80&w=600",
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
                "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600",
                "is_recommended": True
            },
            {
                "frontend_id": "og11",
                "name": "Chocolate Brownie Lasagna",
                "description": "Rich chocolate brownie layered with chocolate mousse.",
                "price": 4800,
                "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
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

        # Create tables for the restaurant
        print(f"\n🪑 Creating tables for Olive Garden...")
        for table_num in range(1, 21):  # Create tables 1-20
            await conn.execute("""
                INSERT INTO tables (restaurant_id, table_number, capacity, is_active)
                VALUES ($1, $2, $3, $4)
            """,
            restaurant_id,
            table_num,
            4,  # Default capacity of 4
            True  # is_active
            )

        print(f"✅ Created 20 tables for Olive Garden")

        print(f"\n🎉 Successfully created Olive Garden with {len([item for cat in OLIVE_GARDEN_MENU_DATA for item in cat['items']])} menu items and 20 tables!")

    except Exception as e:
        print(f"❌ Error: {e}")
        raise
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(create_olive_garden())