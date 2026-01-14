import { RestaurantData } from '../data';

const olivegarden: RestaurantData = {
  name: "Olive Garden",
  logo: null,
  colors: {
    primary: "#A6AD00",
    "primary-dark": "#54301A",
    background: "#E4E1DC"
  },
  recommendations: [
    {
      id: "tour-of-italy",
      name: "Tour of Italy",
      description: "Three OG classics all on one plate! Chicken...",
      price: 14900,
      category: "Favorite Classics",
      image: "/images/olive-garden/tourofitaly.png.jxl"
    },
    {
      id: "chicken-alfredo",
      name: "Chicken Alfredo",
      description: "Grilled chicken slices and our famous Alfredo sauce...",
      price: 12900,
      category: "Amazing Alfredos",
      image: "https://github.com/user-attachments/assets/5ff9a695-3b84-4de5-b3d4-39b0ed4760cb"
    },
    {
      id: "classic-lasagna",
      name: "Classic Lasagna",
      description: "Classic lasagna, prepared with layers of pasta, Parmesan...",
      price: 11900,
      category: "Favorite Classics",
      image: "/images/olive-garden/LasagnaClassico_011924.png.jxl"
    }
  ],
  menu: [
    {
      id: "appetizers",
      title: "Appetizers",
      items: [
        {
          id: "fried-mozzarella",
          name: "Fried Mozzarella",
          description: "Crispy, golden mozzarella cheese served with marinara sauce.",
          price: 5900,
          image: "https://github.com/user-attachments/assets/286d474e-c3f4-42b1-99e7-f6b3b468ce4f",
          category: "Appetizers"
        },
        {
          id: "spinach-artichoke-dip",
          name: "Spinach-Artichoke Dip",
          description: "A mix of spinach, artichokes and five cheeses...",
          price: 7900,
          image: "/images/olive-garden/dip.jpg.jxl",
          category: "Appetizers"
        },
        {
          id: "dipping-sauces-breadsticks",
          name: "Never-Ending Dipping Sauces for Breadsticks",
          description: "Marinara, Alfredo, or Five Cheese Marinara Sauces",
          price: 2900,
          image: "/images/olive-garden/sauces.png.jxl",
          category: "Appetizers"
        },
        {
          id: "shrimp-fritto-misto",
          name: "Shrimp Fritto Misto",
          description: "Shrimp mixed with onions and bell peppers, hand-breaded...",
          price: 8900,
          image: "/images/olive-garden/fritto.jpg.jxl",
          category: "Appetizers"
        },
        {
          id: "fried-lasagna",
          name: "Fried Lasagna",
          description: "Fried parmesan-breaded lasagna, topped with parmesan cheese and meat...",
          price: 6900,
          image: "/images/olive-garden/lasagnafritta.jpg.jxl",
          category: "Appetizers"
        },
        {
          id: "bruschetta",
          name: "Bruschetta",
          description: "Traditional mix of fresh chopped tomatoes with basil...",
          price: 4900,
          image: "/images/olive-garden/bruschetta.jpg.jxl",
          category: "Appetizers"
        },
        {
          id: "meatballs-parmigiana",
          name: "Meatballs Parmigiana",
          description: "Hearty meatballs baked in homemade marinara, topped with...",
          price: 8900,
          image: "https://github.com/user-attachments/assets/d603d75b-23b6-4e42-a0c2-b03a55c2cf78",
          category: "Appetizers"
        }
      ]
    },
    {
      id: "soups-and-salads",
      title: "Soups and Salads",
      items: [
        {
          id: "chicken-gnocchi",
          name: "Chicken & Gnocchi",
          description: "A creamy soup made with roasted chicken, traditional...",
          price: 4900,
          image: "https://github.com/user-attachments/assets/37c05391-ff8b-4ae0-afcb-54563a19dffd",
          category: "Soups and Salads"
        },
        {
          id: "minestrone",
          name: "Minestrone",
          description: "Fresh vegetables, beans and pasta in a light...",
          price: 4900,
          image: "https://github.com/user-attachments/assets/42a3ebad-6bae-4a73-92ae-e7ac9fc532b2",
          category: "Soups and Salads"
        },
        {
          id: "zuppa-toscana",
          name: "Zuppa Toscana",
          description: "Spicy Italian sausage, fresh kale and russet potatoes...",
          price: 4900,
          image: "/images/olive-garden/SSS_Zuppa_Toscana_111422_v1_9391559b-d381-4d41-be9a-aca678026a86.jpg.webp",
          category: "Soups and Salads"
        },
        {
          id: "house-salad",
          name: "House salad",
          description: "Our famous salad prepared with mixed greens, black...",
          price: 4900,
          image: "https://github.com/user-attachments/assets/3d6e8df7-6723-4d86-8858-61aac7e056bb",
          category: "Soups and Salads"
        },
        {
          id: "never-ending-soup-salad-breadsticks",
          name: "Never-Ending Soup, Salad & Breadsticks",
          description: "Our famous breadsticks and salad with your choice...",
          price: 7900,
          image: "/images/olive-garden/SoulSaladAndBreadsticks_346ed0e7-5f17-463c-99d2-a8f426d23de1.png.webp",
          category: "Soups and Salads"
        }
      ]
    },
    {
      id: "favorite-classics",
      title: "Favorite Classics",
      items: [
        {
          id: "herb-grilled-salmon",
          name: "Herb-Grilled Salmon",
          description: "Filet grilled to perfection and topped with garlic...",
          price: 14900,
          image: "https://github.com/user-attachments/assets/948a7334-b179-49ad-aa36-44244240c052",
          category: "Favorite Classics"
        },
        {
          id: "salmon-piccata",
          name: "Salmon Piccata",
          description: "Perfectly grilled salmon, tossed in a butter, garlic,....",
          price: 15900,
          image: "/images/olive-garden/salmonpiccata.png.jxl",
          category: "Favorite Classics"
        },
        {
          id: "chicken-shrimp-carbonara",
          name: "Chicken & Shrimp Carbonara",
          description: "Chicken, shrimp, and spaghetti tossed in a creamy...",
          price: 15400,
          image: "/images/olive-garden/Chicken_ShrimpCarbonara072722_x3_1.png.jxl",
          category: "Favorite Classics"
        },
        {
          id: "chicken-piccata",
          name: "Chicken Piccata",
          description: "Grilled chicken breast tossed in a butter, garlic,...",
          price: 12900,
          image: "/images/olive-garden/chickenpicatta.png.jxl",
          category: "Favorite Classics"
        },
        {
          id: "grilled-chicken-margherita",
          name: "Grilled Chicken Margherita",
          description: "Grilled chicken breasts topped with fresh tomatoes, mozzarella,...",
          price: 13900,
          image: "/images/olive-garden/Chicken_Grilled_Margarita.png.jxl",
          category: "Favorite Classics"
        },
        {
          id: "chicken-scampi",
          name: "Chicken Scampi",
          description: "Angel hair topped with chicken wrapped in a...",
          price: 13900,
          image: "/images/olive-garden/scampi.jpg.jxl",
          category: "Favorite Classics"
        },
        {
          id: "spaghetti-meatballs",
          name: "Spaghetti & Meatballs",
          description: "Enjoy Spaghetti and Meatballs with meat sauce or...",
          price: 10900,
          image: "/images/olive-garden/meatballs.png",
          category: "Favorite Classics"
        },
        {
          id: "five-cheese-baked-ziti",
          name: "Five Cheese Baked Ziti",
          description: "Ziti pasta covered in five-cheese marinara sauce and...",
          price: 10900,
          image: "/images/olive-garden/five.jpg.jxl",
          category: "Favorite Classics"
        },
        {
          id: "classic-lasagna",
          name: "Classic Lasagna",
          description: "Classic lasagna, prepared with layers of pasta, Parmesan...",
          price: 11900,
          image: "/images/olive-garden/LasagnaClassico_011924.png.jxl",
          category: "Favorite Classics"
        },
        {
          id: "chicken-parmigiana",
          name: "Chicken Parmigiana",
          description: "Chicken Parmigiana-style breasts, topped with our marinara sauce...",
          price: 13900,
          image: "/images/olive-garden/ChickenParmesan_v2.jpg.jxl",
          category: "Favorite Classics"
        },
        {
          id: "tour-of-italy",
          name: "Tour of Italy",
          description: "Three OG classics all on one plate! Chicken...",
          price: 14900,
          image: "/images/olive-garden/tourofitaly.png.jxl",
          category: "Favorite Classics"
        }
      ]
    },
    {
      id: "amazing-alfredos",
      title: "Amazing Alfredos",
      items: [
        {
          id: "shrimp-alfredo",
          name: "Shrimp Alfredo",
          description: "Creamy homemade fettuccine alfredo mixed with sauteed shrimp",
          price: 14900,
          image: "/images/olive-garden/shrimp_nuevo.jpg",
          category: "Amazing Alfredos"
        },
        {
          id: "chicken-alfredo",
          name: "Chicken Alfredo",
          description: "Grilled chicken slices and our famous Alfredo sauce...",
          price: 12900,
          image: "https://github.com/user-attachments/assets/5ff9a695-3b84-4de5-b3d4-39b0ed4760cb",
          category: "Amazing Alfredos"
        },
        {
          id: "fettuccine-alfredo",
          name: "Fettuccine Alfredo",
          description: "Our sauce is prepared daily, every morning, with...",
          price: 8900,
          image: "https://github.com/user-attachments/assets/2064bb89-9b13-44d0-83e7-9f3e5a5aa709",
          category: "Amazing Alfredos"
        },
        {
          id: "steak-gorgonzola-alfredo",
          name: "Steak Gorgonzola Alfredo",
          description: "Grilled sirloin* tips over fettuccine alfredo, tossed with gorgonzola...",
          price: 15900,
          image: "/images/olive-garden/SteakGorgonzolaAlfredo.png.jxl",
          category: "Amazing Alfredos"
        },
        {
          id: "steak-alfredo",
          name: "Steak Alfredo",
          description: "Grilled steak accompanied with fettuccine alfredo",
          price: 16900,
          image: "/images/olive-garden/Merch_Steak_Alfredo.png.jxl",
          category: "Amazing Alfredos"
        }
      ]
    },
    {
      id: "pronto-bowl-monday-to-friday",
      title: "Pronto Bowl (Monday to Friday)",
      items: [
        {
          id: "chicken-alfredo-pronto",
          name: "Chicken Alfredo (Pronto Bowl)",
          description: "Served with fettuccine",
          price: 7900,
          image: "/images/olive-garden/chickenalfredo-pronto.png.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "lasagna-classico-pronto",
          name: "Lasagna Classico (Pronto Bowl)",
          description: "Layers of pasta, Italian cheeses and meat sauce",
          price: 6900,
          image: "/images/olive-garden/LasagnaClassico_pronto94f.jpg.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "spaghetti-meatballs-pronto",
          name: "Spaghetti & Meatballs (Pronto Bowl)",
          description: "Our homemade meat sauce and three meatballs, served...",
          price: 6400,
          image: "/images/olive-garden/spaghettiandmeatballs-pronto.png.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "tortelloni-al-forno-pronto",
          name: "Tortelloni al Forno (Pronto Bowl)",
          description: "Tortellonis filled with Asiago cheese, tossed in marinara...",
          price: 5900,
          image: "/images/olive-garden/Tortelloni_al_Forno_GrilledChicken_pronto_340a0882-f513-482c-99e4-83d0938ffcc5.jpg.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "fettuccine-alfredo-pronto",
          name: "Fettuccine Alfredo (Pronto Bowl)",
          description: "Our sauce is prepared daily, every morning, with...",
          price: 5900,
          image: "/images/olive-garden/fet_alfredo-pronto.png.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "margherita-pizza-pronto",
          name: "Margherita Pizza (Pronto Bowl)",
          description: "Traditional pizza with marinara sauce, tomato and Italian...",
          price: 7900,
          image: "/images/olive-garden/pizza-pronto.png.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        },
        {
          id: "spaghetti-marinara-meat-pronto",
          name: "Spaghetti with Marinara or Meat Sauce (Pronto Bowl)",
          description: "Served with marinara or meat sauce",
          price: 4900,
          image: "/images/olive-garden/og-spaghetti-with-meat-sauce-prontojpg.jxl",
          category: "Pronto Bowl (Monday to Friday)"
        }
      ]
    },
    {
      id: "desserts",
      title: "Desserts",
      items: [
        {
          id: "chocolate-lasagna",
          name: "Chocolate Lasagna",
          description: "Layers of cake and creamy chocolate mousse sandwiched...",
          price: 5900,
          image: "https://github.com/user-attachments/assets/233d57f0-dd1a-4a71-bc5e-6f8896e5c703",
          category: "Desserts"
        },
        {
          id: "ice-cream-cup",
          name: "Ice cream cup",
          description: "Vanilla ice cream cup",
          price: 1900,
          image: "https://github.com/user-attachments/assets/0dfaf82b-1684-4edf-8761-b670719f4a81",
          category: "Desserts"
        },
        {
          id: "strawberry-cream-cake",
          name: "Strawberry Cream Cake",
          description: "Vanilla sponge cake topped with sweet vanilla cream...",
          price: 5900,
          image: "https://github.com/user-attachments/assets/b220e3a9-122d-4fe8-a56b-ce772e92afc9",
          category: "Desserts"
        },
        {
          id: "black-tie-mousse-cake",
          name: "Black Tie Mousse Cake",
          description: "Chocolate cake, dark chocolate cheesecake and cream with...",
          price: 5900,
          image: "https://github.com/user-attachments/assets/fea13c5e-6951-47be-824a-b60fd0cb4117",
          category: "Desserts"
        },
        {
          id: "sicilian-cheesecake",
          name: "Sicilian Cheesecake",
          description: "Ricotta cheesecake with butter cookie dough, topped with...",
          price: 5900,
          image: "https://github.com/user-attachments/assets/b2cc7983-06eb-46c0-9622-c56f58875bea",
          category: "Desserts"
        },
        {
          id: "tiramisu",
          name: "Tiramisu",
          description: "An Italian classic, for coffee lovers",
          price: 5900,
          image: "https://github.com/user-attachments/assets/d43aa0fe-bed1-473e-ae78-f6f9d8fc04f6",
          category: "Desserts"
        }
      ]
    },
    {
      id: "childrens-menu",
      title: "Children's Menu",
      items: [
        {
          id: "create-your-own-pasta-kids",
          name: "Create Your Own Pasta (Kids Menu)",
          description: "Create your favorite pasta dish by choosing your...",
          price: 4900,
          image: "/images/olive-garden/createyourown.jpg.jxl",
          category: "Children's Menu"
        },
        {
          id: "ice-cream-cup-kids",
          name: "Ice Cream Cup (Kids Menu)",
          description: "Vanilla ice cream with chocolate syrup, whipped cream...",
          price: 1900,
          image: "https://github.com/user-attachments/assets/0dfaf82b-1684-4edf-8761-b670719f4a81",
          category: "Children's Menu"
        },
        {
          id: "smoothie",
          name: "Smoothie",
          description: "Refreshing strawberry or banana smoothie.",
          price: 2900,
          image: "/images/olive-garden/Smoothie_menu_de_ninosv.jpg.webp",
          category: "Children's Menu"
        },
        {
          id: "lasagna-kids",
          name: "Lasagna (Children's Menu)",
          description: "Prepared fresh daily with layers of pasta, Italian...",
          price: 5900,
          image: "/images/olive-garden/LasagnaClassico_011924.png.jxl",
          category: "Children's Menu"
        },
        {
          id: "chicken-fingers",
          name: "Chicken Fingers",
          description: "Lightly breaded chicken tenders, served with potatoes or...",
          price: 5900,
          image: "/images/olive-garden/ChickenFingerswithBroccoli_Kids_Jan-2023.jpg.jxl",
          category: "Children's Menu"
        },
        {
          id: "garden-salad",
          name: "Garden Salad",
          description: "Served with our signature Italian dressing (served on...",
          price: 3900,
          image: "/images/olive-garden/gardensalad.png.jxl",
          category: "Children's Menu"
        },
        {
          id: "macaroni-cheese",
          name: "Macaroni & Cheese",
          description: "Delicious Macaroni and Cheese",
          price: 5900,
          image: "/images/olive-garden/MacaroniCheese_2054.png.jxl",
          category: "Children's Menu"
        },
        {
          id: "pizza-kids",
          name: "Pizza (Kids Menu)",
          description: "Cheese pizza for kids",
          price: 5900,
          image: "/images/olive-garden/pizzaninos.png.jxl",
          category: "Children's Menu"
        }
      ]
    },
    {
      id: "drinks",
      title: "Drinks",
      items: [
        {
          id: "gallon-iced-tea",
          name: "Gallon of Iced Tea",
          description: "House-made iced tea, available with or without sugar",
          price: 2500,
          image: "https://github.com/user-attachments/assets/e42d8fee-63fa-474f-8b0d-c8b1835591f0",
          category: "Drinks"
        },
        {
          id: "alcoholic-beverages",
          name: "Alcoholic Beverages",
          description: "Choose from Spiked Strawberry Lemonade, Mojito, Blue Hawaiian...",
          price: 4900,
          image: "/images/olive-garden/bebidasalcoholicas.png.webp",
          category: "Drinks"
        },
        {
          id: "sangria-pitcher",
          name: "Sangria Pitcher",
          description: "Refreshing sangria served in a pitcher",
          price: 4900,
          image: "https://github.com/user-attachments/assets/f98902a9-4ee1-4563-a70e-170ede3f5e03",
          category: "Drinks"
        },
        {
          id: "red-wine",
          name: "Red Wine",
          description: "Selection of red wines",
          price: 4900,
          image: "https://github.com/user-attachments/assets/e2a34be0-9784-4c7b-a98c-801cc7c2683c",
          category: "Drinks"
        },
        {
          id: "non-alcoholic-beverages",
          name: "Non-alcoholic beverages",
          description: "Choose from Lemonades, Lemonade, Spearmint Lemonade, Raspberry Lemonade,....",
          price: 1900,
          image: "/images/olive-garden/bebidasnoalcoholicas.png.jxl",
          category: "Drinks"
        },
        {
          id: "soft-drinks-refills",
          name: "Soft drinks with refills",
          description: "Choose between Coca-Cola, Coca-Cola Zero Sugar, Ginger Ale",
          price: 2250,
          image: "/images/olive-garden/Gaseosas.jpg.jxl",
          category: "Drinks"
        },
        {
          id: "beers",
          name: "Beers",
          description: "Choose between Imperial, Imperial Silver, Imperial Light, Bavaria...",
          price: 2500,
          image: "https://github.com/user-attachments/assets/b114d40d-1891-47b3-a6d5-b0077618f6eb",
          category: "Drinks"
        },
        {
          id: "hot-drinks",
          name: "Hot Drinks",
          description: "Choose between Espresso, Café Latte, Café Mocha, Cappuccino,...",
          price: 1500,
          image: "https://github.com/user-attachments/assets/6e3771cf-162e-45e8-bf17-e50583b2707b",
          category: "Drinks"
        },
        {
          id: "bottled-water",
          name: "Bottled water",
          description: "Choose between Acqua Panna Spring (500 ml), Pellegrino...",
          price: 1500,
          image: "https://github.com/user-attachments/assets/cec4684e-7f72-416b-96c2-32063e5dc844",
          category: "Drinks"
        }
      ]
    }
  ]
};

export default olivegarden;
