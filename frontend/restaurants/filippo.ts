import { RestaurantData } from '../data';

const filippo: RestaurantData = {
  name: 'Filippo',
  slug: 'filippo',
  logo: null,
  colors: {
    primary: '#8B7355',
    'primary-dark': '#7A6348',
    background: '#F8FAFC',
  },
  recommendations: [
      {
        "id": "pizza-di-parma",
        "name": "Di Parma",
        "description": "Prosciutto, Mozzarella, Arugula",
        "price": 12000,
        "category": "Pizzas Tradicionales",
        "image": "/images/filippo/pizza_di_parma_17470793235ZNqKY.jpg"
      },
      {
        "id": "poke-salmon",
        "name": "Poke de Salmón",
        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
        "price": 11800,
        "category": "Poke",
        "image": "/images/filippo/pokesalmon.png"
      },
      {
        "id": "plato-medio-oriente",
        "name": "Plato Medio Oriente",
        "description": "Falafel, Kibbe, Hummus, Babaganush, Ensalada Israelí, Pita Bread",
        "price": 7600,
        "category": "Entradas",
        "image": "/images/filippo/platomediooriente.png"
      }
    ],
    cartRecommendations: [
      {
        "id": "chocolate-cake",
        "name": "Chocolate Cake",
        "description": "Rich chocolate cake",
        "price": 5000,
        "category": "Desserts",
        "image": "/images/filippo/chocolatecake.png"
      },
      {
        "id": "pecan-pie",
        "name": "Pecan Pie",
        "description": "Classic pecan pie",
        "price": 6000,
        "category": "Desserts",
        "image": "/images/filippo/pecanpie.png"
      },
      {
        "id": "pie-coco",
        "name": "Pie de Coco",
        "description": "Coconut pie",
        "price": 4500,
        "category": "Desserts",
        "image": "/images/filippo/piecoco.png"
      }
    ],
      menu: [], // Will be populated from menuTabs
  menuTabs: [
    {
      id: "principal",
      label: "Principal",
      menu: [
      {
            "id": "entradas-appetizers",
            "title": "Entradas | Appetizers",
            "items": [
                  {
                        "id": "focaccia-caprese",
                        "name": "Focaccia Caprese",
                        "description": "Fresh mozzarella, tomato, and basil on focaccia",
                        "price": 5900,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "focaccia-romero-ajo",
                        "name": "Focaccia Romero o Ajo",
                        "description": "Rosemary or Garlic Focaccia",
                        "price": 4000,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "focaccia-carpaccio-salmon",
                        "name": "Focaccia Carpaccio Salmón",
                        "description": "Salmon Carpaccio on Foccaccia",
                        "price": 12100,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "carpaccio-de-res",
                        "name": "Carpaccio de Res",
                        "description": "Beef Carpaccio, Arugula, Parmesan, Lemon, EVOO",
                        "price": 13100,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "carpaccio-de-salmon",
                        "name": "Carpaccio de Salmón",
                        "description": "Salmon Carpaccio, Onion, Celery, Sweet Pepper, Capers, Lemon, EVOO",
                        "price": 11000,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "tartar-salmon-atun",
                        "name": "Tartar de Salmón o Atún",
                        "description": "Salmon or Tuna Tartare with Oriental Mayonnaise on Crispy Rice",
                        "price": 8100,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "coctel-camarones",
                        "name": "Cóctel de Camarones",
                        "description": "Shrimp Cocktail",
                        "price": 13200,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "ceviche-pescado",
                        "name": "Ceviche de Pescado",
                        "description": "Fish Ceviche (Avocado, Onion, Cilantro, Tomato)",
                        "price": 10500,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "ceviche-mixto",
                        "name": "Ceviche Mixto",
                        "description": "Fish, Shrimp, Avocado, Onion, Cilantro, Tomato",
                        "price": 8900,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "coliflor-al-horno",
                        "name": "Coliflor al Horno & Tahini",
                        "description": "Baked Cauliflower & Tahini",
                        "price": 5900,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "calamares-fritos",
                        "name": "Calamares Fritos (En Temporada)",
                        "description": "Fried Calamari (In season)",
                        "price": 10500,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "alitas-pollo-horno",
                        "name": "Alitas de Pollo al Horno",
                        "description": "Honey-Ginger Sauce or BBQ",
                        "price": 12000,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "croquetas-risotto-hongos",
                        "name": "Croquetas de Risotto y Hongos",
                        "description": "Risotto and Mushroom Croquettes (6 units)",
                        "price": 5800,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "dedos-mozzarella-app",
                        "name": "Dedos de Mozzarella Empanizados & Chutney",
                        "description": "Mozzarella Fingers with Chutney",
                        "price": 6600,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "hongos-rellenos-queso",
                        "name": "Hongos Rellenos de Queso",
                        "description": "Cheese Stuffed Mushrooms",
                        "price": 7900,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "queso-fundido-horno",
                        "name": "Queso Fundido al Horno",
                        "description": "Baked Cheese",
                        "price": 5000,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "plato-quesos-fiambres",
                        "name": "Plato de Quesos y Fiambres",
                        "description": "Cheese Platter with Salumi and Marinated Vegetables",
                        "price": 14900,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "falafel-hummus",
                        "name": "Falafel con Hummus",
                        "description": "6 pieces of Falafel served with Hummus",
                        "price": 5800,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "kibbe-tabule",
                        "name": "Kibbe con Ensalada Tabule y Tahini",
                        "description": "Kibbe with Tabule Salad and Tahini",
                        "price": 6800,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "plato-medio-oriente-app",
                        "name": "Plato Medio Oriente",
                        "description": "Falafel, Kibbe, Hummus, Babaganush, Ensalada Israelí, Pita Bread",
                        "price": 7600,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "plato-hummus-pita",
                        "name": "Plato de Hummus, Pita & Crudites",
                        "description": "Hummus Plate with Pita and Crudites",
                        "price": 4600,
                        "category": "Entradas | Appetizers"
                  },
                  {
                        "id": "plato-babaganush-pita",
                        "name": "Plato de Babaganush, Pita & Crudites",
                        "description": "Babaganush Plate with Pita and Crudites",
                        "price": 5400,
                        "category": "Entradas | Appetizers"
                  }
            ]
      },
      {
            "id": "sopas-soups",
            "title": "Sopas | Soups",
            "items": [
                  {
                        "id": "crema-ayote",
                        "name": "Crema de Ayote",
                        "description": "Pumpkin Cream",
                        "price": 6100,
                        "category": "Sopas | Soups"
                  },
                  {
                        "id": "sopa-tomate",
                        "name": "Sopa de Tomate con Parmesano",
                        "description": "Tomato Soup with Parmesan",
                        "price": 5500,
                        "category": "Sopas | Soups"
                  },
                  {
                        "id": "sopa-cebolla",
                        "name": "Sopa de Cebolla Gratinada",
                        "description": "French Onion Soup",
                        "price": 6100,
                        "category": "Sopas | Soups"
                  }
            ]
      },
      {
            "id": "ensaladas-salads",
            "title": "Ensaladas | Salads",
            "items": [
                  {
                        "id": "ensalada-verde-mixta",
                        "name": "Verde Mixta",
                        "description": "Mixed Greens, Mushrooms, Tomato, Carrots, Vinaigrette",
                        "price": 5400,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-quinoa-mediterranea",
                        "name": "Quinoa Mediterránea",
                        "description": "Cucumber, Avocado, Kalamata Olive, Fig, Tomato, Almond, Chutney, Goat Cheese",
                        "price": 8900,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-caprese",
                        "name": "Caprese",
                        "description": "Tomato, Fresh Mozzarella, Basil, Pesto, Balsamic Reduction",
                        "price": 8300,
                        "image": "/images/filippo/ensalada_caprese_17470809696Ah8aI.jpg",
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-capellini-palmitos",
                        "name": "Capellini de Palmitos",
                        "description": "Hearts of Palm, Cheese, Dried Tomato, Ginger Vinaigrette",
                        "price": 11300,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-cesar",
                        "name": "César",
                        "description": "Lettuce, Anchovies, Parmesan, Egg, Croutons, Anchovies Dressing",
                        "price": 7900,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-atun-bronceado",
                        "name": "Atún Bronceado",
                        "description": "Mixed Lettuce, Tomato, Fungi, Grilled Onion, Almonds, Onion Vinaigrette",
                        "price": 10800,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-iceberg",
                        "name": "Iceberg",
                        "description": "Blue Cheese dressing, Crispy Bacon, Egg, Cherry Tomatoes",
                        "price": 7600,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-israeli-palmito",
                        "name": "Israelí & Palmito Grillado",
                        "description": "Tomato, Cucumber, Red Onion, Fresh heart of Palm, Avocado",
                        "price": 5200,
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-salmon-nicoise",
                        "name": "Salmón Nicoise",
                        "description": "Grilled Salmon, Egg, Potato, Tomato, Alfalfa, Arugula, String Beans, Vinaigrette",
                        "price": 13700,
                        "image": "/images/filippo/ensalada_nicoise_de_salmon_1747080938IAYsbJ.jpg",
                        "category": "Ensaladas | Salads"
                  },
                  {
                        "id": "ensalada-prosciutto-pera",
                        "name": "Prosciutto Crispy & Pera",
                        "description": "Mixed Lettuce, Parmesan, Poppyseed Dressing",
                        "price": 8900,
                        "category": "Ensaladas | Salads"
                  }
            ]
      },
      {
            "id": "poke",
            "title": "Poke",
            "items": [
                  {
                        "id": "poke-salmon",
                        "name": "Salmón",
                        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
                        "price": 11800,
                        "image": "/images/filippo/pokesalmon.png",
                        "category": "Poke"
                  },
                  {
                        "id": "poke-atun",
                        "name": "Atún",
                        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
                        "price": 8700,
                        "category": "Poke"
                  },
                  {
                        "id": "poke-carne",
                        "name": "Carne",
                        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
                        "price": 12700,
                        "category": "Poke"
                  },
                  {
                        "id": "poke-pollo",
                        "name": "Pollo",
                        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
                        "price": 9000,
                        "category": "Poke"
                  },
                  {
                        "id": "poke-vegetales",
                        "name": "Vegetales Salteados",
                        "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
                        "price": 7100,
                        "category": "Poke"
                  }
            ]
      },
      {
            "id": "risottos-pastas",
            "title": "Risottos & Pastas",
            "items": [
                  {
                        "id": "risotto-ayote",
                        "name": "Risotto al Ayote",
                        "description": "Pumpkin Risotto",
                        "price": 13400,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "risotto-hongos-trufados",
                        "name": "Risotto a los Hongos Trufados",
                        "description": "Risotto with Mushrooms and Truffle",
                        "price": 15700,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "risotto-frutos-mar",
                        "name": "Risotto de Frutos del Mar",
                        "description": "Risotto with Seafood and Napoli Sauce",
                        "price": 19900,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "ravioli-carne",
                        "name": "Ravioli de Carne en Salsa Napoli",
                        "description": "Meat Ravioli in Tomato Sauce",
                        "price": 8900,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "tortellini-ricotta",
                        "name": "Tortellini de Ricotta en Salsa Aurora con Pesto",
                        "description": "Ricotta Filled Tortellini in Aurora Sauce with Pesto",
                        "price": 10300,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "tortellini-hongos",
                        "name": "Tortellini de Hongos en Salsa Blanca Trufada",
                        "description": "Mushroom Tortellini in White Truffle Sauce",
                        "price": 14900,
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "lasagna-carne",
                        "name": "Lasagna de Carne",
                        "description": "Meat Lasagna",
                        "price": 9400,
                        "image": "/images/filippo/lasagna_de_carne_17470792046YVjft.jpg",
                        "category": "Risottos & Pastas"
                  },
                  {
                        "id": "lasagna-pollo",
                        "name": "Lasagna de Pollo",
                        "description": "Chicken Lasagna",
                        "price": 8400,
                        "category": "Risottos & Pastas"
                  }
            ]
      },
      {
            "id": "platos-principales-main-dishes",
            "title": "Platos Principales | Main Dishes",
            "items": [
                  {
                        "id": "main-corvina",
                        "name": "Corvina",
                        "description": "Sea Bass with Tomato, Asparagus and Butter Sauce",
                        "price": 22400,
                        "category": "Platos Principales | Main Dishes"
                  },
                  {
                        "id": "main-salmon",
                        "name": "Salmón",
                        "description": "Salmon in Pumpkin Sauce, Asparagus and Tomato",
                        "price": 17600,
                        "category": "Platos Principales | Main Dishes"
                  },
                  {
                        "id": "main-tagliata-lomito",
                        "name": "Tagliata de Lomito al Horno",
                        "description": "Sliced Steak with Grilled Tomato and Mushrooms and Pepper Chimi Sauce",
                        "price": 18600,
                        "category": "Platos Principales | Main Dishes"
                  },
                  {
                        "id": "main-pollo-limon",
                        "name": "Pechuga de Pollo al Limón y Hierbas",
                        "description": "Roasted Chicken Breast with Lemon and Herbs",
                        "price": 10400,
                        "category": "Platos Principales | Main Dishes"
                  },
                  {
                        "id": "main-milanesa-pollo",
                        "name": "Milanesa de Pollo",
                        "description": "Milanese Chicken with Mini Salad",
                        "price": 8500,
                        "category": "Platos Principales | Main Dishes"
                  },
                  {
                        "id": "main-milanesa-parmigiana",
                        "name": "Milanesa de Pollo a la Parmigiana",
                        "description": "Milanese Chicken Parmigiana",
                        "price": 10500,
                        "category": "Platos Principales | Main Dishes"
                  }
            ]
      },
      {
            "id": "hamburguesas-burgers",
            "title": "Hamburguesas | Burgers",
            "items": [
                  {
                        "id": "burger-portobello",
                        "name": "Portobello Horneado",
                        "description": "Baked Portobello Burger with Provolone, Blue Cheese and Avocado Sauce",
                        "price": 10700,
                        "category": "Hamburguesas | Burgers"
                  },
                  {
                        "id": "burger-corvina",
                        "name": "Corvina",
                        "description": "Sea Bass Burger with Jalapeños Sauce, Pickles and Crispy Onions",
                        "price": 13400,
                        "category": "Hamburguesas | Burgers"
                  },
                  {
                        "id": "burger-salmon",
                        "name": "Salmón",
                        "description": "Salmon with Mayonnaise Salmon, Honey, Ginger",
                        "price": 13400,
                        "category": "Hamburguesas | Burgers"
                  },
                  {
                        "id": "burger-angus",
                        "name": "Carne Angus",
                        "description": "Angus Hamburguer (Lettuce, Tomato, Onion)",
                        "price": 9900,
                        "category": "Hamburguesas | Burgers"
                  },
                  {
                        "id": "burger-keto",
                        "name": "Keto",
                        "description": "Angus Beef, Tomato, Sautéed Onion, Mozzarella, Bacon, Avocado",
                        "price": 9100,
                        "category": "Hamburguesas | Burgers"
                  }
            ]
      },
      {
            "id": "sandwich",
            "title": "Sandwich",
            "items": [
                  {
                        "id": "sandwich-blt",
                        "name": "Blt",
                        "description": "Bacon, Lettuce and Tomato",
                        "price": 6900,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-queso",
                        "name": "Sandwich de Queso",
                        "description": "The Cheese Sandwich",
                        "price": 6600,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-atun",
                        "name": "Ensalada de Atún",
                        "description": "Avocado, Lettuce, Alfalfa, Potatoes",
                        "price": 8600,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-jackfruit",
                        "name": "Jack-Fruit",
                        "description": "Jack-fruit, Purple Cabbage, Carrot, Apple Cider Vinegar, Mayonnaise",
                        "price": 6900,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-caprese",
                        "name": "Caprese",
                        "description": "Fresh Mozzarella, Tomato, Pesto, Olive Oil, Balsamic Reduction",
                        "price": 7100,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-al-pastor",
                        "name": "Al Pastor",
                        "description": "Beef, Chipotle Mayonnaise, Cilantro, Red Onion, Avocado",
                        "price": 11800,
                        "image": "/images/filippo/carne al pastor.png",
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-pavo",
                        "name": "Pavo",
                        "description": "Turkey, Tomato, Alfalfa, Cranberries, Crispy Bacon, Provolone, Pesto Sauce",
                        "price": 10900,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-pechuga-pollo",
                        "name": "Pechuga de Pollo",
                        "description": "Chicken Breast, Brie Cheese, Caramelized Onion, Chutney, Arugula",
                        "price": 11000,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-prosciutto",
                        "name": "Prosciutto",
                        "description": "Prosciutto, Fresh Mozzarella, Tomato, Olive Oil, Pepper",
                        "price": 8900,
                        "category": "Sandwich"
                  },
                  {
                        "id": "sandwich-salmon-grillado",
                        "name": "Salmón Grillado",
                        "description": "Grilled Salmon, Hearts of Palm, Cheese, Dried Tomato, Wasabi and Jalapeno Mayo",
                        "price": 12900,
                        "category": "Sandwich"
                  }
            ]
      },
      {
            "id": "para-ninos-for-kids",
            "title": "Para Niños | For Kids",
            "items": [
                  {
                        "id": "kids-dedos-pollo",
                        "name": "Dedos de Pollo Empanizados y Papas Fritas",
                        "description": "Chicken Tenders with Fries",
                        "price": 6100,
                        "category": "Para Niños | For Kids"
                  },
                  {
                        "id": "kids-dedos-mozzarella",
                        "name": "Dedos de Mozzarella",
                        "description": "Mozzarella Fingers",
                        "price": 5700,
                        "category": "Para Niños | For Kids"
                  },
                  {
                        "id": "kids-spaghetti-mantequilla",
                        "name": "Spaghetti en Mantequilla",
                        "description": "Spaghetti with Butter",
                        "price": 3300,
                        "category": "Para Niños | For Kids"
                  },
                  {
                        "id": "kids-spaghetti-pomodoro",
                        "name": "Spaghetti Pomodoro",
                        "description": "Spaghetti with Pomodoro",
                        "price": 3600,
                        "category": "Para Niños | For Kids"
                  },
                  {
                        "id": "kids-penne-bolognesa",
                        "name": "Penne Bolognesa",
                        "description": "Bolognese Pasta",
                        "price": 5400,
                        "category": "Para Niños | For Kids"
                  },
                  {
                        "id": "kids-pizzetta",
                        "name": "Pizzetta de Jamón y Queso",
                        "description": "Ham and Cheese Pizzetta",
                        "price": 5900,
                        "category": "Para Niños | For Kids"
                  }
            ]
      },
      {
            "id": "pizzas-tradicionales",
            "title": "Pizzas & Pizzetas Tradicionales Traditional",
            "items": [
                  {
                        "id": "pizza-margherita",
                        "name": "Margherita",
                        "description": "Mozzarella, Basil",
                        "price": 8700,
                        "image": "/images/filippo/pizza_margherita_1747079310Kk9YmF.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-di-parma",
                        "name": "Di Parma",
                        "description": "Prosciutto, Mozzarella, Arugula",
                        "price": 12000,
                        "image": "/images/filippo/pizza_di_parma_17470793235ZNqKY.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-classica",
                        "name": "Classica",
                        "description": "Ham, Mushrooms, Mozzarella",
                        "price": 10900,
                        "image": "/images/filippo/pizza_clasica_1747079351TPT4jS.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-vegetariana",
                        "name": "Vegetariana | Vegetarian",
                        "description": "Mozzarella, Basil, Eggplant, Green Pepper, Onions, Mushrooms, Zucchini",
                        "price": 9000,
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-pepperoni",
                        "name": "Pepperoni",
                        "description": "Pepperoni, Mozzarella",
                        "price": 10500,
                        "image": "/images/filippo/pizza_pepperoni_1747079386jsqQpT.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-gamberetti",
                        "name": "Gamberetti",
                        "description": "Shrimps, Mozzarella, Roasted Tomatoes, Arugula",
                        "price": 10900,
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-maui",
                        "name": "Maui",
                        "description": "Ham, Pineapple, Mozzarella, Basil",
                        "price": 9800,
                        "image": "/images/filippo/pizza_maui_1747079344VPtbXA.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-pesto",
                        "name": "Pesto",
                        "description": "Shredded Chicken, Mozzarella, Pesto",
                        "price": 9800,
                        "image": "/images/filippo/pizza_pesto_1747079383jX6atN.jpg",
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-puttanesca",
                        "name": "Puttanesca",
                        "description": "Olives, Anchovies, Capers, Chile Flakes, Mozzarella",
                        "price": 9800,
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  },
                  {
                        "id": "pizza-al-pastor",
                        "name": "Al Pastor",
                        "description": "Pastor Beef, Red Onion, Cilantro, Pineapple, Tomatillo Sauce, Mozzarella",
                        "price": 11300,
                        "category": "Pizzas & Pizzetas Tradicionales Traditional"
                  }
            ]
      },
      {
            "id": "bianca-sin-salsa",
            "title": "Bianca (Sin Salsa De Tomate)",
            "items": [
                  {
                        "id": "bianca-filippo",
                        "name": "Filippo",
                        "description": "Smoked Salmon, Parmesan, Cherry Tomato, Mozzarella, Arugula",
                        "price": 13900,
                        "image": "/images/filippo/pizza_bianca_filippo_1747079430Tpp0vZ.jpg",
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-funghi",
                        "name": "Funghi",
                        "description": "Mushroom Tapenade, Mozzarella, Truffle Oil",
                        "price": 9800,
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-formaggi",
                        "name": "Formaggi",
                        "description": "Gorgonzola, Parmesan, Mozzarella, Gouda",
                        "price": 10200,
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-caprino",
                        "name": "Caprino",
                        "description": "Asparagus, Goat Cheese, Mozzarella",
                        "price": 9900,
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-dolce-piccante",
                        "name": "Dolce e Piccante",
                        "description": "Figs, Gorgonzola, Honey, Mozzarella, Chile Flakes",
                        "price": 8800,
                        "image": "/images/filippo/pizza_bianca_dolce_e_picante_1747079707wll4oD.jpg",
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-brie-pera",
                        "name": "Brie e Pera",
                        "description": "Brie, Mozzarella, Caramelized Pear, Balsamic Reduction",
                        "price": 9900,
                        "category": "Bianca (Sin Salsa De Tomate)"
                  },
                  {
                        "id": "bianca-prosciutto-alcachofa",
                        "name": "Prosciutto",
                        "description": "Artichoke, Prosciutto, Mozzarella, Pesto",
                        "price": 11500,
                        "category": "Bianca (Sin Salsa De Tomate)"
                  }
            ]
      }
],
      recommendations: [
        {
          "id": "pizza-di-parma",
          "name": "Di Parma",
          "description": "Prosciutto, Mozzarella, Arugula",
          "price": 12000,
          "category": "Pizzas Tradicionales",
          "image": "/images/filippo/pizza_di_parma_17470793235ZNqKY.jpg"
        },
        {
          "id": "poke-salmon",
          "name": "Poke de Salmón",
          "description": "Rice, Quinoa, Avocado, Sesame, Soy Sauce, Pickled Cabbage, Edamame, Radish",
          "price": 11800,
          "category": "Poke",
          "image": "/images/filippo/pokesalmon.png"
        },
        {
          "id": "plato-medio-oriente",
          "name": "Plato Medio Oriente",
          "description": "Falafel, Kibbe, Hummus, Babaganush, Ensalada Israelí, Pita Bread",
          "price": 7600,
          "category": "Entradas",
          "image": "/images/filippo/platomediooriente.png"
        }
      ]
    },
    {
      id: "bebidas",
      label: "Bebidas",
      menu: [
      {
            "id": "bebidas-drinks",
            "title": "Bebidas | Drinks",
            "items": [
                  {
                        "id": "coca-cola",
                        "name": "Coca Cola",
                        "description": "Coca Cola",
                        "price": 2300,
                        "category": "Bebidas | Drinks",
                        "image": "/images/filippo/coca.png.webp"
                  },
                  {
                        "id": "fresca",
                        "name": "Fresca",
                        "description": "Fresca",
                        "price": 2300,
                        "category": "Bebidas | Drinks",
                        "image": "/images/filippo/fresca.jpg"
                  },
                  {
                        "id": "ginger-ale",
                        "name": "Ginger Ale",
                        "description": "Ginger Ale",
                        "price": 2300,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "soda",
                        "name": "Soda",
                        "description": "Soda",
                        "price": 2300,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "coca-zero",
                        "name": "Coca Zero",
                        "description": "Coca Zero",
                        "price": 2300,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "kombucha-rosa-jamaica",
                        "name": "Kombucha Rosa de Jamaica Anís",
                        "description": "Hibiscus Anise Kombucha",
                        "price": 5600,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "soda-artesanal-limon-lavanda",
                        "name": "Soda Artesanal Limón - Lavanda",
                        "description": "Lemon Lavender Soda",
                        "price": 5600,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "soda-artesanal-maracuya-manzanilla",
                        "name": "Soda Artesanal Maracuyá - Manzanilla",
                        "description": "Passion Fruit Chamomile Soda",
                        "price": 5600,
                        "category": "Bebidas | Drinks"
                  },
                  {
                        "id": "agua-rainforest",
                        "name": "Agua RainForest (500ml)",
                        "description": "Bottled water",
                        "price": 4400,
                        "category": "Bebidas | Drinks"
                  }
            ]
      },
      {
            "id": "minerales-mineral-water",
            "title": "Minerales | Mineral Water",
            "items": [
                  {
                        "id": "aqua-panna-500",
                        "name": "Aqua Panna (500 ml)",
                        "description": "Mineral water",
                        "price": 4700,
                        "category": "Minerales | Mineral Water"
                  },
                  {
                        "id": "san-pellegrino-250",
                        "name": "San Pellegrino (250 ml)",
                        "description": "Sparkling mineral water",
                        "price": 3500,
                        "category": "Minerales | Mineral Water"
                  },
                  {
                        "id": "san-pellegrino-500",
                        "name": "San Pellegrino (500 ml)",
                        "description": "Sparkling mineral water",
                        "price": 5600,
                        "category": "Minerales | Mineral Water"
                  }
            ]
      },
      {
            "id": "jugos-naturales-fruit-juices",
            "title": "Jugos Naturales | Fruit Juices",
            "items": [
                  {
                        "id": "jugos-basicos",
                        "name": "Cas, Limonada, Naranja, Papaya, Piña, Sandía",
                        "description": "Fresh fruit juices",
                        "price": 3000,
                        "category": "Jugos Naturales | Fruit Juices",
                        "selectionOptions": ["Cas", "Limonada", "Naranja", "Papaya", "Piña", "Sandía"]
                  },
                  {
                        "id": "jugos-especiales",
                        "name": "Guanábana, Mango, Melón, Mora, Naranjilla, Naranja-Zanahoria",
                        "description": "Special fresh fruit juices",
                        "price": 3300,
                        "category": "Jugos Naturales | Fruit Juices",
                        "selectionOptions": ["Guanábana", "Mango", "Melón", "Mora", "Naranjilla", "Naranja-Zanahoria"]
                  },
                  {
                        "id": "tomate-preparado",
                        "name": "Tomate Preparado",
                        "description": "Prepared Tomato juice",
                        "price": 3300,
                        "category": "Jugos Naturales | Fruit Juices"
                  },
                  {
                        "id": "jugo-fresa",
                        "name": "Fresa",
                        "description": "Strawberry juice",
                        "price": 4300,
                        "category": "Jugos Naturales | Fruit Juices"
                  },
                  {
                        "id": "jugo-mandarina",
                        "name": "Mandarina (en temporada)",
                        "description": "Tangerine juice (in season)",
                        "price": 5000,
                        "category": "Jugos Naturales | Fruit Juices"
                  }
            ]
      },
      {
            "id": "smoothies",
            "title": "Smoothies",
            "items": [
                  {
                        "id": "smoothie-gandhi",
                        "name": "Gandhi",
                        "description": "Turmeric, Pineapple, Banana, Mango, Ginger, Honey, Milk",
                        "price": 4300,
                        "category": "Smoothies"
                  },
                  {
                        "id": "smoothie-pura-vida",
                        "name": "Pura Vida",
                        "description": "Strawberry, Lemon, Spearmint, Honey, Coconut Water",
                        "price": 4000,
                        "category": "Smoothies"
                  },
                  {
                        "id": "smoothie-dia-playa",
                        "name": "Día de Playa",
                        "description": "Papaya, Pineapple, Banana, Honey, Vanilla, Milk",
                        "price": 3300,
                        "category": "Smoothies"
                  }
            ]
      }
    ],
      recommendations: [
        {
          "id": "coca-cola",
          "name": "Coca Cola",
          "description": "Coca Cola",
          "price": 2300,
          "category": "Bebidas | Drinks",
          "image": "/images/filippo/coca.png.webp"
    },
    {
          "id": "fresca",
          "name": "Fresca",
          "description": "Fresca",
          "price": 2300,
          "category": "Bebidas | Drinks",
          "image": "/images/filippo/fresca.jpg"
    },
      ]
    },
    {
      id: "desayuno",
      label: "Desayuno",
      menu: [
        {
          id: "desayuno-items",
          title: "Desayuno",
          items: [
            {
              id: "americano",
              name: "Americano",
              description: "Café, Jugo de Naranja, Huevos, Waffles, Tocineta, Papa Mini Salteada | Coffee, Orange Juice, Eggs, Waffles, Bacon, Sauteé Mini Potatoes",
              price: 10800,
              category: "Desayuno",
              image: "/images/filippo/desayuno_americano_1744837305PfIigD.jpg"
            },
            {
              id: "bowl-tico",
              name: "Bowl Tico",
              description: "Café, Jugo de Naranja, Huevos, Gallo Pinto, Natilla, Plátanos en Almíbar, Queso a la Plancha y Pan de la Casa | Coffee, Orange Juice, Eggs, Gallo Pinto, Sour Cream, Sweet Plantain, White Cheese, Toasts",
              price: 8500,
              category: "Desayuno",
              image: "/images/filippo/desayuno_tico_17448373315tzSsB.jpg"
            },
            {
              id: "mediterraneo",
              name: "Mediterráneo",
              description: "Labhne, Huevos, Ensalada de Repollo, Pan Pita | Labhne, Eggs, Coleslaw and Pita Bread",
              price: 4500,
              category: "Desayuno"
            },
            {
              id: "huevos-su-gusto",
              name: "Huevos a su Gusto",
              description: "Con PAN DE LA CASA Y ENSALADITA | How do you want your Eggs?? With homemade bread and small salad",
              price: 3900,
              category: "Desayuno"
            },
            {
              id: "huevos-benedictinos-guacamole",
              name: "Huevos Benedictinos con Guacamole",
              description: "Sobre Pan de la Casa | Benedict Eggs with Avocado - Over Homemade Bread",
              price: 6000,
              category: "Desayuno"
            },
            {
              id: "huevos-benedictinos-jamon",
              name: "Huevos Benedictinos con Jamón",
              description: "Sobre Pan de la Casa | Benedict Eggs with Ham - Over Homemade Bread",
              price: 6500,
              category: "Desayuno"
            },
            {
              id: "huevos-benedictinos-salmon",
              name: "Huevos Benedictinos con Salmón Ahumado",
              description: "Sobre Pan de la Casa | Benedict Eggs with Salmon - Over Homemade Bread",
              price: 7800,
              category: "Desayuno"
            },
            {
              id: "huevos-rancheros",
              name: "Huevos Rancheros",
              description: "Con Salsa de Tomatillo | Huevos Rancheros in Red Tomato Sauce",
              price: 7800,
              category: "Desayuno"
            },
            {
              id: "omelette",
              name: "Omelette",
              description: "Queso, Hongos, Cebolla, Tomate y Espinaca, Pan de la casa y Ensaladita | Cheese, Mushroom, Onion, Tomato Spinach, Homemade Bread and Small Salad",
              price: 6600,
              category: "Desayuno",
              image: "/images/filippo/omelette_1744837402d1wm8p.jpg"
            },
            {
              id: "omelette-claras",
              name: "Omelette de Claras",
              description: "Egg White Omelette - Hongos, Cebolla, Tomate y Espinaca, Pan de la casa y Ensaladita | Mushroom, Onion, Tomato, Spinach, Homemade Bread and Small Salad",
              price: 7100,
              category: "Desayuno"
            },
            {
              id: "omelette-pastor",
              name: "Omelette Pastor",
              description: "Carne al Pastor, Guacamole, Chile Dulce, Cebolla, Queso, Natilla, Cebollitas Encurtidas y Guarniciones de la Casa al Lado | Pastor Beef, Guacamole, Peppers, Onion, Cheese, Sour Cream, Pickled Onions and Sides of the House",
              price: 7000,
              category: "Desayuno"
            },
            {
              id: "omelette-sandwich",
              name: "Omelette Sándwich",
              description: "Con papa chips - Huevo, Queso, Tomate, Tocineta Crispy, Aguacate | Omelett Sandwich (Egg, Cheese, Tomato, Crispy Bacon, Avocado)",
              price: 8800,
              category: "Desayuno",
              image: "/images/filippo/sandwich_omelette_1744837434GsSJrC.jpg"
            },
            {
              id: "sandwich-queso-desayuno",
              name: "Sándwich de Queso",
              description: "Con papa chips | Cheese Sandwich with Chips",
              price: 6600,
              category: "Desayuno"
            },
            {
              id: "panini-caprese",
              name: "Panini Caprese",
              description: "Tomate Pera, Mozzarella Fresca, Pesto, Aceite de Oliva | Caprese Panini: Pear Tomato, Fresh Mozzarella, Pesto and Olive Oil",
              price: 3500,
              category: "Desayuno"
            },
            {
              id: "panini-salmon-ahumado",
              name: "Panini Salmón Ahumado",
              description: "Mayo Wasabi, Pepinillos y Aguacate | Smoked Salmon Panini: Wasabi Mayo, Pickles and Avocado",
              price: 5500,
              category: "Desayuno"
            },
            {
              id: "pizzeta-queso-huevo",
              name: "Pizzeta Queso & Huevo",
              description: "Mozzarella, Gouda, Sésamo, Zaatar y Huevos Tiernos | Breakfast Pizzeta (Mozzarella, Gouda, Sesame Seeds, Zaatar, Sunny Side Up Eggs)",
              price: 6500,
              category: "Desayuno"
            },
            {
              id: "tostadas-francesas",
              name: "Tostadas Francesas",
              description: "French Toast - Fresa, Banano, Uchuva, Granola, Jarabe | Strawberry, Banana, Cape Gooseberry, Granola and Maple Syrup",
              price: 6200,
              category: "Desayuno",
              image: "/images/filippo/tostadas_a_la_francesa_1_1744837009KlQAvB.jpg"
            },
            {
              id: "waffles",
              name: "Waffles",
              description: "Con sirope y mantequilla - Fresa, Banano, Uchuva, Mantequilla, Jarabe | Strawberry, Banana, Cape Gooseberry, Butter and Maple Syrup",
              price: 4500,
              category: "Desayuno"
            },
            {
              id: "waffles-yuca",
              name: "Waffles de Yuca",
              description: "Casava Waffles - Waffles, Queso a la Plancha, Huevo al Gusto, Mermelada | Casava Waffles, White Cheese, Egg Any Style, Marmelade",
              price: 6600,
              category: "Desayuno"
            },
            {
              id: "panes-queso",
              name: "Panes de Queso Surtidos",
              description: "Con Mermelada | Cheese Bread Basket with Homemade Jam",
              price: 5200,
              category: "Desayuno"
            },
            {
              id: "copa-frutas",
              name: "Copa de Frutas de Temporada",
              description: "Season Fruit Cup",
              price: 2600,
              category: "Desayuno"
            },
            {
              id: "copa-fruta-yogurt-granola",
              name: "Copa de Fruta, Yogurt y Granola",
              description: "Season Fruit Cup, Yogurt and Granola",
              price: 4200,
              category: "Desayuno"
            },
            {
              id: "acai-bowl",
              name: "Açai Bowl",
              description: "Base Helada con Açai, Manzana, Jugo de Pipa y Leche de Almendras Sobre Chia Pudding con Topping de Coco, Chía, Banano y Granola | Iced Foundation with Açai, Apple, Coconut Water and Almond Milk, Over a Chia Pudding, Toasted Coconut Flakes, Chia, Granola and Banana on Top",
              price: 5900,
              category: "Desayuno"
            },
            {
              id: "arepa-maiz-queso",
              name: "Arepa de Maíz y Queso",
              description: "Corn & Cheese Arepa",
              price: 2400,
              category: "Desayuno",
              image: "/images/filippo/arepaaa_1748545352bC9p0V.jpg"
            },
            {
              id: "arepa-mermelada",
              name: "Arepa con Mermelada Casera",
              description: "With Homemade Marmalade",
              price: 3600,
              category: "Desayuno"
            },
            {
              id: "arepa-guacamole-tocineta",
              name: "Arepa con Guacamole y Tocineta",
              description: "With Guacamole and Bacon",
              price: 7500,
              category: "Desayuno"
            },
            {
              id: "arepa-guacamole-huevo",
              name: "Arepa con Guacamole y Huevo",
              description: "With Guacamole and Egg",
              price: 7200,
              category: "Desayuno"
            },
            {
              id: "arepa-huevo-tocineta",
              name: "Arepa con Huevo Frito y Tocineta",
              description: "With Fried Egg and Bacon",
              price: 7200,
              category: "Desayuno"
            },
            {
              id: "tostada-prosciutto-queso-cabra",
              name: "Tostada Prosciutto y Queso de Cabra",
              description: "Base Cremosa Con Queso Cabra y Romero, Pecanas Caramelizadas, Reducción Bálsámica y Arúgula | Prosciutto and Goat Cheese Toast: Cream of Goat Cheese and Rosemary, Caramelized Pecans, Balsamic Cream and Arugula",
              price: 5500,
              category: "Desayuno"
            },
            {
              id: "tostada-hongos",
              name: "Tostada con Hongos",
              description: "Base de Aguacate, Hongos Salteados con Bálsamico, Huevos Pochados con Zaatar | Mushrooms Toast: Avocado, Sautée Mushrooms With Balsamic, Poched Eggs with Zaatar",
              price: 6600,
              category: "Desayuno"
            },
            {
              id: "tostada-guacamole",
              name: "Tostada con Guacamole",
              description: "Tomate Cherry, Rábano, Arúgula y Alfalfa | Guacamole Toast, Cherry Tomato, Radish, Arugula and Alfalfa",
              price: 4000,
              category: "Desayuno",
              image: "/images/filippo/tostada_con_guacamole_1744837461PYqjzs.jpg"
            },
            {
              id: "tostada-guacamole-huevos",
              name: "Tostada con Guacamole y Huevos Fritos",
              description: "With Fried Eggs",
              price: 5100,
              category: "Desayuno"
            },
            {
              id: "tostadas-mantequilla-mermelada",
              name: "Tostadas con Mantequilla & Mermelada",
              description: "Toast with Butter & Marmalade",
              price: 4000,
              category: "Desayuno"
            },
            {
              id: "croissant-mantequilla-mermelada",
              name: "Croissant con Mantequilla y Mermelada",
              description: "Croissant with Butter & Marmalade",
              price: 3500,
              category: "Desayuno"
            },
            {
              id: "croissant-jamon-queso",
              name: "Croissant con Jamón y Queso",
              description: "Croissant With Ham & Cheese",
              price: 4600,
              category: "Desayuno"
            },
            {
              id: "mimosa",
              name: "Mimosa",
              description: "Vino de Cava con Naranja o Fresa | Cava with Orange or Strawberry",
              price: 3300,
              category: "Desayuno"
            }
          ]
        },
        {
          id: "adiciones-desayuno",
          title: "Adiciones Sugeridas",
          items: [
            {
              id: "adicion-salmon-ahumado",
              name: "Salmón Ahumado",
              description: "Smoked Salmon",
              price: 2900,
              category: "Adiciones"
            },
            {
              id: "adicion-tocineta",
              name: "Tocineta",
              description: "Bacon",
              price: 3800,
              category: "Adiciones"
            },
            {
              id: "adicion-guacamole",
              name: "Guacamole",
              description: "Guacamole",
              price: 2000,
              category: "Adiciones"
            },
            {
              id: "adicion-queso-plancha",
              name: "Queso a la Plancha",
              description: "Fried Cheese",
              price: 2300,
              category: "Adiciones"
            },
            {
              id: "adicion-natilla",
              name: "Natilla",
              description: "Sour Cream",
              price: 600,
              category: "Adiciones"
            },
            {
              id: "adicion-platano-almibar",
              name: "Plátano en Almíbar",
              description: "Sweet Plantain",
              price: 900,
              category: "Adiciones"
            },
            {
              id: "adicion-salsa-holandesa",
              name: "Salsa Holandesa",
              description: "Hollandese Sauce",
              price: 1500,
              category: "Adiciones"
            },
            {
              id: "adicion-crema-avellanas",
              name: "Crema de Avellanas",
              description: "Hazelnut Cream",
              price: 600,
              category: "Adiciones"
            },
            {
              id: "adicion-jamon-cerdo",
              name: "Jamón de Cerdo",
              description: "Pork Ham",
              price: 1500,
              category: "Adiciones"
            },
            {
              id: "adicion-pechuga-pavo",
              name: "Pechuga de Pavo",
              description: "Turkey Breast",
              price: 2500,
              category: "Adiciones"
            }
          ]
        }
      ],
      recommendations: [
        {
          id: "desayuno-americano",
          name: "Americano",
          description: "Café, Jugo de Naranja, Huevos, Waffles, Tocineta, Papa Mini Salteada | Coffee, Orange Juice, Eggs, Waffles, Bacon, Sauteé Mini Potatoes",
          price: 10800,
          category: "Desayuno",
          image: "/images/filippo/desayuno_americano_1744837305PfIigD.jpg"
        },
        {
          id: "bowl-tico",
          name: "Bowl Tico",
          description: "Café, Jugo de Naranja, Huevos, Gallo Pinto, Natilla, Plátanos en Almíbar, Queso a la Plancha y Pan de la Casa | Coffee, Orange Juice, Eggs, Gallo Pinto, Sour Cream, Sweet Plantain, White Cheese, Toasts",
          price: 8500,
          category: "Desayuno",
          image: "/images/filippo/desayuno_tico_17448373315tzSsB.jpg"
        },
        {
          id: "desyuno-filippo",
          name: "Filippo",
          description: "Café, Jugo de Naranja, Huevos, Waffles, Tocineta, Papa Mini Salteada | Coffee, Orange Juice, Eggs, Waffles, Bacon, Sauteé Mini Potatoes",
          price: 10800,
          category: "Desayuno",
          image: "/images/filippo/desyuno_filippo_1744837210AmRdVt.jpg"
        }
      ]
    },
    {
      id: "postres",
      label: "Postres",
      menu: [
        {
          id: "postres-items",
          title: "Postres",
          items: [
            {
              id: "bomba-caramelo-chocolate",
              name: "Bomba de Caramelo o Chocolate con Helado de Vainilla",
              description: "Caramel or Chocolate Bomb with Vanilla Ice Cream",
              price: 5600,
              category: "Postres"
            },
            {
              id: "brownie-mode",
              name: "Brownie à la Mode",
              description: "Brownie à la Mode",
              price: 3900,
              category: "Postres"
            },
            {
              id: "budin-chocolate-blanco",
              name: "Budín de Chocolate Blanco con Coulis de Mora",
              description: "White Chocolate Pudding with Blackberry Coulis",
              price: 6500,
              category: "Postres"
            },
            {
              id: "calzone-nutella-banano",
              name: "Calzone di Nutella & Banano",
              description: "Nutella & Banana Calzone",
              price: 3400,
              category: "Postres"
            },
            {
              id: "cheesecake-fresa",
              name: "Cheesecake con Salsa de Fresa",
              description: "With Strawberry Sauce",
              price: 5200,
              category: "Postres"
            },
            {
              id: "choco-chip-horno",
              name: "Choco Chip al Horno con Helado de Vainilla",
              description: "Baked Choco Chip Cookie with Vanilla Ice Cream",
              price: 5900,
              category: "Postres",
              image: "/images/filippo/chocochip.jpg.webp"
            },
            {
              id: "pannacotta",
              name: "Pannacotta",
              description: "Pannacotta",
              price: 4700,
              category: "Postres"
            },
            {
              id: "mousse-chocolate",
              name: "Mousse de Chocolate",
              description: "Chocolate Mousse",
              price: 5100,
              category: "Postres"
            },
            {
              id: "pecan-pie",
              name: "Pecan Pie con Helado de Vainilla",
              description: "With Vanilla Ice Cream",
              price: 6000,
              category: "Postres",
              image: "/images/filippo/pecanpie.png"
            },
            {
              id: "pie-manzana-frutos-secos",
              name: "Pie de Manzana y Frutos Secos",
              description: "Apple and Dried Fruit Pie",
              price: 4700,
              category: "Postres"
            },
            {
              id: "pie-almendras-manzana",
              name: "Pie de Almendras y Manzana",
              description: "Almond and Apple Pie",
              price: 5900,
              category: "Postres"
            },
            {
              id: "queque-zanahoria",
              name: "Queque de Zanahoria con Lustre de Queso Crema y Nueces",
              description: "Carrot Cake with Cream Cheese Frosting",
              price: 4600,
              category: "Postres"
            },
            {
              id: "pan-canela-pecanas",
              name: "Pan de Canela y Pecanas",
              description: "Cinnamon and Pecan Bread",
              price: 4100,
              category: "Postres"
            },
            {
              id: "tiramisu",
              name: "Tiramisú con Tierra de Chocolate",
              description: "With Chocolate Sand",
              price: 4200,
              category: "Postres",
              image: "/images/filippo/tiramisu.jpg"
            },
            {
              id: "tarta-4-leches",
              name: "Tarta 4 Leches (Relleno de Dulce de Leche)",
              description: "4 Leches Cake (With Caramel)",
              price: 4500,
              category: "Postres"
            },
            {
              id: "tarta-chocolate-oscuro",
              name: "Tarta de Chocolate Oscuro",
              description: "Dark Chocolate Cake",
              price: 5000,
              category: "Postres",
              image: "/images/filippo/chocolatecake.png"
            },
            {
              id: "tarta-chocolate-sin-harina",
              name: "Tarta de Chocolate sin Harina",
              description: "Flourless Chocolate Cake",
              price: 5100,
              category: "Postres"
            }
          ]
        }
      ],
      recommendations: [
        {
          id: "choco-chip-horno",
          name: "Choco Chip al Horno con Helado de Vainilla",
          description: "Baked Choco Chip Cookie with Vanilla Ice Cream",
          price: 5900,
          category: "Postres",
          image: "/images/filippo/chocochip.jpg.webp"
        },
        {
          id: "tiramisu",
          name: "Tiramisú con Tierra de Chocolate",
          description: "With Chocolate Sand",
          price: 4200,
          category: "Postres",
          image: "/images/filippo/tiramisu.jpg"
        },
        {
          id: "tarta-chocolate-oscuro",
          name: "Tarta de Chocolate Oscuro",
          description: "Dark Chocolate Cake",
          price: 5000,
          category: "Postres",
          image: "/images/filippo/chocolatecake.png"
        }
      ]
    }
  ]
};


export default filippo;