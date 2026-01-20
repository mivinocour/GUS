import { RestaurantData } from '../data';

const filippo: RestaurantData = {
  name: 'Filippo',
  slug: 'filippo',
  logo: null,
  colors: {
    primary: '#8B6F47',
    'primary-dark': '#6B5639',
    background: '#F8FAFC',
  },
  recommendations: [
      {
        "id": "pizza-filippo",
        "name": "Filippo Pizza",
        "description": "Smoked Salmon, Parmesan, Cherry Tomato, Mozzarella, Arugula",
        "price": 13900,
        "category": "BIANCA (SIN SALSA DE TOMATE)",
        "image": "/images/filippo/pizza-filippo.jpg"
      },
      {
        "id": "risotto-de-frutos-del-mar",
        "name": "Risotto de Frutos del Mar",
        "description": "Risotto with Seafood and Napoli Sauce",
        "price": 19900,
        "category": "RISOTTOS & PASTAS",
        "image": "/images/filippo/risotto-frutos-mar.jpg"
      },
      {
        "id": "plato-medio-oriente",
        "name": "Plato Medio Oriente",
        "description": "Falafel, Kibbe, Hummus, Babaganush, Ensalada Israelí, Pita Bread",
        "price": 7600,
        "category": "ENTRADAS | APPETIZERS",
        "image": "/images/filippo/plato-medio-oriente.jpg"
      }
    ],
    "menu": [
      {
        "id": "bebidas-drinks",
        "title": "BEBIDAS | DRINKS",
        "items": [
          {
            "id": "refresco-gaseosa",
            "name": "Coca Cola, Fresca, Ginger Ale, Soda, Coca Zero",
            "description": "Soft drinks",
            "price": 2300,
            "image": "/images/filippo/soda.jpg",
            "category": "BEBIDAS | DRINKS"
          },
          {
            "id": "kombucha-rosa-jamaica",
            "name": "Kombucha Rosa de Jamaica Anís",
            "description": "Hibiscus Anise Kombucha",
            "price": 5600,
            "image": "/images/filippo/kombucha.jpg",
            "category": "BEBIDAS | DRINKS"
          },
          {
            "id": "soda-artesanal-limon-lavanda",
            "name": "Soda Artesanal Limón - Lavanda",
            "description": "Lemon Lavender Soda",
            "price": 5600,
            "image": "/images/filippo/soda-lavanda.jpg",
            "category": "BEBIDAS | DRINKS"
          },
          {
            "id": "soda-artesanal-maracuya-manzanilla",
            "name": "Soda Artesanal Maracuyá - Manzanilla",
            "description": "Passion Fruit Chamomile Soda",
            "price": 5600,
            "image": "/images/filippo/soda-maracuya.jpg",
            "category": "BEBIDAS | DRINKS"
          },
          {
            "id": "agua-rainforest",
            "name": "Agua RainForest (500ml)",
            "description": "Bottled water",
            "price": 4400,
            "image": "/images/filippo/agua.jpg",
            "category": "BEBIDAS | DRINKS"
          }
        ]
      },
      {
        "id": "minerales-mineral-water",
        "title": "MINERALES | MINERAL WATER",
        "items": [
          {
            "id": "aqua-panna-500",
            "name": "Aqua Panna (500 ml)",
            "description": "Mineral water",
            "price": 4700,
            "image": "/images/filippo/aqua-panna.jpg",
            "category": "MINERALES | MINERAL WATER"
          },
          {
            "id": "san-pellegrino-250",
            "name": "San Pellegrino (250 ml)",
            "description": "Sparkling mineral water",
            "price": 3500,
            "image": "/images/filippo/pellegrino-250.jpg",
            "category": "MINERALES | MINERAL WATER"
          },
          {
            "id": "san-pellegrino-500",
            "name": "San Pellegrino (500 ml)",
            "description": "Sparkling mineral water",
            "price": 5600,
            "image": "/images/filippo/pellegrino-500.jpg",
            "category": "MINERALES | MINERAL WATER"
          }
        ]
      },
      {
        "id": "jugos-naturales-fruit-juices",
        "title": "JUGOS NATURALES | FRUIT JUICES",
        "items": [
          {
            "id": "jugos-basicos",
            "name": "Cas, Limonada, Naranja, Papaya, Piña, Sandía",
            "description": "Fresh fruit juices",
            "price": 3000,
            "image": "/images/filippo/jugos.jpg",
            "category": "JUGOS NATURALES | FRUIT JUICES"
          },
          {
            "id": "jugos-especiales",
            "name": "Guanábana, Mango, Melón, Mora, Naranjilla, Naranja-Zanahoria",
            "description": "Special fresh fruit juices",
            "price": 3300,
            "image": "/images/filippo/jugos-especiales.jpg",
            "category": "JUGOS NATURALES | FRUIT JUICES"
          },
          {
            "id": "tomate-preparado",
            "name": "Tomate Preparado",
            "description": "Prepared Tomato juice",
            "price": 3300,
            "image": "/images/filippo/jugo-tomate.jpg",
            "category": "JUGOS NATURALES | FRUIT JUICES"
          },
          {
            "id": "jugo-fresa",
            "name": "Fresa",
            "description": "Strawberry juice",
            "price": 4300,
            "image": "/images/filippo/jugo-fresa.jpg",
            "category": "JUGOS NATURALES | FRUIT JUICES"
          },
          {
            "id": "jugo-mandarina",
            "name": "Mandarina (en temporada)",
            "description": "Tangerine juice (in season)",
            "price": 5000,
            "image": "/images/filippo/jugo-mandarina.jpg",
            "category": "JUGOS NATURALES | FRUIT JUICES"
          }
        ]
      },
      {
        "id": "smoothies",
        "title": "SMOOTHIES",
        "items": [
          {
            "id": "smoothie-gandhi",
            "name": "Gandhi",
            "description": "Turmeric, Pineapple, Banana, Mango, Ginger, Honey, Milk",
            "price": 4300,
            "image": "/images/filippo/smoothie-gandhi.jpg",
            "category": "SMOOTHIES"
          },
          {
            "id": "smoothie-pura-vida",
            "name": "Pura Vida",
            "description": "Strawberry, Lemon, Spearmint, Honey, Coconut Water",
            "price": 4000,
            "image": "/images/filippo/smoothie-puravida.jpg",
            "category": "SMOOTHIES"
          },
          {
            "id": "smoothie-dia-playa",
            "name": "Día de Playa",
            "description": "Papaya, Pineapple, Banana, Honey, Vanilla, Milk",
            "price": 3300,
            "image": "/images/filippo/smoothie-playa.jpg",
            "category": "SMOOTHIES"
          }
        ]
      },
      {
        "id": "entradas-appetizers",
        "title": "ENTRADAS | APPETIZERS",
        "items": [
          {
            "id": "focaccia-caprese",
            "name": "Focaccia Caprese",
            "description": "Fresh mozzarella, tomato, and basil on focaccia",
            "price": 5900,
            "image": "/images/filippo/focaccia-caprese.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "focaccia-romero-ajo",
            "name": "Focaccia Romero o Ajo",
            "description": "Rosemary or Garlic Focaccia",
            "price": 4000,
            "image": "/images/filippo/focaccia-ajo.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "focaccia-carpaccio-salmon",
            "name": "Focaccia Carpaccio Salmón",
            "description": "Salmon Carpaccio on Foccaccia",
            "price": 12100,
            "image": "/images/filippo/focaccia-salmon.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "carpaccio-de-res",
            "name": "Carpaccio de Res",
            "description": "Beef Carpaccio, Arugula, Parmesan, Lemon, EVOO",
            "price": 13100,
            "image": "/images/filippo/carpaccio-res.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "carpaccio-de-salmon",
            "name": "Carpaccio de Salmón",
            "description": "Salmon Carpaccio, Onion, Celery, Sweet Pepper, Capers, Lemon, EVOO",
            "price": 11000,
            "image": "/images/filippo/carpaccio-salmon.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "tartar-salmon-atun",
            "name": "Tartar de Salmón o Atún",
            "description": "Salmon or Tuna Tartare with Oriental Mayonnaise on Crispy Rice",
            "price": 8100,
            "image": "/images/filippo/tartar.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "coctel-camarones",
            "name": "Cóctel de Camarones",
            "description": "Shrimp Cocktail",
            "price": 13200,
            "image": "/images/filippo/coctel-camarones.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "ceviche-pescado",
            "name": "Ceviche de Pescado",
            "description": "Fish Ceviche (Avocado, Onion, Cilantro, Tomato)",
            "price": 10500,
            "image": "/images/filippo/ceviche-pescado.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "ceviche-mixto",
            "name": "Ceviche Mixto",
            "description": "Fish, Shrimp, Avocado, Onion, Cilantro, Tomato",
            "price": 8900,
            "image": "/images/filippo/ceviche-mixto.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "coliflor-al-horno",
            "name": "Coliflor al Horno & Tahini",
            "description": "Baked Cauliflower & Tahini",
            "price": 5900,
            "image": "/images/filippo/coliflor.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "calamares-fritos",
            "name": "Calamares Fritos (En Temporada)",
            "description": "Fried Calamari (In season)",
            "price": 10500,
            "image": "/images/filippo/calamares.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "alitas-pollo-horno",
            "name": "Alitas de Pollo al Horno",
            "description": "Honey-Ginger Sauce or BBQ",
            "price": 12000,
            "image": "/images/filippo/alitas.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "croquetas-risotto-hongos",
            "name": "Croquetas de Risotto y Hongos",
            "description": "Risotto and Mushroom Croquettes (6 units)",
            "price": 5800,
            "image": "/images/filippo/croquetas.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "dedos-mozzarella-app",
            "name": "Dedos de Mozzarella Empanizados & Chutney",
            "description": "Mozzarella Fingers with Chutney",
            "price": 6600,
            "image": "/images/filippo/mozzarella-fingers.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "hongos-rellenos-queso",
            "name": "Hongos Rellenos de Queso",
            "description": "Cheese Stuffed Mushrooms",
            "price": 7900,
            "image": "/images/filippo/hongos-rellenos.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "queso-fundido-horno",
            "name": "Queso Fundido al Horno",
            "description": "Baked Cheese",
            "price": 5000,
            "image": "/images/filippo/queso-fundido.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "plato-quesos-fiambres",
            "name": "Plato de Quesos y Fiambres",
            "description": "Cheese Platter with Salumi and Marinated Vegetables",
            "price": 14900,
            "image": "/images/filippo/tabla-quesos.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "falafel-hummus",
            "name": "Falafel con Hummus",
            "description": "6 pieces of Falafel served with Hummus",
            "price": 5800,
            "image": "/images/filippo/falafel-hummus.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "kibbe-tabule",
            "name": "Kibbe con Ensalada Tabule y Tahini",
            "description": "Kibbe with Tabule Salad and Tahini",
            "price": 6800,
            "image": "/images/filippo/kibbe.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "plato-medio-oriente-app",
            "name": "Plato Medio Oriente",
            "description": "Falafel, Kibbe, Hummus, Babaganush, Ensalada Israelí, Pita Bread",
            "price": 7600,
            "image": "/images/filippo/medio-oriente.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "plato-hummus-pita",
            "name": "Plato de Hummus, Pita & Crudites",
            "description": "Hummus Plate with Pita and Crudites",
            "price": 4600,
            "image": "/images/filippo/hummus-plate.jpg",
            "category": "ENTRADAS | APPETIZERS"
          },
          {
            "id": "plato-babaganush-pita",
            "name": "Plato de Babaganush, Pita & Crudites",
            "description": "Babaganush Plate with Pita and Crudites",
            "price": 5400,
            "image": "/images/filippo/babaganush-plate.jpg",
            "category": "ENTRADAS | APPETIZERS"
          }
        ]
      },
      {
        "id": "sopas-soups",
        "title": "SOPAS | SOUPS",
        "items": [
          {
            "id": "crema-ayote",
            "name": "Crema de Ayote",
            "description": "Pumpkin Cream",
            "price": 6100,
            "image": "/images/filippo/crema-ayote.jpg",
            "category": "SOPAS | SOUPS"
          },
          {
            "id": "sopa-tomate",
            "name": "Sopa de Tomate con Parmesano",
            "description": "Tomato Soup with Parmesan",
            "price": 5500,
            "image": "/images/filippo/sopa-tomate.jpg",
            "category": "SOPAS | SOUPS"
          },
          {
            "id": "sopa-cebolla",
            "name": "Sopa de Cebolla Gratinada",
            "description": "French Onion Soup",
            "price": 6100,
            "image": "/images/filippo/sopa-cebolla.jpg",
            "category": "SOPAS | SOUPS"
          }
        ]
      },
      {
        "id": "ensaladas-salads",
        "title": "ENSALADAS | SALADS",
        "items": [
          {
            "id": "ensalada-verde-mixta",
            "name": "Verde Mixta",
            "description": "Mixed Greens, Mushrooms, Tomato, Carrots, Vinaigrette",
            "price": 5400,
            "image": "/images/filippo/ensalada-mixta.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-quinoa-mediterranea",
            "name": "Quinoa Mediterránea",
            "description": "Cucumber, Avocado, Kalamata Olive, Fig, Tomato, Almond, Chutney, Goat Cheese",
            "price": 8900,
            "image": "/images/filippo/ensalada-quinoa.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-caprese",
            "name": "Caprese",
            "description": "Tomato, Fresh Mozzarella, Basil, Pesto, Balsamic Reduction",
            "price": 8300,
            "image": "/images/filippo/ensalada-caprese.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-capellini-palmitos",
            "name": "Capellini de Palmitos",
            "description": "Hearts of Palm, Cheese, Dried Tomato, Ginger Vinaigrette",
            "price": 11300,
            "image": "/images/filippo/ensalada-palmitos.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-cesar",
            "name": "César",
            "description": "Lettuce, Anchovies, Parmesan, Egg, Croutons, Anchovies Dressing",
            "price": 7900,
            "image": "/images/filippo/ensalada-cesar.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-atun-bronceado",
            "name": "Atún Bronceado",
            "description": "Mixed Lettuce, Tomato, Fungi, Grilled Onion, Almonds, Onion Vinaigrette",
            "price": 10800,
            "image": "/images/filippo/ensalada-atun.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-iceberg",
            "name": "Iceberg",
            "description": "Blue Cheese dressing, Crispy Bacon, Egg, Cherry Tomatoes",
            "price": 7600,
            "image": "/images/filippo/ensalada-iceberg.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-israeli-palmito",
            "name": "Israelí & Palmito Grillado",
            "description": "Tomato, Cucumber, Red Onion, Fresh heart of Palm, Avocado",
            "price": 5200,
            "image": "/images/filippo/ensalada-israeli.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-salmon-nicoise",
            "name": "Salmón Nicoise",
            "description": "Grilled Salmon, Egg, Potato, Tomato, Alfalfa, Arugula, String Beans, Vinaigrette",
            "price": 13700,
            "image": "/images/filippo/ensalada-nicoise.jpg",
            "category": "ENSALADAS | SALADS"
          },
          {
            "id": "ensalada-prosciutto-pera",
            "name": "Prosciutto Crispy & Pera",
            "description": "Mixed Lettuce, Parmesan, Poppyseed Dressing",
            "price": 8900,
            "image": "/images/filippo/ensalada-prosciutto.jpg",
            "category": "ENSALADAS | SALADS"
          }
        ]
      },
      {
        "id": "poke",
        "title": "POKE",
        "items": [
          {
            "id": "poke-salmon",
            "name": "Salmón",
            "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
            "price": 11800,
            "image": "/images/filippo/poke-salmon.jpg",
            "category": "POKE"
          },
          {
            "id": "poke-atun",
            "name": "Atún",
            "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
            "price": 8700,
            "image": "/images/filippo/poke-atun.jpg",
            "category": "POKE"
          },
          {
            "id": "poke-carne",
            "name": "Carne",
            "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
            "price": 12700,
            "image": "/images/filippo/poke-carne.jpg",
            "category": "POKE"
          },
          {
            "id": "poke-pollo",
            "name": "Pollo",
            "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
            "price": 9000,
            "image": "/images/filippo/poke-pollo.jpg",
            "category": "POKE"
          },
          {
            "id": "poke-vegetales",
            "name": "Vegetales Salteados",
            "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
            "price": 7100,
            "image": "/images/filippo/poke-veg.jpg",
            "category": "POKE"
          }
        ]
      },
      {
        "id": "risottos-pastas",
        "title": "RISOTTOS & PASTAS",
        "items": [
          {
            "id": "risotto-ayote",
            "name": "Risotto al Ayote",
            "description": "Pumpkin Risotto",
            "price": 13400,
            "image": "/images/filippo/risotto-ayote.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "risotto-hongos-trufados",
            "name": "Risotto a los Hongos Trufados",
            "description": "Risotto with Mushrooms and Truffle",
            "price": 15700,
            "image": "/images/filippo/risotto-hongos.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "risotto-frutos-mar",
            "name": "Risotto de Frutos del Mar",
            "description": "Risotto with Seafood and Napoli Sauce",
            "price": 19900,
            "image": "/images/filippo/risotto-mar.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "ravioli-carne",
            "name": "Ravioli de Carne en Salsa Napoli",
            "description": "Meat Ravioli in Tomato Sauce",
            "price": 8900,
            "image": "/images/filippo/ravioli.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "tortellini-ricotta",
            "name": "Tortellini de Ricotta en Salsa Aurora con Pesto",
            "description": "Ricotta Filled Tortellini in Aurora Sauce with Pesto",
            "price": 10300,
            "image": "/images/filippo/tortellini-ricotta.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "tortellini-hongos",
            "name": "Tortellini de Hongos en Salsa Blanca Trufada",
            "description": "Mushroom Tortellini in White Truffle Sauce",
            "price": 14900,
            "image": "/images/filippo/tortellini-hongos.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "lasagna-carne",
            "name": "Lasagna de Carne",
            "description": "Meat Lasagna",
            "price": 9400,
            "image": "/images/filippo/lasagna-carne.jpg",
            "category": "RISOTTOS & PASTAS"
          },
          {
            "id": "lasagna-pollo",
            "name": "Lasagna de Pollo",
            "description": "Chicken Lasagna",
            "price": 8400,
            "image": "/images/filippo/lasagna-pollo.jpg",
            "category": "RISOTTOS & PASTAS"
          }
        ]
      },
      {
        "id": "pastas-a-su-gusto",
        "title": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO",
        "items": [
          {
            "id": "salsa-frutos-mar",
            "name": "Frutos del Mar | Fruti di Mare",
            "description": "Seafood sauce",
            "price": 18800,
            "image": "/images/filippo/pasta-frutos-mar.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-funghi",
            "name": "Salsa Funghi",
            "description": "Mushroom tapenade, Pecorino cheese, Padano cheese, truffled oil",
            "price": 14500,
            "image": "/images/filippo/pasta-funghi.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-caccio-peppe",
            "name": "Caccio e Peppe",
            "description": "Cheese and Pepper Sauce with Dried Tomato",
            "price": 12500,
            "image": "/images/filippo/pasta-caccio.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-bolognesa",
            "name": "Bolognesa | Meat Sauce",
            "description": "Classic meat sauce",
            "price": 8900,
            "image": "/images/filippo/pasta-bolognesa.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-carbonara",
            "name": "Carbonara",
            "description": "Padano cheese, Bacon, Thyme",
            "price": 11400,
            "image": "/images/filippo/pasta-carbonara.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-pesto",
            "name": "Pesto",
            "description": "Classic basil pesto",
            "price": 5000,
            "image": "/images/filippo/pasta-pesto.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-gratinada",
            "name": "Gratinada",
            "description": "Eggplant, Mushrooms, Tomato, Zucchini",
            "price": 10400,
            "image": "/images/filippo/pasta-gratinada.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-aurora",
            "name": "Aurora",
            "description": "Tomato & Cream",
            "price": 10700,
            "image": "/images/filippo/pasta-aurora.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-pomodoro",
            "name": "Pomodoro | Tomato",
            "description": "Simple tomato sauce",
            "price": 6700,
            "image": "/images/filippo/pasta-pomodoro.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          },
          {
            "id": "salsa-checca",
            "name": "Checca",
            "description": "Tomato, Fresh Mozzarella, Basil, Olive Oil",
            "price": 7800,
            "image": "/images/filippo/pasta-checca.jpg",
            "category": "SPAGUETTI, TAGLIATELLE O PENNE CON SALSA A SU GUSTO"
          }
        ]
      },
      {
        "id": "platos-principales-main-dishes",
        "title": "PLATOS PRINCIPALES | MAIN DISHES",
        "items": [
          {
            "id": "main-corvina",
            "name": "Corvina",
            "description": "Sea Bass with Tomato, Asparagus and Butter Sauce",
            "price": 22400,
            "image": "/images/filippo/corvina.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          },
          {
            "id": "main-salmon",
            "name": "Salmón",
            "description": "Salmon in Pumpkin Sauce, Asparagus and Tomato",
            "price": 17600,
            "image": "/images/filippo/salmon.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          },
          {
            "id": "main-tagliata-lomito",
            "name": "Tagliata de Lomito al Horno",
            "description": "Sliced Steak with Grilled Tomato and Mushrooms and Pepper Chimi Sauce",
            "price": 18600,
            "image": "/images/filippo/tagliata.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          },
          {
            "id": "main-pollo-limon",
            "name": "Pechuga de Pollo al Limón y Hierbas",
            "description": "Roasted Chicken Breast with Lemon and Herbs",
            "price": 10400,
            "image": "/images/filippo/pollo-limon.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          },
          {
            "id": "main-milanesa-pollo",
            "name": "Milanesa de Pollo",
            "description": "Milanese Chicken with Mini Salad",
            "price": 8500,
            "image": "/images/filippo/milanesa.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          },
          {
            "id": "main-milanesa-parmigiana",
            "name": "Milanesa de Pollo a la Parmigiana",
            "description": "Milanese Chicken Parmigiana",
            "price": 10500,
            "image": "/images/filippo/parmigiana.jpg",
            "category": "PLATOS PRINCIPALES | MAIN DISHES"
          }
        ]
      },
      {
        "id": "hamburguesas-burgers",
        "title": "HAMBURGUESAS | BURGERS",
        "items": [
          {
            "id": "burger-portobello",
            "name": "Portobello Horneado",
            "description": "Baked Portobello Burger with Provolone, Blue Cheese and Avocado Sauce",
            "price": 10700,
            "image": "/images/filippo/burger-portobello.jpg",
            "category": "HAMBURGUESAS | BURGERS"
          },
          {
            "id": "burger-corvina",
            "name": "Corvina",
            "description": "Sea Bass Burger with Jalapeños Sauce, Pickles and Crispy Onions",
            "price": 13400,
            "image": "/images/filippo/burger-corvina.jpg",
            "category": "HAMBURGUESAS | BURGERS"
          },
          {
            "id": "burger-salmon",
            "name": "Salmón",
            "description": "Salmon with Mayonnaise Salmon, Honey, Ginger",
            "price": 13400,
            "image": "/images/filippo/burger-salmon.jpg",
            "category": "HAMBURGUESAS | BURGERS"
          },
          {
            "id": "burger-angus",
            "name": "Carne Angus",
            "description": "Angus Hamburguer (Lettuce, Tomato, Onion)",
            "price": 9900,
            "image": "/images/filippo/burger-angus.jpg",
            "category": "HAMBURGUESAS | BURGERS"
          },
          {
            "id": "burger-keto",
            "name": "KETO",
            "description": "Angus Beef, Tomato, Sautéed Onion, Mozzarella, Bacon, Avocado",
            "price": 9100,
            "image": "/images/filippo/burger-keto.jpg",
            "category": "HAMBURGUESAS | BURGERS"
          }
        ]
      },
      {
        "id": "sandwich",
        "title": "SANDWICH",
        "items": [
          {
            "id": "sandwich-blt",
            "name": "BLT",
            "description": "Bacon, Lettuce and Tomato",
            "price": 6900,
            "image": "/images/filippo/sandwich-blt.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-queso",
            "name": "Sandwich de Queso",
            "description": "The Cheese Sandwich",
            "price": 6600,
            "image": "/images/filippo/sandwich-queso.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-atun",
            "name": "Ensalada de Atún",
            "description": "Avocado, Lettuce, Alfalfa, Potatoes",
            "price": 8600,
            "image": "/images/filippo/sandwich-atun.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-jackfruit",
            "name": "Jack-Fruit",
            "description": "Jack-fruit, Purple Cabbage, Carrot, Apple Cider Vinegar, Mayonnaise",
            "price": 6900,
            "image": "/images/filippo/sandwich-jackfruit.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-caprese",
            "name": "Caprese",
            "description": "Fresh Mozzarella, Tomato, Pesto, Olive Oil, Balsamic Reduction",
            "price": 7100,
            "image": "/images/filippo/sandwich-caprese.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-al-pastor",
            "name": "AL PASTOR",
            "description": "Beef, Chipotle Mayonnaise, Cilantro, Red Onion, Avocado",
            "price": 11800,
            "image": "/images/filippo/sandwich-pastor.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-pavo",
            "name": "PAVO",
            "description": "Turkey, Tomato, Alfalfa, Cranberries, Crispy Bacon, Provolone, Pesto Sauce",
            "price": 10900,
            "image": "/images/filippo/sandwich-pavo.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-pechuga-pollo",
            "name": "Pechuga de Pollo",
            "description": "Chicken Breast, Brie Cheese, Caramelized Onion, Chutney, Arugula",
            "price": 11000,
            "image": "/images/filippo/sandwich-pollo.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-prosciutto",
            "name": "Prosciutto",
            "description": "Prosciutto, Fresh Mozzarella, Tomato, Olive Oil, Pepper",
            "price": 8900,
            "image": "/images/filippo/sandwich-prosciutto.jpg",
            "category": "SANDWICH"
          },
          {
            "id": "sandwich-salmon-grillado",
            "name": "Salmón Grillado",
            "description": "Grilled Salmon, Hearts of Palm, Cheese, Dried Tomato, Wasabi and Jalapeno Mayo",
            "price": 12900,
            "image": "/images/filippo/sandwich-salmon.jpg",
            "category": "SANDWICH"
          }
        ]
      },
      {
        "id": "para-ninos-for-kids",
        "title": "PARA NIÑOS | FOR KIDS",
        "items": [
          {
            "id": "kids-dedos-pollo",
            "name": "Dedos de Pollo Empanizados y Papas Fritas",
            "description": "Chicken Tenders with Fries",
            "price": 6100,
            "image": "/images/filippo/kids-pollo.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          },
          {
            "id": "kids-dedos-mozzarella",
            "name": "Dedos de Mozzarella",
            "description": "Mozzarella Fingers",
            "price": 5700,
            "image": "/images/filippo/kids-mozzarella.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          },
          {
            "id": "kids-spaghetti-mantequilla",
            "name": "Spaghetti en Mantequilla",
            "description": "Spaghetti with Butter",
            "price": 3300,
            "image": "/images/filippo/kids-mantequilla.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          },
          {
            "id": "kids-spaghetti-pomodoro",
            "name": "Spaghetti Pomodoro",
            "description": "Spaghetti with Pomodoro",
            "price": 3600,
            "image": "/images/filippo/kids-pomodoro.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          },
          {
            "id": "kids-penne-bolognesa",
            "name": "Penne Bolognesa",
            "description": "Bolognese Pasta",
            "price": 5400,
            "image": "/images/filippo/kids-bolognesa.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          },
          {
            "id": "kids-pizzetta",
            "name": "Pizzetta de Jamón y Queso",
            "description": "Ham and Cheese Pizzetta",
            "price": 5900,
            "image": "/images/filippo/kids-pizzetta.jpg",
            "category": "PARA NIÑOS | FOR KIDS"
          }
        ]
      },
      {
        "id": "pizzas-tradicionales",
        "title": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL",
        "items": [
          {
            "id": "pizza-margherita",
            "name": "Margherita",
            "description": "Mozzarella, Basil",
            "price": 8700,
            "image": "/images/filippo/pizza-margherita.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-di-parma",
            "name": "Di Parma",
            "description": "Prosciutto, Mozzarella, Arugula",
            "price": 12000,
            "image": "/images/filippo/pizza-parma.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-classica",
            "name": "Classica",
            "description": "Ham, Mushrooms, Mozzarella",
            "price": 10900,
            "image": "/images/filippo/pizza-classica.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-vegetariana",
            "name": "VEGETARIANA | VEGETARIAN",
            "description": "Mozzarella, Basil, Eggplant, Green Pepper, Onions, Mushrooms, Zucchini",
            "price": 9000,
            "image": "/images/filippo/pizza-vegetariana.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-pepperoni",
            "name": "Pepperoni",
            "description": "Pepperoni, Mozzarella",
            "price": 10500,
            "image": "/images/filippo/pizza-pepperoni.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-gamberetti",
            "name": "Gamberetti",
            "description": "Shrimps, Mozzarella, Roasted Tomatoes, Arugula",
            "price": 10900,
            "image": "/images/filippo/pizza-gamberetti.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-maui",
            "name": "Maui",
            "description": "Ham, Pineapple, Mozzarella, Basil",
            "price": 9800,
            "image": "/images/filippo/pizza-maui.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-pesto",
            "name": "PESTO",
            "description": "Shredded Chicken, Mozzarella, Pesto",
            "price": 9800,
            "image": "/images/filippo/pizza-pesto.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-puttanesca",
            "name": "Puttanesca",
            "description": "Olives, Anchovies, Capers, Chile Flakes, Mozzarella",
            "price": 9800,
            "image": "/images/filippo/pizza-puttanesca.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          },
          {
            "id": "pizza-al-pastor",
            "name": "AL PASTOR",
            "description": "Pastor Beef, Red Onion, Cilantro, Pineapple, Tomatillo Sauce, Mozzarella",
            "price": 11300,
            "image": "/images/filippo/pizza-pastor.jpg",
            "category": "PIZZAS & PIZZETAS TRADICIONALES TRADITIONAL"
          }
        ]
      },
      {
        "id": "bianca-sin-salsa",
        "title": "BIANCA (SIN SALSA DE TOMATE)",
        "items": [
          {
            "id": "bianca-filippo",
            "name": "Filippo",
            "description": "Smoked Salmon, Parmesan, Cherry Tomato, Mozzarella, Arugula",
            "price": 13900,
            "image": "/images/filippo/bianca-filippo.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-funghi",
            "name": "Funghi",
            "description": "Mushroom Tapenade, Mozzarella, Truffle Oil",
            "price": 9800,
            "image": "/images/filippo/bianca-funghi.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-formaggi",
            "name": "Formaggi",
            "description": "Gorgonzola, Parmesan, Mozzarella, Gouda",
            "price": 10200,
            "image": "/images/filippo/bianca-formaggi.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-caprino",
            "name": "Caprino",
            "description": "Asparagus, Goat Cheese, Mozzarella",
            "price": 9900,
            "image": "/images/filippo/bianca-caprino.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-dolce-piccante",
            "name": "Dolce e Piccante",
            "description": "Figs, Gorgonzola, Honey, Mozzarella, Chile Flakes",
            "price": 8800,
            "image": "/images/filippo/bianca-dolce.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-brie-pera",
            "name": "Brie e Pera",
            "description": "Brie, Mozzarella, Caramelized Pear, Balsamic Reduction",
            "price": 9900,
            "image": "/images/filippo/bianca-brie.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          },
          {
            "id": "bianca-prosciutto-alcachofa",
            "name": "Prosciutto",
            "description": "Artichoke, Prosciutto, Mozzarella, Pesto",
            "price": 11500,
            "image": "/images/filippo/bianca-prosciutto.jpg",
            "category": "BIANCA (SIN SALSA DE TOMATE)"
          }
        ]
      }
    ]
  };

export default filippo;