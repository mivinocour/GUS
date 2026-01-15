#!/usr/bin/env python3
"""
Populate database with Tsunami Sushi menu data from frontend
"""
import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()

# Menu data from frontend/restaurants/tsunami.ts
TSUNAMI_MENU_DATA = [
    {
        "category_name": "Entradas",
        "description": "Deliciosas entradas y aperitivos",
        "sort_order": 1,
        "items": [
            {
                "frontend_id": "arroz-frito-con-lomito",
                "name": "ARROZ FRITO CON LOMITO",
                "description": "Arroz frito salteado con vegetales mixtos y trozos de lomito de res.",
                "price": 13600,
                "image": "/images/tsunami/arroz-frito-con-lomito.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "crispy-gyosa",
                "name": "Crispy Gyosa",
                "description": "Con atún picante o pollo.",
                "price": 8125,
                "image": "/images/tsunami/crispy-gyosa.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "rollos-primavera-crispy",
                "name": "Rollos Primavera Crispy",
                "description": "Con camarón o pollo.",
                "price": 8125,
                "image": "/images/tsunami/rollos-primavera-crispy.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "edamame-basico",
                "name": "Edamame Básico",
                "description": "Orden de edamame en vaina, clásico y ligero para compartir.",
                "price": 4485,
                "image": "/images/tsunami/edamame-basico.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "edamame-spicy-with-garlic",
                "name": "EDAMAME SPICY WITH GARLIC",
                "description": "Orden de edamames con picante",
                "price": 5135,
                "image": "/images/tsunami/edamame-spicy-with-garlic.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tempura-vegetales-con-camaron",
                "name": "TEMPURA VEGETALES CON CAMARÓN",
                "description": "Vegetales tempura con camarón",
                "price": 8944,
                "image": "/images/tsunami/tempura-vegetales-con-camaron.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "arroz-frito-con-pollo",
                "name": "ARROZ FRITO CON POLLO",
                "description": "Arroz frito con pollo.",
                "price": 9750,
                "image": "/images/tsunami/arroz-frito-con-pollo.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tempura-vegetales",
                "name": "Tempura Vegetales",
                "description": "Elaborado con vegetales mixtos rebozados al estilo tempura, crujientes.",
                "price": 5850,
                "image": "/images/tsunami/tempura-vegetales.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "arroz-frito",
                "name": "Arroz Frito",
                "description": "Arroz frito de la casa.",
                "price": 4744,
                "image": "/images/tsunami/arroz-frito.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "poke-surf-tower",
                "name": "Poke Surf Tower",
                "description": "Pescado poke, aguacate y pepino, apilados con won ton chips.",
                "price": 11050,
                "image": "/images/tsunami/poke-surf-tower.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "arroz-frito-mixto",
                "name": "ARROZ FRITO MIXTO",
                "description": "Arroz frito mixto con vegetales y proteínas variadas.",
                "price": 12870,
                "image": "/images/tsunami/arroz-frito-mixto.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tuna-tatake",
                "name": "Tuna Tatake",
                "description": "Sellado con semillas de ajonjoli, cubierto en una salsa de ponzu dulce con ajo.",
                "price": 9360,
                "image": "/images/tsunami/tuna-tatake.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "arroz-frito-con-camaron",
                "name": "ARROZ FRITO CON CAMARÓN",
                "description": "Porción de arroz frito con camarón, ideal como entrada.",
                "price": 11050,
                "image": "/images/tsunami/arroz-frito-con-camaron.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tempura-vegetales-con-mariscos",
                "name": "TEMPURA VEGETALES CON MARISCOS",
                "description": "Vegetales tempura con mariscos agregados",
                "price": 8970,
                "image": "/images/tsunami/tempura-vegetales-con-mariscos.jpg",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "SUSHI ROLLS",
        "description": "Rollos de sushi artesanales",
        "sort_order": 2,
        "items": [
            {
                "frontend_id": "crunch-roll",
                "name": "Crunch Roll",
                "description": "Hecho con kanikama y camarón tempura, cubierto con hojuelas de tempura y salsa de anguila. Todos los rollos son servidos con semillas de ajonjolí, aguacate y pepino.",
                "price": 11570,
                "image": "/images/tsunami/crunch-roll.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "sunburn-roll",
                "name": "Sunburn Roll",
                "description": "California roll cubierto con hojuelas tempura, camarón tempura al horno, servido con salsa de anguila, cebollino y mayonesa picante.",
                "price": 11570,
                "image": "/images/tsunami/sunburn-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "sasha-campbell-roll",
                "name": "Sasha Campbell Roll",
                "description": "Hecho con atún picante y camarón tempura, cubierto con tempura, servido con salsa de anguila y mayonesa picante.",
                "price": 11050,
                "image": "/images/tsunami/sasha-campbell-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tempura-roll",
                "name": "Tempura Roll",
                "description": "Elaborado con atún cajún, queso crema y masago, cubierto en tempura, servido con salsa de anguila.",
                "price": 10270,
                "image": "/images/tsunami/tempura-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "rainbow-roll",
                "name": "Rainbow Roll",
                "description": "California roll cubierto con atún, salmón y pescado blanco.",
                "price": 10394,
                "image": "/images/tsunami/rainbow-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tsunami-signature-roll",
                "name": "Tsunami Signature Roll",
                "description": "Hecho con camarón tempura, kanikama, cubierto de atún y aguacate, servido con salsa de anguila.",
                "price": 11050,
                "image": "/images/tsunami/tsunami-signature-roll.jpg",
                "is_recommended": True
            },
            {
                "frontend_id": "veggie-tempura-avocado-roll",
                "name": "Veggie Tempura & avocado Roll",
                "description": "Elaborado con papel de arroz y crujientes vegetales tempura, cubiertos con aguacate y salsa de anguila.",
                "price": 7690,
                "image": "/images/tsunami/veggie-tempura-avocado-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "fiesta-pack",
                "name": "Fiesta Pack",
                "description": "40 piezas de Sushi entre (California-Crunch-Bruce Lee-Philly)",
                "price": 20252,
                "image": "/images/tsunami/fiesta-pack.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "bobby-special-roll",
                "name": "Bobby Special Roll",
                "description": "California roll cubierto con atún al horno, ajo, cebollino, cubierto con aceite de ajonjolí y salsa de anguila.",
                "price": 10270,
                "image": "/images/tsunami/bobby-special-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "spicy-lobster-roll",
                "name": "Spicy Lobster Roll",
                "description": "Hecho con langosta, cubierto con tempura, servido with salsa de anguila and mayonesa picante.",
                "price": 12870,
                "image": "/images/tsunami/spicy-lobster-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "godzilla-roll",
                "name": "Godzilla Roll",
                "description": "Elaborado con kanikama, cubierto con tempura, servido con salsa ponzu.",
                "price": 8970,
                "image": "/images/tsunami/godzilla-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "veggie-tico-roll",
                "name": "Veggie Tico Roll",
                "description": "Hecho con vegetales mixtos al vapor, cubierto con plátano y aguacate",
                "price": 7690,
                "image": "/images/tsunami/veggie-tico-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "mau-roll",
                "name": "Mau! Roll",
                "description": "Preparado con salmón, piña, cubierto con hojuelas de tempura, servido con \"sweet chili\".",
                "price": 11050,
                "image": "/images/tsunami/mau-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "lonny-roll",
                "name": "Lonny Roll",
                "description": "Hecho con camarón tempura y queso crema, cubierto con kanikama picante, cebollino, aguacate y salsa de anguila.",
                "price": 11050,
                "image": "/images/tsunami/lonny-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "pollo-loco-roll",
                "name": "Pollo Loco Roll",
                "description": "Elaborado con papel de arroz, pollo y piña salteada.",
                "price": 9750,
                "image": "/images/tsunami/pollo-loco-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "hilo-boy-roll",
                "name": "Hilo Boy Roll",
                "description": "Hecho con atún cajún, cubierto de salmón, aguacate y salsa de anguila.",
                "price": 11050,
                "image": "/images/tsunami/hilo-boy-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "raw-veggie-roll",
                "name": "Raw Veggie Roll",
                "description": "Hecho con hoja de pepino y vegetales mixtos, cubierto con aguacate y salsa de anguila",
                "price": 7150,
                "image": "/images/tsunami/raw-veggie-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "mcgwire-roll",
                "name": "McGwire Roll",
                "description": "Preparado con atún picante, cubierto de tempura, servido con salsa ponzu, ajo y cebollino.",
                "price": 11050,
                "image": "/images/tsunami/mcgwire-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "pura-vida-roll",
                "name": "Pura Vida Roll",
                "description": "Hecho con papel de arroz, mango, camarón tempura y kanikama, cubierto con mango y atún picante, servido con aderezos de cítricos, salsa de anguila y salsa de coco.",
                "price": 11050,
                "image": "/images/tsunami/pura-vida-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "california-roll",
                "name": "California Roll",
                "description": "HECHO CON KANIKAMA MAYONESA Y CUBIERTO CON MASAGO",
                "price": 8450,
                "image": "/images/tsunami/california-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "spicy-tuna-roll",
                "name": "Spicy Tuna Roll",
                "description": "ELABORADO CON ATUN SRIRACHA AJO MAYONESA Y ACEITE DE AJONJOLI",
                "price": 9425,
                "image": "/images/tsunami/spicy-tuna-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "bruce-lee-roll",
                "name": "Bruce Lee Roll",
                "description": "CALIFORNIA ROLL CUBIERTO CON ATUN Y AGUACATE SERVIDO CON SALSA DE ANGUILA",
                "price": 9750,
                "image": "/images/tsunami/bruce-lee-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "crab-cali-roll",
                "name": "Crab Cali Roll",
                "description": "California roll cubierto con kanikama, sriracha y aguacate.",
                "price": 9750,
                "image": "/images/tsunami/crab-cali-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "salmon-roll",
                "name": "Salmon Roll",
                "description": "California roll hecho con salmón. Todos los rollos son servidos con semillas de ajonjolí, aguacate y pepino.",
                "price": 9010,
                "image": "/images/tsunami/salmon-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "x-roll",
                "name": "X-Roll",
                "description": "Elaborado con atún cajún y queso crema, cubierto con aguacate y salsa de anguila.",
                "price": 10394,
                "image": "/images/tsunami/x-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "tico-roll",
                "name": "Tico Roll",
                "description": "Elaborado con kanikama y queso crema, cubierto con plátano y aguacate, servido con salsa de anguila.",
                "price": 9750,
                "image": "/images/tsunami/tico-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "spicy-shrimp-roll",
                "name": "Spicy Shrimp Roll",
                "description": "Hecho con camarón tempura, cubierto con salsa de anguila and mayonesa picante.",
                "price": 9010,
                "image": "/images/tsunami/spicy-shrimp-roll.jpg",
                "is_recommended": False
            }
        ]
    },
    {
        "category_name": "Sushi Rolls Temporada",
        "description": "Rollos especiales de temporada",
        "sort_order": 3,
        "items": [
            {
                "frontend_id": "spicy-tuna-deluxe",
                "name": "Spicy Tuna Deluxe",
                "description": "Un Spicy Tuna con cobertura de maduro y bañado con salsa de anguila",
                "price": 4800,
                "image": "/images/tsunami/spicy-tuna-deluxe.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "surfer-roll",
                "name": "Surfer Roll",
                "description": "Un spicy de camaron con la cobertura de piel de salmon crijiente y bañado con salsa de anguila",
                "price": 4800,
                "image": "/images/tsunami/surfer-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "pacific-roll",
                "name": "Pacific Roll",
                "description": "Un philip con cobertura de hojas de hierba buena y mango bañado con una salsa de mango",
                "price": 4800,
                "image": "/images/tsunami/pacific-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "heredia-roll",
                "name": "Heredia Roll",
                "description": "Un salmon roll con piña y cebollino cobertura de ajonjoli y bañado con salsa anguila",
                "price": 4800,
                "image": "/images/tsunami/heredia-roll.jpg",
                "is_recommended": False
            },
            {
                "frontend_id": "madona-roll",
                "name": "Madona Roll",
                "description": "California con spicy mayo, cubierto de aguacate y cebollino bañado con salsa de anguila",
                "price": 4800,
                "image": "/images/tsunami/madona-roll.jpg",
                "is_recommended": False
            }
        ]
    }
]


async def populate_tsunami_menu():
    """Populate Tsunami Sushi restaurant with menu data from frontend"""

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

        # Get Tsunami restaurant ID
        restaurant = await conn.fetchrow(
            "SELECT id FROM restaurants WHERE slug = 'tsunamisushi'"
        )

        if not restaurant:
            print("❌ Tsunami Sushi restaurant not found!")
            print("   Make sure you've added the restaurant to Supabase with slug 'tsunamisushi'")
            return False

        restaurant_id = restaurant['id']
        print(f"✅ Found Tsunami Sushi restaurant: {restaurant_id}")

        # Create mapping for frontend ID → database UUID
        frontend_to_uuid = {}

        # Process each category
        for category_data in TSUNAMI_MENU_DATA:
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

        print(f"\n🎉 Tsunami Sushi menu populated successfully!")
        print(f"📋 Frontend ID → Database UUID mapping:")
        print(f"\n// Tsunami Sushi menu items:")
        for frontend_id, db_uuid in sorted(frontend_to_uuid.items()):
            print(f"  '{frontend_id}': '{db_uuid}',")

        await conn.close()
        return frontend_to_uuid

    except Exception as e:
        print(f"❌ Failed to populate Tsunami menu: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    mapping = asyncio.run(populate_tsunami_menu())
    if mapping:
        print(f"\n✅ SUCCESS! Tsunami Sushi menu items added to database.")
        print(f"\n📝 Next steps:")
        print(f"   1. Copy the UUID mappings above")
        print(f"   2. Add them to /frontend/services/menuMapping.ts in MENU_ID_MAPPING")
    else:
        print(f"\n❌ FAILED to populate Tsunami menu.")
