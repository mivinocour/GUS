"""
Database seeding script for Gus Food restaurants.
Populates the database with restaurant data from frontend configuration.
"""

import asyncio
import json
import uuid
from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from schemas.models import Restaurant, Table, MenuCategory, MenuItem
from schemas.database import db_manager, init_database

# Restaurant data mapping (from frontend/restaurants/)
RESTAURANT_DATA = {
    "gus": {
        "name": "Restaurante El Patio",
        "slug": "gus",
        "logo": None,
        "colors": {
            "primary": "#2563EB",
            "primary-dark": "#1d4ed8",
            "background": "#F8FAFC"
        },
        "address": "San José, Costa Rica",
        "phone": "+506 2222-3333",
        "email": "info@elpatio.cr",
        "tables": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],  # Table numbers
        "menu": [
            {
                "name": "Entradas",
                "description": "Deliciosos aperitivos para comenzar",
                "sort_order": 1,
                "items": [
                    {
                        "name": "Bruschetta Italiana",
                        "description": "Tomates frescos, albahaca, ajo y aceite de oliva sobre pan tostado.",
                        "price": 4500,  # Price in colones (₡45.00)
                        "image": "/images/gus/bruschetta.jpg",
                        "is_available": True,
                        "is_recommended": False
                    },
                    {
                        "name": "Carpaccio de Res",
                        "description": "Finas láminas de res con parmesano, rúcula y alcaparras.",
                        "price": 6800,
                        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
                        "is_available": True,
                        "is_recommended": False
                    }
                ]
            },
            {
                "name": "Platos Fuertes",
                "description": "Nuestras especialidades principales",
                "sort_order": 2,
                "items": [
                    {
                        "name": "Hamburguesa Gus",
                        "description": "200g de carne angus, queso cheddar, bacon y salsa especial.",
                        "price": 8500,
                        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
                        "is_available": True,
                        "is_recommended": True
                    },
                    {
                        "name": "Salmón a la Parrilla",
                        "description": "Acompañado de puré de papas y vegetales salteados.",
                        "price": 12500,
                        "image": "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=600",
                        "is_available": True,
                        "is_recommended": False
                    },
                    {
                        "name": "Pasta Carbonara",
                        "description": "Auténtica receta italiana con guanciale y pecorino.",
                        "price": 7900,
                        "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600",
                        "is_available": True,
                        "is_recommended": False
                    }
                ]
            },
            {
                "name": "Postres",
                "description": "Dulces tentaciones para finalizar",
                "sort_order": 3,
                "items": [
                    {
                        "name": "Cheesecake NY",
                        "description": "Clásico cheesecake estilo New York con salsa de frutos rojos.",
                        "price": 4500,
                        "image": "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop",
                        "is_available": True,
                        "is_recommended": True
                    },
                    {
                        "name": "Choco Cookie Skillet",
                        "description": "Galleta horneada al momento con helado de vainilla.",
                        "price": 3800,
                        "image": "/images/gus/skillet.jpg",
                        "is_available": True,
                        "is_recommended": True
                    },
                    {
                        "name": "Brownie Fudge",
                        "description": "Con nueces y doble chocolate.",
                        "price": 3500,
                        "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
                        "is_available": True,
                        "is_recommended": False
                    }
                ]
            }
        ]
    },
    "sikwa": {
        "name": "Sikwa Restaurant",
        "slug": "sikwa",
        "logo": None,
        "colors": {
            "primary": "#059669",
            "primary-dark": "#047857",
            "background": "#F0FDF4"
        },
        "address": "Escazú, Costa Rica",
        "phone": "+506 2289-4444",
        "email": "info@sikwa.cr",
        "tables": [1, 2, 3, 4, 5, 6, 7, 8],
        "menu": [
            {
                "name": "Especialidades",
                "description": "Nuestros platos característicos",
                "sort_order": 1,
                "items": []  # Add specific items later
            }
        ]
    },
    "filippo": {
        "name": "Filippo Ristorante",
        "slug": "filippo",
        "logo": None,
        "colors": {
            "primary": "#DC2626",
            "primary-dark": "#B91C1C",
            "background": "#FEF2F2"
        },
        "address": "San Pedro, Costa Rica",
        "phone": "+506 2225-5555",
        "email": "info@filippo.cr",
        "tables": [1, 2, 3, 4, 5, 6],
        "menu": [
            {
                "name": "Pasta",
                "description": "Auténtica pasta italiana",
                "sort_order": 1,
                "items": []  # Add specific items later
            }
        ]
    }
}


