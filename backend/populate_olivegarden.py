#!/usr/bin/env python3
"""
Populate database with Olive Garden menu data from frontend
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Recommended items (from recommendations array)
RECOMMENDED_IDS = {
    "tour-of-italy",
    "chicken-alfredo",
    "classic-lasagna"
}

# Menu data from frontend/restaurants/olivegarden.ts
OLIVEGARDEN_MENU_DATA = [
    {
        "category_name": "Appetizers",
        "description": "Start your meal with our delicious appetizers",
        "sort_order": 1,
        "items": [
            {
                "frontend_id": "fried-mozzarella",
                "name": "Fried Mozzarella",
                "description": "Crispy, golden mozzarella cheese served with marinara sauce.",
                "price": 5900,
                "image": "/images/olive-garden/friedmozzarella.jpg..webp",
                "is_recommended": False
            },
            {
                "frontend_id": "spinach-artichoke-dip",
                "name": "Spinach-Artichoke Dip",
                "description": "A mix of spinach, artichokes and five cheeses...",
                "price": 7900,
                "image": "/images/olive-garden/dip.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "dipping-sauces-breadsticks",
                "name": "Never-Ending Dipping Sauces for Breadsticks",
                "description": "Marinara, Alfredo, or Five Cheese Marinara Sauces",
                "price": 2900,
                "image": "/images/olive-garden/sauces.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "shrimp-fritto-misto",
                "name": "Shrimp Fritto Misto",
                "description": "Shrimp mixed with onions and bell peppers, hand-breaded...",
                "price": 8900,
                "image": "/images/olive-garden/fritto.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "fried-lasagna",
                "name": "Fried Lasagna",
                "description": "Fried parmesan-breaded lasagna, topped with parmesan cheese and meat...",
                "price": 6900,
                "image": "/images/olive-garden/lasagnafritta.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "bruschetta",
                "name": "Bruschetta",
                "description": "Traditional mix of fresh chopped tomatoes with basil...",
                "price": 4900,
                "image": "/images/olive-garden/bruschetta.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "meatballs-parmigiana",
                "name": "Meatballs Parmigiana",
                "description": "Hearty meatballs baked in homemade marinara, topped with...",
                "price": 8900,
                "image": "/images/olive-garden/meatballs.png",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Soups and Salads",
        "description": "Fresh soups and salads",
        "sort_order": 2,
        "items": [
            {
                "frontend_id": "chicken-gnocchi",
                "name": "Chicken & Gnocchi",
                "description": "A creamy soup made with roasted chicken, traditional...",
                "price": 4900,
                "image": "/images/olive-garden/gnochi.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "minestrone",
                "name": "Minestrone",
                "description": "Fresh vegetables, beans and pasta in a light...",
                "price": 4900,
                "image": "/images/olive-garden/minestrone.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "zuppa-toscana",
                "name": "Zuppa Toscana",
                "description": "Spicy Italian sausage, fresh kale and russet potatoes...",
                "price": 4900,
                "image": "/images/olive-garden/SSS_Zuppa_Toscana_111422_v1_9391559b-d381-4d41-be9a-aca678026a86.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "house-salad",
                "name": "House salad",
                "description": "Our famous salad prepared with mixed greens, black...",
                "price": 4900,
                "image": "/images/olive-garden/salad.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "never-ending-soup-salad-breadsticks",
                "name": "Never-Ending Soup, Salad & Breadsticks",
                "description": "Our famous breadsticks and salad with your choice...",
                "price": 7900,
                "image": "/images/olive-garden/SoulSaladAndBreadsticks_346ed0e7-5f17-463c-99d2-a8f426d23de1.png.webp",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Favorite Classics",
        "description": "Our most popular classic dishes",
        "sort_order": 3,
        "items": [
            {
                "frontend_id": "herb-grilled-salmon",
                "name": "Herb-Grilled Salmon",
                "description": "Filet grilled to perfection and topped with garlic...",
                "price": 14900,
                "image": "/images/olive-garden/HerbGrilledSalmon_v1.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "salmon-piccata",
                "name": "Salmon Piccata",
                "description": "Perfectly grilled salmon, tossed in a butter, garlic,....",
                "price": 15900,
                "image": "/images/olive-garden/salmonpiccata.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "chicken-shrimp-carbonara",
                "name": "Chicken & Shrimp Carbonara",
                "description": "Chicken, shrimp, and spaghetti tossed in a creamy...",
                "price": 15400,
                "image": "/images/olive-garden/Chicken_ShrimpCarbonara072722_x3_1.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "chicken-piccata",
                "name": "Chicken Piccata",
                "description": "Grilled chicken breast tossed in a butter, garlic,...",
                "price": 12900,
                "image": "/images/olive-garden/chickenpicatta.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "grilled-chicken-margherita",
                "name": "Grilled Chicken Margherita",
                "description": "Grilled chicken breasts topped with fresh tomatoes, mozzarella,...",
                "price": 13900,
                "image": "/images/olive-garden/Chicken_Grilled_Margarita.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "chicken-scampi",
                "name": "Chicken Scampi",
                "description": "Angel hair topped with chicken wrapped in a...",
                "price": 13900,
                "image": "/images/olive-garden/scampi.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "spaghetti-meatballs",
                "name": "Spaghetti & Meatballs",
                "description": "Enjoy Spaghetti and Meatballs with meat sauce or...",
                "price": 10900,
                "image": "/images/olive-garden/meatballs.png",
                "is_recommended": False
            },
            {
                "frontend_id": "five-cheese-baked-ziti",
                "name": "Five Cheese Baked Ziti",
                "description": "Ziti pasta covered in five-cheese marinara sauce and...",
                "price": 10900,
                "image": "/images/olive-garden/five.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "classic-lasagna",
                "name": "Classic Lasagna",
                "description": "Classic lasagna, prepared with layers of pasta, Parmesan...",
                "price": 11900,
                "image": "/images/olive-garden/LasagnaClassico_011924.png.jxl",
                "is_recommended": True  # Recommended
            },
            {
                "frontend_id": "chicken-parmigiana",
                "name": "Chicken Parmigiana",
                "description": "Chicken Parmigiana-style breasts, topped with our marinara sauce...",
                "price": 13900,
                "image": "/images/olive-garden/ChickenParmesan_v2.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "tour-of-italy",
                "name": "Tour of Italy",
                "description": "Three OG classics all on one plate! Chicken...",
                "price": 14900,
                "image": "/images/olive-garden/tourofitaly.png.jxl",
                "is_recommended": True  # Recommended
            }
        ]
    },
    {
        "category_name": "Amazing Alfredos",
        "description": "Creamy alfredo pasta dishes",
        "sort_order": 4,
        "items": [
            {
                "frontend_id": "shrimp-alfredo",
                "name": "Shrimp Alfredo",
                "description": "Creamy homemade fettuccine alfredo mixed with sauteed shrimp",
                "price": 14900,
                "image": "/images/olive-garden/shrimp_nuevo.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "chicken-alfredo",
                "name": "Chicken Alfredo",
                "description": "Grilled chicken slices and our famous Alfredo sauce...",
                "price": 12900,
                "image": "/images/olive-garden/ChickenAlfredo_Dinner.jpg.webp",
                "is_recommended": True  # Recommended
            },
            {
                "frontend_id": "fettuccine-alfredo",
                "name": "Fettuccine Alfredo",
                "description": "Our sauce is prepared daily, every morning, with...",
                "price": 8900,
                "image": "/images/olive-garden/feralfredo.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "steak-gorgonzola-alfredo",
                "name": "Steak Gorgonzola Alfredo",
                "description": "Grilled sirloin* tips over fettuccine alfredo, tossed with gorgonzola...",
                "price": 15900,
                "image": "/images/olive-garden/SteakGorgonzolaAlfredo.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "steak-alfredo",
                "name": "Steak Alfredo",
                "description": "Grilled steak accompanied with fettuccine alfredo",
                "price": 16900,
                "image": "/images/olive-garden/Merch_Steak_Alfredo.png.jxl",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Pronto Bowl (Monday to Friday)",
        "description": "Quick lunch bowls available Monday to Friday",
        "sort_order": 5,
        "items": [
            {
                "frontend_id": "chicken-alfredo-pronto",
                "name": "Chicken Alfredo (Pronto Bowl)",
                "description": "Served with fettuccine",
                "price": 7900,
                "image": "/images/olive-garden/chickenalfredo-pronto.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "lasagna-classico-pronto",
                "name": "Lasagna Classico (Pronto Bowl)",
                "description": "Layers of pasta, Italian cheeses and meat sauce",
                "price": 6900,
                "image": "/images/olive-garden/LasagnaClassico_pronto94f.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "spaghetti-meatballs-pronto",
                "name": "Spaghetti & Meatballs (Pronto Bowl)",
                "description": "Our homemade meat sauce and three meatballs, served...",
                "price": 6400,
                "image": "/images/olive-garden/spaghettiandmeatballs-pronto.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "tortelloni-al-forno-pronto",
                "name": "Tortelloni al Forno (Pronto Bowl)",
                "description": "Tortellonis filled with Asiago cheese, tossed in marinara...",
                "price": 5900,
                "image": "/images/olive-garden/Tortelloni_al_Forno_GrilledChicken_pronto_340a0882-f513-482c-99e4-83d0938ffcc5.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "fettuccine-alfredo-pronto",
                "name": "Fettuccine Alfredo (Pronto Bowl)",
                "description": "Our sauce is prepared daily, every morning, with...",
                "price": 5900,
                "image": "/images/olive-garden/fet_alfredo-pronto.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "margherita-pizza-pronto",
                "name": "Margherita Pizza (Pronto Bowl)",
                "description": "Traditional pizza with marinara sauce, tomato and Italian...",
                "price": 7900,
                "image": "/images/olive-garden/pizza-pronto.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "spaghetti-marinara-meat-pronto",
                "name": "Spaghetti with Marinara or Meat Sauce (Pronto Bowl)",
                "description": "Served with marinara or meat sauce",
                "price": 4900,
                "image": "/images/olive-garden/og-spaghetti-with-meat-sauce-prontojpg.jxl",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Desserts",
        "description": "Sweet endings to your meal",
        "sort_order": 6,
        "items": [
            {
                "frontend_id": "chocolate-lasagna",
                "name": "Chocolate Lasagna",
                "description": "Layers of cake and creamy chocolate mousse sandwiched...",
                "price": 5900,
                "image": "/images/olive-garden/ChocolateLasagna_102623_v1.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "ice-cream-cup",
                "name": "Ice cream cup",
                "description": "Vanilla ice cream cup",
                "price": 1900,
                "image": "/images/olive-garden/helado.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "strawberry-cream-cake",
                "name": "Strawberry Cream Cake",
                "description": "Vanilla sponge cake topped with sweet vanilla cream...",
                "price": 5900,
                "image": "/images/olive-garden/strawberry_cream_cake.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "black-tie-mousse-cake",
                "name": "Black Tie Mousse Cake",
                "description": "Chocolate cake, dark chocolate cheesecake and cream with...",
                "price": 5900,
                "image": "/images/olive-garden/blacktie.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "sicilian-cheesecake",
                "name": "Sicilian Cheesecake",
                "description": "Ricotta cheesecake with butter cookie dough, topped with...",
                "price": 5900,
                "image": "/images/olive-garden/cheesecake.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "tiramisu",
                "name": "Tiramisu",
                "description": "An Italian classic, for coffee lovers",
                "price": 5900,
                "image": "/images/olive-garden/tiramisutest.png.webp",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Children's Menu",
        "description": "Kid-friendly options",
        "sort_order": 7,
        "items": [
            {
                "frontend_id": "create-your-own-pasta-kids",
                "name": "Create Your Own Pasta (Kids Menu)",
                "description": "Create your favorite pasta dish by choosing your...",
                "price": 4900,
                "image": "/images/olive-garden/createyourown.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "ice-cream-cup-kids",
                "name": "Ice Cream Cup (Kids Menu)",
                "description": "Vanilla ice cream with chocolate syrup, whipped cream...",
                "price": 1900,
                "image": "/images/olive-garden/helado.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "smoothie",
                "name": "Smoothie",
                "description": "Refreshing strawberry or banana smoothie.",
                "price": 2900,
                "image": "/images/olive-garden/Smoothie_menu_de_ninosv.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "lasagna-kids",
                "name": "Lasagna (Children's Menu)",
                "description": "Prepared fresh daily with layers of pasta, Italian...",
                "price": 5900,
                "image": "/images/olive-garden/LasagnaClassico_011924.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "chicken-fingers",
                "name": "Chicken Fingers",
                "description": "Lightly breaded chicken tenders, served with potatoes or...",
                "price": 5900,
                "image": "/images/olive-garden/ChickenFingerswithBroccoli_Kids_Jan-2023.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "garden-salad",
                "name": "Garden Salad",
                "description": "Served with our signature Italian dressing (served on...",
                "price": 3900,
                "image": "/images/olive-garden/gardensalad.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "macaroni-cheese",
                "name": "Macaroni & Cheese",
                "description": "Delicious Macaroni and Cheese",
                "price": 5900,
                "image": "/images/olive-garden/MacaroniCheese_2054.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "pizza-kids",
                "name": "Pizza (Kids Menu)",
                "description": "Cheese pizza for kids",
                "price": 5900,
                "image": "/images/olive-garden/pizzaninos.png.jxl",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Drinks",
        "description": "Beverages and drinks",
        "sort_order": 8,
        "items": [
            {
                "frontend_id": "gallon-iced-tea",
                "name": "Gallon of Iced Tea",
                "description": "House-made iced tea, available with or without sugar",
                "price": 2500,
                "image": "/images/olive-garden/IcedTeaArray_04.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "alcoholic-beverages",
                "name": "Alcoholic Beverages",
                "description": "Choose from Spiked Strawberry Lemonade, Mojito, Blue Hawaiian,...",
                "price": 4900,
                "image": "/images/olive-garden/bebidasalcoholicas.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "non-alcoholic-beverages",
                "name": "Non-alcoholic beverages",
                "description": "Choose from Lemonades, Lemonade, Spearmint Lemonade, Raspberry Lemonade,....",
                "price": 1900,
                "image": "/images/olive-garden/bebidasnoalcoholicas.png.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "soft-drinks-refills",
                "name": "Soft drinks with refills",
                "description": "Choose between Coca-Cola, Coca-Cola Zero Sugar, Ginger Ale",
                "price": 2250,
                "image": "/images/olive-garden/Gaseosas.jpg.jxl",
                "is_recommended": False
            },
            {
                "frontend_id": "beers",
                "name": "Beers",
                "description": "Choose between Imperial, Imperial Silver, Imperial Light, Bavaria...",
                "price": 2500,
                "image": "/images/olive-garden/beer.jpg.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "hot-drinks",
                "name": "Hot Drinks",
                "description": "Choose between Espresso, Café Latte, Café Mocha, Cappuccino,...",
                "price": 1500,
                "image": "/images/olive-garden/bebidascalientes.png.webp",
                "is_recommended": False
            },
            {
                "frontend_id": "bottled-water",
                "name": "Bottled water",
                "description": "Choose between Acqua Panna Spring (500 ml), Pellegrino...",
                "price": 1500,
                "image": "/images/olive-garden/bottledwater.jpg.jxl",
                "is_recommended": False
            }
        ]
    }
]


async def populate_olivegarden_menu():
    """Populate Olive Garden restaurant with menu data from frontend"""

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

        # Get Olive Garden restaurant ID
        restaurant = await conn.fetchrow(
            "SELECT id FROM restaurants WHERE slug = 'olivegarden'"
        )

        if not restaurant:
            print("❌ Olive Garden restaurant not found!")
            print("   Make sure you've added Olive Garden to the restaurants table in Supabase first.")
            return False

        restaurant_id = restaurant['id']
        print(f"✅ Found Olive Garden restaurant: {restaurant_id}")

        # Create mapping for frontend ID → database UUID
        frontend_to_uuid = {}

        # Process each category
        for category_data in OLIVEGARDEN_MENU_DATA:
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
                print(f"   ✅ Created category: {category_id}")

            # Insert menu items
            for item in category_data['items']:
                # Check if item exists first
                existing_item = await conn.fetchrow("""
                    SELECT id FROM menu_items
                    WHERE restaurant_id = $1 AND name = $2
                """, restaurant_id, item['name'])

                # Determine if recommended (check both the item flag and the RECOMMENDED_IDS set)
                is_recommended = item.get('is_recommended', False) or item['frontend_id'] in RECOMMENDED_IDS

                if existing_item:
                    item_id = existing_item['id']
                    # Update existing item to ensure is_recommended is correct
                    await conn.execute("""
                        UPDATE menu_items
                        SET is_recommended = $1, price = $2, image = $3, description = $4
                        WHERE id = $5
                    """, is_recommended, item['price'], item['image'], item['description'], item_id)
                    print(f"   ♻️  Updated existing item: {item['name']} → {item_id}")
                else:
                    # Insert new item
                    item_id = await conn.fetchval("""
                        INSERT INTO menu_items
                        (restaurant_id, category_id, name, description, price, image, is_available, is_recommended)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING id
                    """, restaurant_id, category_id, item['name'], item['description'],
                        item['price'], item['image'], True, is_recommended)
                    print(f"   ✅ Created item: {item['name']} → {item_id}")

                # Store mapping
                frontend_to_uuid[item['frontend_id']] = item_id

        print(f"\n🎉 Olive Garden menu populated successfully!")
        print(f"📋 Frontend ID → Database UUID mapping:")
        print("   // Olive Garden restaurant items:")
        for frontend_id, db_uuid in sorted(frontend_to_uuid.items()):
            print(f"   '{frontend_id}': '{db_uuid}',")

        await conn.close()
        return frontend_to_uuid

    except Exception as e:
        print(f"❌ Failed to populate Olive Garden menu: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    mapping = asyncio.run(populate_olivegarden_menu())
    if mapping:
        print(f"\n✅ SUCCESS! Olive Garden menu items added to database.")
        print(f"\n📝 Next steps:")
        print(f"   1. Add the UUID mappings above to /frontend/services/menuMapping.ts")
        print(f"   2. Add the restaurant UUID to RESTAURANT_ID_MAPPING in menuMapping.ts")
    else:
        print(f"\n❌ FAILED to populate Olive Garden menu.")