async def seed_restaurant_data():
    """Seed database with restaurant, table, and menu data."""

    print("🌱 Starting database seeding...")

    # Initialize database
    await init_database()

    async with db_manager.get_session() as session:
        try:
            for slug, data in RESTAURANT_DATA.items():
                print(f"\n📍 Seeding restaurant: {data['name']} ({slug})")

                # Check if restaurant already exists
                result = await session.execute(
                    select(Restaurant).where(Restaurant.slug == slug)
                )
                existing_restaurant = result.scalar_one_or_none()

                if existing_restaurant:
                    print(f"   ✅ Restaurant '{slug}' already exists, skipping...")
                    continue

                # Create restaurant
                restaurant = Restaurant(
                    name=data["name"],
                    slug=data["slug"],
                    logo=data["logo"],
                    colors=data["colors"],
                    address=data["address"],
                    phone=data["phone"],
                    email=data["email"]
                )
                session.add(restaurant)
                await session.flush()  # Get the restaurant ID

                print(f"   ✅ Created restaurant: {restaurant.name}")

                # Create tables
                for table_num in data["tables"]:
                    table = Table(
                        restaurant_id=restaurant.id,
                        table_number=table_num,
                        seats=4,  # Default 4 seats per table
                        status="available"
                    )
                    session.add(table)

                print(f"   ✅ Created {len(data['tables'])} tables")

                # Create menu categories and items
                for menu_category_data in data["menu"]:
                    # Create category
                    category = MenuCategory(
                        restaurant_id=restaurant.id,
                        name=menu_category_data["name"],
                        description=menu_category_data["description"],
                        sort_order=menu_category_data["sort_order"]
                    )
                    session.add(category)
                    await session.flush()  # Get the category ID

                    print(f"   ✅ Created category: {category.name}")

                    # Create menu items
                    for item_data in menu_category_data["items"]:
                        menu_item = MenuItem(
                            restaurant_id=restaurant.id,
                            category_id=category.id,
                            name=item_data["name"],
                            description=item_data["description"],
                            price=item_data["price"],  # Price in cents
                            image=item_data["image"],
                            is_available=item_data["is_available"],
                            is_recommended=item_data["is_recommended"]
                        )
                        session.add(menu_item)

                    print(f"   ✅ Created {len(menu_category_data['items'])} menu items")

            # Commit all changes
            await session.commit()
            print("\n🎉 Database seeding completed successfully!")

        except Exception as e:
            await session.rollback()
            print(f"\n❌ Error during seeding: {e}")
            raise


async def clear_all_data():
    """Clear all restaurant data - use with caution!"""
    print("🗑️  Clearing all restaurant data...")

    async with db_manager.get_session() as session:
        try:
            # Delete in correct order (respecting foreign key constraints)
            await session.execute("DELETE FROM order_items")
            await session.execute("DELETE FROM orders")
            await session.execute("DELETE FROM menu_items")
            await session.execute("DELETE FROM menu_categories")
            await session.execute("DELETE FROM tables")
            await session.execute("DELETE FROM restaurants")

            await session.commit()
            print("✅ All data cleared successfully")

        except Exception as e:
            await session.rollback()
            print(f"❌ Error clearing data: {e}")
            raise


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "--clear":
        # Clear all data first
        asyncio.run(clear_all_data())

    # Seed the data
    asyncio.run(seed_restaurant_data())