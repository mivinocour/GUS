import { RestaurantData } from '../data';

const negroni: RestaurantData = {
  name: "Caffe Negroni",
  slug: "negroni",
  logo: null,
  colors: {
    primary: "#FFFFFF",
    "primary-dark": "#1B2625",
    background: "#2D3E3C"
  },
  recommendations: [
    {
      id: "corte-negroni",
      name: "Corte Negroni",
      description: "Gnocchi en mantequilla de orégano, picanha cocida 12 hrs, jugos de cocción",
      price: 17500,
      category: "AL FORNO",
      image: ""
    },
    {
      id: "tabla-mixta",
      name: "Tabla Mixta",
      description: "Variedad de quesos, charcutería, pan de masa madre, mermelada de frutos rojos y naranja, semillas mixtas",
      price: 17500,
      category: "ENTRADAS",
      image: ""
    },
    {
      id: "risotto-camarones",
      name: "Risotto con Camarones",
      description: "Fondo de camarón, eneldo, emulsión de limón",
      price: 13900,
      category: "PASTAS",
      image: ""
    }
  ],
  menu: [], // Will be populated from menuTabs
  menuTabs: [
    {
      id: "principal",
      label: "Principal",
      menu: [
        {
          id: "entradas",
          title: "ENTRADAS",
          items: [
            {
              id: "canasta-pan-masa-madre",
              name: "Canasta de Pan de Masa Madre",
              description: "Pan fresco de masa madre, mantequilla de aceitunas, pan tumaca",
              price: 2500,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "papas-negroni",
              name: "Papas Negroni",
              description: "Papas fritas, mayonesa rostizada, especias cajún",
              price: 4200,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "arancini-ragu",
              name: "Arancini de Ragú",
              description: "Relleno de ragú y mozzarella",
              price: 4800,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "hummus-casa",
              name: "Hummus de la Casa",
              description: "Pan de masa madre",
              price: 5600,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "hummus-casa-gluten-free",
              name: "Hummus de la Casa (Gluten Free)",
              description: "Pan gluten free",
              price: 6400,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "labneh",
              name: "Labneh",
              description: "Pan de masa madre, aceite de oliva",
              price: 5600,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "labneh-gluten-free",
              name: "Labneh (Gluten Free)",
              description: "Pan gluten free",
              price: 6400,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "carpaccio-lomito",
              name: "Carpaccio de Lomito",
              description: "Alcaparrón, limón, mayonesa de alcaparras, parmesano, aceite de oliva trufado, focaccia",
              price: 7900,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "carpaccio-lomito-gluten-free",
              name: "Carpaccio de Lomito (Gluten Free)",
              description: "Focaccia gluten free",
              price: 8300,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "crocante-atun",
              name: "Crocante de Atún",
              description: "Atún marinado con alioli de pimientos, arroz arborio crocante, cebolla morada, cebollino",
              price: 6900,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "tartar-dorado",
              name: "Tartar de Dorado",
              description: "Pasta de ají con jengibre, cebolla, culantro, limón, maní, cremoso de aguacate",
              price: 6100,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "burrata-caprese",
              name: "Burrata Caprese",
              description: "Tomate cherry, aceite de oliva, albahaca, limón, focaccia o pan de masa madre",
              price: 9200,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "burrata-caprese-gluten-free",
              name: "Burrata Caprese (Gluten Free)",
              description: "Pan gluten free",
              price: 9900,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "calamari-fritti",
              name: "Calamari Fritti",
              description: "Calamares, pangrattato, mayonesa de limón y ralladura de limón",
              price: 5700,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "tabla-mixta",
              name: "Tabla Mixta",
              description: "Variedad de quesos, charcutería, pan de masa madre, mermelada de frutos rojos y naranja, semillas mixtas",
              price: 17500,
              category: "ENTRADAS",
              image: ""
            },
            {
              id: "sopa-pescado",
              name: "Sopa de Pescado",
              description: "Leche de coco, pescado, camarones, almejas, tomillo, chile picante",
              price: 7600,
              category: "ENTRADAS",
              image: ""
            }
          ]
        },
        {
          id: "ensaladas",
          title: "ENSALADAS",
          items: [
            {
              id: "ensalada-entrana",
              name: "Ensalada de Entraña",
              description: "Mix de hojas verdes, tomate cherry, queso de cabra, marañón, aceitunas marinadas, vinagreta de balsámico con naranja, aceite de oliva y limón",
              price: 7900,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "ensalada-mediterranea",
              name: "Ensalada Mediterránea",
              description: "Mix de hojas verdes, tomate cherry, queso feta, cebolla morada, pepino, pimiento morrón, aceitunas kalamata, alcaparras, orégano, vinagreta de limón y aceite de oliva",
              price: 6500,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "ensalada-camaron",
              name: "Ensalada de Camarón",
              description: "Mix de hojas verdes, camarones parrillados, coco tostado, cebollas encurtidas, aderezo de aguacate, tomate cherry, chile morrón, pangrattato con hierbas",
              price: 8500,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "ensalada-griega",
              name: "Ensalada Griega",
              description: "Mix de hojas verdes, pepino, arúgula, cebolla morada, aceitunas kalamata, tomate cherry, queso feta, garbanzos tostados, chile morrón, aderezo de tzatziki",
              price: 6500,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "extra-proteina-pollo",
              name: "Extra de Proteína - Pechuga de Pollo",
              description: "Agregar pechuga de pollo a cualquier ensalada",
              price: 2700,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "extra-proteina-salmon",
              name: "Extra de Proteína - Salmón",
              description: "Agregar salmón a cualquier ensalada",
              price: 3700,
              category: "ENSALADAS",
              image: ""
            },
            {
              id: "extra-proteina-camarones",
              name: "Extra de Proteína - Camarones",
              description: "Agregar camarones a cualquier ensalada",
              price: 3900,
              category: "ENSALADAS",
              image: ""
            }
          ]
        },
        {
          id: "pizzas",
          title: "PIZZAS",
          items: [
            {
              id: "focaccia",
              name: "Focaccia",
              description: "Aceite infusionado, tomates confitados y romero",
              price: 5500,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "focaccia-gluten-free",
              name: "Focaccia (Gluten Free)",
              description: "Masa gluten free",
              price: 4510,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "margarita",
              name: "Margarita",
              description: "Tomate fresco, albahaca, ajo rostizado",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "margarita-gluten-free",
              name: "Margarita (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "napolitana",
              name: "Napolitana",
              description: "Tomate fresco, orégano deshidratado y chimi de la casa",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "napolitana-gluten-free",
              name: "Napolitana (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "fugazzeta",
              name: "Fugazzeta",
              description: "Cebolla, mozzarella, orégano y parmesano",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "fugazzeta-gluten-free",
              name: "Fugazzeta (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "cuatro-quesos",
              name: "Cuatro Quesos",
              description: "Mozzarella, gorgonzola, feta, parmesano, orégano",
              price: 8900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "cuatro-quesos-gluten-free",
              name: "Cuatro Quesos (Gluten Free)",
              description: "Masa gluten free",
              price: 9890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "prosciutto-hongos",
              name: "Prosciutto",
              description: "Hongos frescos, albahaca",
              price: 9100,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "prosciutto-hongos-gluten-free",
              name: "Prosciutto (Gluten Free)",
              description: "Masa gluten free",
              price: 10090,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "pepperoni",
              name: "Pepperoni",
              description: "Pepperoni, arúgula, aceitunas",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "pepperoni-gluten-free",
              name: "Pepperoni (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "calzone-vegetariano",
              name: "Calzone Vegetariano",
              description: "Berenjenas asadas, hongos frescos, aceitunas kalamata, hierbas, mix de hojas verdes",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "calzone-vegetariano-gluten-free",
              name: "Calzone Vegetariano (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "calzone-prosciutto",
              name: "Calzone de Prosciutto",
              description: "Mozzarella, arúgula, parmesano",
              price: 8900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "calzone-prosciutto-gluten-free",
              name: "Calzone de Prosciutto (Gluten Free)",
              description: "Masa gluten free",
              price: 9890,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "classica",
              name: "Classica",
              description: "Jamón y hongos",
              price: 7900,
              category: "PIZZAS",
              image: ""
            },
            {
              id: "classica-gluten-free",
              name: "Classica (Gluten Free)",
              description: "Masa gluten free",
              price: 8890,
              category: "PIZZAS",
              image: ""
            }
          ]
        },
        {
          id: "pastas",
          title: "PASTAS",
          items: [
            {
              id: "gnocchi-pomodoro",
              name: "Gnocchi al Pomodoro",
              description: "Alcaparras, pomodoro, hongos, tomate deshidratado, mozzarella, parmesano",
              price: 8500,
              category: "PASTAS",
              image: ""
            },
            {
              id: "risotto-camarones",
              name: "Risotto con Camarones",
              description: "Fondo de camarón, eneldo, emulsión de limón",
              price: 13900,
              category: "PASTAS",
              image: ""
            },
            {
              id: "tortellini-stracciatella",
              name: "Tortellini de Stracciatella",
              description: "Salvia, ralladura de limón, prosciutto crocante, arvejas, queso parmesano",
              price: 10100,
              category: "PASTAS",
              image: ""
            },
            {
              id: "ravioli-burrata-limon",
              name: "Ravioli de Burrata y Limón",
              description: "Straciatella, ralladura de limón, salsa de mantequilla y albahaca, prosciutto crocante",
              price: 9400,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-hongos",
              name: "Fettuccine de Hongos",
              description: "Porcini, hongos, salsa de vino blanco",
              price: 8900,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-hongos-penne-gf",
              name: "Fettuccine de Hongos - Pasta Gluten Free (Penne)",
              description: "Penne gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-hongos-fusilli-gf",
              name: "Fettuccine de Hongos - Pasta Gluten Free (Fusilli)",
              description: "Fusilli gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-hongos-spaghetti-gf",
              name: "Fettuccine de Hongos - Pasta Gluten Free (Spaghetti)",
              description: "Spaghetti gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-casa-trucha",
              name: "Fettuccine de la Casa con Trucha",
              description: "Mantequilla, salvia, parmesano",
              price: 8500,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-casa-trucha-penne-gf",
              name: "Fettuccine de la Casa con Trucha - Pasta Gluten Free (Penne)",
              description: "Penne gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-casa-trucha-fusilli-gf",
              name: "Fettuccine de la Casa con Trucha - Pasta Gluten Free (Fusilli)",
              description: "Fusilli gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "fettuccine-casa-trucha-spaghetti-gf",
              name: "Fettuccine de la Casa con Trucha - Pasta Gluten Free (Spaghetti)",
              description: "Spaghetti gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "spaghetti-camarones",
              name: "Spaghetti con Camarones",
              description: "Pesto de ayote, queso feta, ralladura de limón",
              price: 8900,
              category: "PASTAS",
              image: ""
            },
            {
              id: "spaghetti-camarones-penne-gf",
              name: "Spaghetti con Camarones - Pasta Gluten Free (Penne)",
              description: "Penne gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "spaghetti-camarones-fusilli-gf",
              name: "Spaghetti con Camarones - Pasta Gluten Free (Fusilli)",
              description: "Fusilli gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "spaghetti-camarones-spaghetti-gf",
              name: "Spaghetti con Camarones - Pasta Gluten Free (Spaghetti)",
              description: "Spaghetti gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "rigatoni-ragu",
              name: "Rigatoni al Ragú",
              description: "Ragú de res, salsa pomodoro, Grana Padano, aceite de albahaca",
              price: 10200,
              category: "PASTAS",
              image: ""
            },
            {
              id: "rigatoni-ragu-penne-gf",
              name: "Rigatoni al Ragú - Pasta Gluten Free (Penne)",
              description: "Penne gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "rigatoni-ragu-fusilli-gf",
              name: "Rigatoni al Ragú - Pasta Gluten Free (Fusilli)",
              description: "Fusilli gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "rigatoni-ragu-spaghetti-gf",
              name: "Rigatoni al Ragú - Pasta Gluten Free (Spaghetti)",
              description: "Spaghetti gluten free",
              price: 990,
              category: "PASTAS",
              image: ""
            },
            {
              id: "ravolon-osobuco",
              name: "Raviolón de Osobuco",
              description: "Pomodoro, aceitunas fritas y parmesano",
              price: 8900,
              category: "PASTAS",
              image: ""
            }
          ]
        },
        {
          id: "al-forno",
          title: "AL FORNO",
          items: [
            {
              id: "corte-negroni",
              name: "Corte Negroni",
              description: "Gnocchi en mantequilla de orégano, picanha cocida 12 hrs, jugos de cocción",
              price: 17500,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "lasagna-berenjena",
              name: "Lasagna de Berenjena",
              description: "Blend de quesos, pomodoro, hongos, vegetales",
              price: 8500,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "lasagna-carne",
              name: "Lasagna de Carne",
              description: "Lasagna tradicional con carne",
              price: 9700,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "osobuco-braseado",
              name: "Osobuco Braseado",
              description: "Risotto alla Parmigiana, reducción de jugos",
              price: 15000,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "costilla-res-horno",
              name: "Costilla de Res al Horno (8 Horas)",
              description: "Papas en gajo con aceite de ajo y hierbas, mix de hojas verdes",
              price: 13900,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "pargo-vino",
              name: "Pargo al Vino",
              description: "Vino blanco, mantequilla, ajo, alcaparras, vegetales al vapor",
              price: 13900,
              category: "AL FORNO",
              image: ""
            },
            {
              id: "pollo-hueso-pesto",
              name: "Pollo con Hueso en Pesto de Hierbas",
              description: "Ensalada Fattoush: tomate, pepino, lechuga, cebolla, rábano, menta fresca, perejil, chile dulce, vinagreta aceite de oliva y limón, focaccia frita",
              price: 9500,
              category: "AL FORNO",
              image: ""
            }
          ]
        },
        {
          id: "parrilla",
          title: "PARRILLA",
          items: [
            {
              id: "bisteca-pimienta",
              name: "Bisteca a la Pimienta",
              description: "Lomito, salsa de pimienta, aceite de albahaca, papas fritas",
              price: 14500,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "salmon-parrilla",
              name: "Salmón a la Parrilla",
              description: "Risotto con ralladura de limón o ensalada griega",
              price: 14900,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "lomito-fettuccine",
              name: "Lomito",
              description: "Fettuccine en salsa de hongos, salsa de vino blanco, tomates cherry, aceite de hierbas",
              price: 15900,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "lomito-fettuccine-penne-gf",
              name: "Lomito - Pasta Gluten Free (Penne)",
              description: "Penne gluten free",
              price: 990,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "lomito-fettuccine-fusilli-gf",
              name: "Lomito - Pasta Gluten Free (Fusilli)",
              description: "Fusilli gluten free",
              price: 990,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "lomito-fettuccine-spaghetti-gf",
              name: "Lomito - Pasta Gluten Free (Spaghetti)",
              description: "Spaghetti gluten free",
              price: 990,
              category: "PARRILLA",
              image: ""
            },
            {
              id: "entrana-risotto",
              name: "Entraña",
              description: "Risotto de hongos",
              price: 16900,
              category: "PARRILLA",
              image: ""
            }
          ]
        }
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
              id: "canasta-pan-desayuno",
              name: "Canasta de Pan de Masa Madre",
              description: "Pan de masa madre, mantequilla de aceituna, pan tumaca",
              price: 2500,
              category: "Desayuno",
              image: ""
            },
            {
              id: "frutas-temporada",
              name: "Frutas de Temporada",
              description: "Selección de frutas frescas de temporada",
              price: 3800,
              category: "Desayuno",
              image: ""
            },
            {
              id: "granola-casera",
              name: "Granola Casera",
              description: "Yogur griego, miel de abeja, fruta de temporada",
              price: 4500,
              category: "Desayuno",
              image: ""
            },
            {
              id: "pancakes",
              name: "Pancakes",
              description: "Miel de maple o chocolate",
              price: 4900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "omelette-gusto",
              name: "Omelette al Gusto",
              description: "Pan, hongos, espinaca, cebolla, chile dulce, jamón, mozzarella, ensalada verde, tomates cherry",
              price: 6100,
              category: "Desayuno",
              image: ""
            },
            {
              id: "omelette-gusto-gluten-free",
              name: "Omelette al Gusto (Gluten Free)",
              description: "Pan gluten free",
              price: 6900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "omelette-salmon-curado",
              name: "Omelette de Salmón Curado",
              description: "Pan de masa madre, huevo, salmón curado, cremoso de eneldo, arúgula, tomate cherry, cebolla morada, aderezo de trufa, eneldo",
              price: 6300,
              category: "Desayuno",
              image: ""
            },
            {
              id: "las-francesas",
              name: "Las Francesas",
              description: "Pan brioche, banano, fresas, arándanos, miel de maple",
              price: 6100,
              category: "Desayuno",
              image: ""
            },
            {
              id: "huevos-turcos",
              name: "Huevos Turcos",
              description: "Pan de masa madre, huevos pochados, labneh, eneldo, marañón",
              price: 5900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "huevos-turcos-gluten-free",
              name: "Huevos Turcos (Gluten Free)",
              description: "Pan gluten free",
              price: 6700,
              category: "Desayuno",
              image: ""
            },
            {
              id: "croissant-benedictino",
              name: "Croissant Benedictino",
              description: "Croissant hecho en casa, huevos pochados, prosciutto, hongos, salsa holandesa",
              price: 6400,
              category: "Desayuno",
              image: ""
            },
            {
              id: "tostada-salmon-feta",
              name: "Tostada de Salmón y Queso Feta",
              description: "Pan de masa madre, salmón curado, crema de queso feta y hierbas, mix de verdes, hongos, tomate confitado",
              price: 6600,
              category: "Desayuno",
              image: ""
            },
            {
              id: "sarten-provence",
              name: "Sartén Provençe",
              description: "Papas provenzales, huevos al gusto, tocineta, salsa de hierbas",
              price: 5900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "mi-tico",
              name: "Mi Tico",
              description: "Gallo pinto, huevos, tocineta, queso semiduro Zarcero, plátano maduro, aguacate, natilla casera",
              price: 6500,
              category: "Desayuno",
              image: ""
            },
            {
              id: "croque-madame",
              name: "Croque Madame",
              description: "Pan de masa madre, jamón cocido, blend de quesos, mostaza, huevo frito",
              price: 6800,
              category: "Desayuno",
              image: ""
            },
            {
              id: "panini-prosciutto",
              name: "Panini de Prosciutto",
              description: "Queso mozzarella, salsa romesco, mix de verdes, pepinillos encurtidos",
              price: 6100,
              category: "Desayuno",
              image: ""
            },
            {
              id: "sandwich-negroni",
              name: "Sándwich Negroni",
              description: "Pan de masa madre, torta de huevo con cebollín, jamón cocido, crema de queso feta con hierbas y eneldo",
              price: 6100,
              category: "Desayuno",
              image: ""
            },
            {
              id: "sandwich-camilo",
              name: "Sándwich Camilo",
              description: "Pan, huevo frito, tocineta rebanada, miel picante, mix de verdes, tomate cherry, queso cheddar, pepino encurtido",
              price: 6100,
              category: "Desayuno",
              image: ""
            },
            {
              id: "sandwich-camilo-gluten-free",
              name: "Sándwich Camilo (Gluten Free)",
              description: "Pan Brioche gluten free",
              price: 6900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "sandwich-burrata-lomito",
              name: "Sándwich de Burrata y Lomito",
              description: "Pan de masa madre, lomito, burrata, aderezo de cebolla rostizada, mix de verdes",
              price: 8200,
              category: "Desayuno",
              image: ""
            },
            {
              id: "bruschetta-stracciatella",
              name: "Bruschetta alla Stracciatella",
              description: "Pan de masa madre, stracciatella, tomate cherry, albahaca",
              price: 4900,
              category: "Desayuno",
              image: ""
            },
            {
              id: "bruschetta-hongos",
              name: "Bruschetta de Hongos",
              description: "Pan de masa madre, ajos confitados, mix de hongos salteados, miel, balsámico, queso de cabra",
              price: 6100,
              category: "Desayuno",
              image: ""
            }
          ]
        }
      ]
    },
    {
      id: "pasteleria",
      label: "Pastelería",
      menu: [
        {
          id: "dulces",
          title: "Dulces",
          items: [
            {
              id: "tarta-queso",
              name: "Tarta de Queso",
              description: "Estilo español, con coulis de frutos rojos",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "pavlova",
              name: "Pavlova",
              description: "Merengue horneado con frutas de temporada",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "mousse-chocolate",
              name: "Mousse de Chocolate",
              description: "Mousse cremoso de chocolate",
              price: 2800,
              category: "Dulces",
              image: ""
            },
            {
              id: "eclair",
              name: "Éclair",
              description: "Chocolate o dulce de leche",
              price: 2800,
              category: "Dulces",
              image: ""
            },
            {
              id: "tarta-chocolate",
              name: "Tarta de Chocolate",
              description: "Tarta de chocolate",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "mousse-dulce-leche",
              name: "Mousse de Dulce de Leche",
              description: "Mousse cremoso de dulce de leche",
              price: 2800,
              category: "Dulces",
              image: ""
            },
            {
              id: "tartaleta-frutas",
              name: "Tartaleta de Frutas",
              description: "Tartaleta con frutas frescas",
              price: 2800,
              category: "Dulces",
              image: ""
            },
            {
              id: "pie-limon",
              name: "Pie de Limón",
              description: "Pie tradicional de limón",
              price: 2800,
              category: "Dulces",
              image: ""
            },
            {
              id: "churros-banano",
              name: "Churros de Banano",
              description: "Churros rellenos de banano",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "calzone-smores",
              name: "Calzone de S'mores",
              description: "Calzone dulce estilo s'mores",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "queque-limon",
              name: "Queque de Limón",
              description: "Queque casero de limón",
              price: 1200,
              category: "Dulces",
              image: ""
            },
            {
              id: "crumble-manzana",
              name: "Crumble de Manzana",
              description: "Crumble de manzana con topping crujiente",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "flan-coco",
              name: "Flan de Coco",
              description: "Flan cremoso de coco",
              price: 4500,
              category: "Dulces",
              image: ""
            },
            {
              id: "galletas",
              name: "Galletas",
              description: "Galletas caseras",
              price: 1200,
              category: "Dulces",
              image: ""
            },
            {
              id: "media-luna",
              name: "Media Luna",
              description: "Media luna dulce",
              price: 1100,
              category: "Dulces",
              image: ""
            }
          ]
        },
        {
          id: "salados",
          title: "Salados",
          items: [
            {
              id: "hogaza-pan-masa-madre",
              name: "Hogaza de Pan de Masa Madre",
              description: "Hogaza grande de pan de masa madre",
              price: 6000,
              category: "Salados",
              image: ""
            },
            {
              id: "croissant",
              name: "Croissant",
              description: "Croissant tradicional",
              price: 1200,
              category: "Salados",
              image: ""
            },
            {
              id: "biscuit-queso-jalapeno",
              name: "Biscuit de Queso y Jalapeño",
              description: "Biscuit casero con queso y jalapeño",
              price: 1600,
              category: "Salados",
              image: ""
            },
            {
              id: "croissant-arreglado",
              name: "Croissant Arreglado",
              description: "Croissant con relleno especial",
              price: 3650,
              category: "Salados",
              image: ""
            }
          ]
        }
      ]
    },
    {
      id: "bebidas",
      label: "Bebidas",
      menu: [
        {
          id: "cocteles-signature",
          title: "Cocteles Signature",
          items: [
            {
              id: "croissant-old-fashioned",
              name: "Croissant Old Fashioned",
              description: "Bulleit Bourbon con mantequilla de croissant, licor de banano",
              price: 6500,
              category: "Cocteles Signature",
              image: ""
            },
            {
              id: "italian-daiquiri",
              name: "Italian Daiquiri",
              description: "Ron Flor de Caña Cristalino, vermouth rosso Mancino, amaro fernet, limón",
              price: 5700,
              category: "Cocteles Signature",
              image: ""
            },
            {
              id: "strega",
              name: "Strega",
              description: "Tequila Reposado Don Julio, licor de saúco, vermouth blanco Mancino",
              price: 6500,
              category: "Cocteles Signature",
              image: ""
            },
            {
              id: "espresso-negroni",
              name: "Espresso Negroni",
              description: "Vodka Ketel One con vainilla, licor de avellanas, licor de café, espresso",
              price: 6500,
              category: "Cocteles Signature",
              image: ""
            },
            {
              id: "julia",
              name: "Julia",
              description: "Gin Tanqueray No. Ten infusionado con lavanda, sirope de miel con naranja, sirope de cereza italiana, limón, yogur griego",
              price: 6500,
              category: "Cocteles Signature",
              image: ""
            }
          ]
        },
        {
          id: "negronis",
          title: "Negronis",
          items: [
            {
              id: "pineapple-express",
              name: "Pineapple Express",
              description: "Gin Tanqueray London Dry infusionado con piña, vermouth bianco Mancino, licor de naranja, licor de coco",
              price: 6200,
              category: "Negronis",
              image: ""
            },
            {
              id: "oaxaca",
              name: "[R] Oaxaca",
              description: "Mezcal Siete Misterios, vermouth rosso Mancino con eucalipto, miel con naranja, bitters de chocolate",
              price: 6500,
              category: "Negronis",
              image: ""
            },
            {
              id: "shiitake-sesame",
              name: "Shiitake Sesame",
              description: "Gin Tanqueray London Dry con aceite de sésamo, vermouth Punt e Mes con hongo shiitake, Campari",
              price: 6500,
              category: "Negronis",
              image: ""
            }
          ]
        },
        {
          id: "cocteles-clasicos-twist",
          title: "Cocteles Clásicos con un Twist",
          items: [
            {
              id: "mojito-cristalino",
              name: "Mojito Cristalino",
              description: "Ron Flor de Caña 4 años, hierbabuena, tónica de enebro y flor de saúco, licor de hierbas, limón",
              price: 5300,
              category: "Cocteles Clásicos con un Twist",
              image: ""
            },
            {
              id: "cosmo",
              name: "Cosmo",
              description: "Aperol, gin Malfy Rosa, jugo de arándanos, limón, bitters de limón negro, top soda de toronja",
              price: 5900,
              category: "Cocteles Clásicos con un Twist",
              image: ""
            },
            {
              id: "dove-mule",
              name: "Dove Mule",
              description: "Tequila Reposado Don Julio, licor de alcachofa, limón, soda de toronja, cerveza de jengibre, bitters de habanero",
              price: 6500,
              category: "Cocteles Clásicos con un Twist",
              image: ""
            }
          ]
        },
        {
          id: "cocteles-clasicos",
          title: "Cocteles Clásicos",
          items: [
            {
              id: "margarita",
              name: "Margarita",
              description: "Tequila Don Julio Blanco, licor de naranja, sirope simple, limón",
              price: 5900,
              category: "Cocteles Clásicos",
              image: ""
            },
            {
              id: "moscow-mule",
              name: "Moscow Mule",
              description: "Vodka Ketel One, cerveza de jengibre",
              price: 4400,
              category: "Cocteles Clásicos",
              image: ""
            },
            {
              id: "paloma",
              name: "Paloma",
              description: "Tequila Don Julio Reposado, miel de agave, limón, soda de toronja",
              price: 4900,
              category: "Cocteles Clásicos",
              image: ""
            },
            {
              id: "cosmopolitan",
              name: "Cosmopolitan",
              description: "Vodka Ketel One, licor de naranja, jugo de arándanos, limón",
              price: 5500,
              category: "Cocteles Clásicos",
              image: ""
            },
            {
              id: "last-word",
              name: "Last Word",
              description: "Gin Tanqueray London Dry, licor de hierbas, licor de cereza, limón",
              price: 5900,
              category: "Cocteles Clásicos",
              image: ""
            },
            {
              id: "naked-famous",
              name: "Naked and Famous",
              description: "Mezcal Sacrvm, licor de azafrán, Aperol, limón",
              price: 5900,
              category: "Cocteles Clásicos",
              image: ""
            }
          ]
        },
        {
          id: "spritz",
          title: "Spritz",
          items: [
            {
              id: "negroni-sonic",
              name: "Negroni Sonic",
              description: "Gin Tanqueray London Dry, Campari, vermouth rosso Mancino, tónica, soda",
              price: 6100,
              category: "Spritz",
              image: ""
            },
            {
              id: "starlino-spritz",
              name: "Starlino Spritz",
              description: "Vodka Ketel One, licor Starlino Rosso, zacate de limón, fresa, limón, espumante",
              price: 6100,
              category: "Spritz",
              image: ""
            },
            {
              id: "passione",
              name: "Passione",
              description: "Mezcal Siete Misterios, maracuyá, zacate de limón, espumante",
              price: 6200,
              category: "Spritz",
              image: ""
            },
            {
              id: "violeta-spritz",
              name: "Violeta Spritz",
              description: "Licor de violeta, espumante, soda",
              price: 6100,
              category: "Spritz",
              image: ""
            }
          ]
        },
        {
          id: "cervezas",
          title: "Cervezas",
          items: [
            {
              id: "imperial",
              name: "Imperial",
              description: "Regular, Light, Ultra, Silver",
              price: 2700,
              category: "Cervezas",
              image: ""
            },
            {
              id: "pilsen",
              name: "Pilsen",
              description: "Cerveza Pilsen",
              price: 2700,
              category: "Cervezas",
              image: ""
            },
            {
              id: "bavaria",
              name: "Bavaria",
              description: "Gold, Light, Masters, Pura Malta",
              price: 3200,
              category: "Cervezas",
              image: ""
            },
            {
              id: "heineken",
              name: "Heineken",
              description: "Regular, 0.0",
              price: 3500,
              category: "Cervezas",
              image: ""
            },
            {
              id: "sol",
              name: "Sol",
              description: "Cerveza Sol",
              price: 3500,
              category: "Cervezas",
              image: ""
            },
            {
              id: "stella-artois",
              name: "Stella Artois",
              description: "Cerveza Stella Artois",
              price: 3500,
              category: "Cervezas",
              image: ""
            },
            {
              id: "guinness",
              name: "Guinness Draught",
              description: "Cerveza Guinness Draught",
              price: 3700,
              category: "Cervezas",
              image: ""
            }
          ]
        },
        {
          id: "naturales",
          title: "Naturales",
          items: [
            {
              id: "sr-verde",
              name: "Sr. Verde",
              description: "Piña, aguacate, apio, manzana, albahaca, naranja",
              price: 3100,
              category: "Naturales",
              image: ""
            },
            {
              id: "jugo-naranja",
              name: "Jugo de Naranja",
              description: "Jugo fresco de naranja",
              price: 1900,
              category: "Naturales",
              image: ""
            },
            {
              id: "jugo-pina",
              name: "Piña",
              description: "Jugo de piña",
              price: 1900,
              category: "Naturales",
              image: ""
            },
            {
              id: "jugo-sandia",
              name: "Sandía",
              description: "Jugo de sandía",
              price: 1900,
              category: "Naturales",
              image: ""
            },
            {
              id: "limonada",
              name: "Limonada",
              description: "Limonada natural",
              price: 1900,
              category: "Naturales",
              image: ""
            },
            {
              id: "limonada-hierbabuena",
              name: "Limonada con Hierbabuena",
              description: "Limonada con hierbabuena fresca",
              price: 1900,
              category: "Naturales",
              image: ""
            }
          ]
        },
        {
          id: "embotellado",
          title: "Embotellado",
          items: [
            {
              id: "gaseosas",
              name: "Gaseosas",
              description: "Pepsi, Pepsi Light, Pepsi Black, Ginger Ale, Evervess, Soda",
              price: 2100,
              category: "Embotellado",
              image: ""
            },
            {
              id: "agua-san-pellegrino",
              name: "Agua San Pellegrino / Acqua Panna",
              description: "750ml",
              price: 4200,
              category: "Embotellado",
              image: ""
            }
          ]
        },
        {
          id: "cafe-te",
          title: "Café y Té",
          items: [
            {
              id: "americano",
              name: "Americano",
              description: "Café americano",
              price: 1900,
              category: "Café y Té",
              image: ""
            },
            {
              id: "chocolate",
              name: "Chocolate",
              description: "Chocolate caliente",
              price: 2600,
              category: "Café y Té",
              image: ""
            },
            {
              id: "cappuccino",
              name: "Cappuccino",
              description: "Cappuccino tradicional",
              price: 2500,
              category: "Café y Té",
              image: ""
            },
            {
              id: "latte-saborizado",
              name: "Latte Saborizado",
              description: "Vainilla, caramelo, menta",
              price: 2900,
              category: "Café y Té",
              image: ""
            },
            {
              id: "espresso",
              name: "Espresso",
              description: "Espresso",
              price: 1900,
              category: "Café y Té",
              image: ""
            },
            {
              id: "cortado",
              name: "Cortado",
              description: "Café cortado",
              price: 1900,
              category: "Café y Té",
              image: ""
            },
            {
              id: "macchiato",
              name: "Macchiato",
              description: "Macchiato",
              price: 1900,
              category: "Café y Té",
              image: ""
            },
            {
              id: "te",
              name: "Té",
              description: "Menta, manzanilla, verde, negro, jengibre con limón, frutos rojos",
              price: 1900,
              category: "Café y Té",
              image: ""
            }
          ]
        }
      ]
    },
    {
      id: "vinos",
      label: "Vinos",
      menu: [
        {
          id: "por-copa",
          title: "Por Copa",
          items: [
            {
              id: "nieto-senetiner-malbec",
              name: "Nieto Senetiner Malbec",
              description: "Mendoza, Argentina",
              price: 5500,
              category: "Por Copa",
              image: ""
            },
            {
              id: "cousino-macul-cabernet",
              name: "Cousiño-Macul Cabernet Sauvignon",
              description: "Villa Maipo, Chile",
              price: 5500,
              category: "Por Copa",
              image: ""
            },
            {
              id: "primogenito-pinot-noir",
              name: "Primogénito Pinot Noir",
              description: "Patagonia, Argentina",
              price: 6900,
              category: "Por Copa",
              image: ""
            },
            {
              id: "valviejo-tempranillo",
              name: "Valviejo Tempranillo",
              description: "Castilla, España",
              price: 3700,
              category: "Por Copa",
              image: ""
            },
            {
              id: "luis-canas-crianza",
              name: "Luis Cañas Crianza Tempranillo",
              description: "Rioja, España",
              price: 7300,
              category: "Por Copa",
              image: ""
            },
            {
              id: "vina-sastre-roble",
              name: "Viña Sastre Roble Tempranillo",
              description: "Rioja, España",
              price: 6900,
              category: "Por Copa",
              image: ""
            },
            {
              id: "valviejo-viura",
              name: "Valviejo Viura",
              description: "Castilla, España",
              price: 3700,
              category: "Por Copa",
              image: ""
            },
            {
              id: "siegel-sauvignon-blanc",
              name: "Siegel Handpicked Reserva Sauvignon Blanc",
              description: "Valle de Curicó, Chile",
              price: 4700,
              category: "Por Copa",
              image: ""
            },
            {
              id: "jose-pariente-verdejo",
              name: "José Pariente Verdejo",
              description: "Rueda, España",
              price: 6500,
              category: "Por Copa",
              image: ""
            }
          ]
        },
        {
          id: "malbec",
          title: "Malbec",
          items: [
            {
              id: "alta-vista-vive",
              name: "Alta Vista Vive",
              description: "Mendoza, Argentina",
              price: 19900,
              category: "Malbec",
              image: ""
            },
            {
              id: "alta-vista-estate-premium",
              name: "Alta Vista Estate Premium",
              description: "Mendoza, Argentina",
              price: 27900,
              category: "Malbec",
              image: ""
            },
            {
              id: "nieto-senetiner-botella",
              name: "Nieto Senetiner",
              description: "Mendoza, Argentina",
              price: 21900,
              category: "Malbec",
              image: ""
            },
            {
              id: "primogenito-patagonia",
              name: "Primogénito",
              description: "Patagonia, Argentina",
              price: 32900,
              category: "Malbec",
              image: ""
            },
            {
              id: "don-nicanor-barrel-select",
              name: "Don Nicanor Barrel Select",
              description: "Mendoza, Argentina",
              price: 42900,
              category: "Malbec",
              image: ""
            }
          ]
        },
        {
          id: "cabernet-sauvignon",
          title: "Cabernet Sauvignon",
          items: [
            {
              id: "siegel-handpicked-reserva-cabernet",
              name: "Siegel Handpicked Reserva",
              description: "Valle de Colchagua, Chile",
              price: 18900,
              category: "Cabernet Sauvignon",
              image: ""
            },
            {
              id: "alta-vista-estate-premium-cabernet",
              name: "Alta Vista Estate Premium",
              description: "Mendoza, Argentina",
              price: 26900,
              category: "Cabernet Sauvignon",
              image: ""
            },
            {
              id: "carmelo-patti",
              name: "Carmelo Patti",
              description: "Luján de Cuyo, Argentina",
              price: 45900,
              category: "Cabernet Sauvignon",
              image: ""
            },
            {
              id: "corners-sonoma",
              name: "3 Corners Sonoma County",
              description: "Estados Unidos",
              price: 47900,
              category: "Cabernet Sauvignon",
              image: ""
            }
          ]
        },
        {
          id: "tempranillo-rioja",
          title: "Tempranillo Rioja, España",
          items: [
            {
              id: "lomas-marques",
              name: "Lomas del Marqués",
              description: "Rioja",
              price: 13900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "lomas-marques-crianza",
              name: "Lomas del Marqués Crianza",
              description: "Rioja Crianza",
              price: 19900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "luis-canas-crianza-botella",
              name: "Luis Cañas Crianza",
              description: "Rioja Crianza",
              price: 29900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "amaren-seleccion-vinedos",
              name: "Amaren Selección de Viñedos",
              description: "Rioja",
              price: 33900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "rolland-galarreta",
              name: "Rolland & Galarreta",
              description: "Rioja",
              price: 36900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "baigorri-crianza",
              name: "Baigorri Crianza",
              description: "Rioja Crianza",
              price: 36900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "angeles-amaren",
              name: "Ángeles de Amaren",
              description: "Rioja Alavesa",
              price: 45900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "senorio-cuzcurrita",
              name: "Señorío de Cuzcurrita",
              description: "Rioja Alta",
              price: 45900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "baigorri-reserva",
              name: "Baigorri Reserva",
              description: "Rioja Reserva",
              price: 55900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "luis-canas-reserva-seleccion",
              name: "Luis Cañas Reserva Selección de Familia",
              description: "Villabuena de Álava",
              price: 55900,
              category: "Tempranillo Rioja, España",
              image: ""
            },
            {
              id: "amaren-reserva-60",
              name: "Amaren Reserva 60",
              description: "Rioja Alavesa",
              price: 89900,
              category: "Tempranillo Rioja, España",
              image: ""
            }
          ]
        },
        {
          id: "tempranillo-ribera-duero",
          title: "Tempranillo Ribera del Duero, España",
          items: [
            {
              id: "vina-vilano",
              name: "Viña Vilano",
              description: "Castilla y León, España",
              price: 18900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "vina-sastre-roble-ribera",
              name: "Viña Sastre Roble",
              description: "Ribera del Duero",
              price: 27900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "vina-sastre-crianza-ribera",
              name: "Viña Sastre Crianza",
              description: "Ribera del Duero Crianza",
              price: 45900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "vilano-reserva",
              name: "Vilano Reserva",
              description: "Ribera del Duero Reserva",
              price: 45900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "dominio-basconcillos-vina-magna",
              name: "Dominio Basconcillos Viña Magna",
              description: "Ribera del Duero",
              price: 73900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "dominio-basconcillos-vina-magna-reserva",
              name: "Dominio Basconcillos Viña Magna Reserva",
              description: "Ribera del Duero Reserva",
              price: 143900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            },
            {
              id: "vina-sastre-regina-vides",
              name: "Viña Sastre Regina Vides",
              description: "Ribera del Duero",
              price: 168900,
              category: "Tempranillo Ribera del Duero, España",
              image: ""
            }
          ]
        },
        {
          id: "blends",
          title: "Blends",
          items: [
            {
              id: "nieto-senetiner-blend",
              name: "Nieto Senetiner",
              description: "Malbec - Cabernet Franc - Petit Verdot, Mendoza, Argentina",
              price: 21900,
              category: "Blends",
              image: ""
            },
            {
              id: "don-nicanor-blend",
              name: "Don Nicanor",
              description: "Merlot - Cabernet Sauvignon - Malbec, Mendoza, Argentina",
              price: 30900,
              category: "Blends",
              image: ""
            },
            {
              id: "atemporal-alta-vista",
              name: "Atemporal Alta Vista",
              description: "Malbec - Cabernet Sauvignon - Petit Verdot, Mendoza, Argentina",
              price: 35900,
              category: "Blends",
              image: ""
            },
            {
              id: "milla-cala",
              name: "Milla Cala",
              description: "Merlot - Cabernet Sauvignon, Valle Cachapoal, Chile",
              price: 73900,
              category: "Blends",
              image: ""
            },
            {
              id: "la-piu-belle",
              name: "La Piu Belle",
              description: "Cabernet Franc - Carmenere - Syrah - Cabernet Sauvignon, Valle Cachapoal, Chile",
              price: 135900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-prieto-pariente-vinedos",
              name: "Bodega Prieto Pariente - Viñedos de La Provincia",
              description: "Vinos de autor de la tierra de Castilla y La Mancha, Castilla y León, España",
              price: 34900,
              category: "Blends",
              image: ""
            },
            {
              id: "el-origen",
              name: "El Origen",
              description: "Castilla y León, España",
              price: 57900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-petra-sireno",
              name: "Bodega Petra - Sireno",
              description: "Syrah - Cabernet Sauvignon - Sangiovese, Toscana, Italia",
              price: 29900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-petra-hebo",
              name: "Bodega Petra - Hebo",
              description: "Merlot - Cabernet Sauvignon - Cabernet Franc - Sangiovese, Toscana, Italia",
              price: 79900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-petra-quercegobbe",
              name: "Bodega Petra - Quercegobbe",
              description: "Merlot, Toscana, Italia",
              price: 38900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-petra-potenti",
              name: "Bodega Petra - Potenti",
              description: "Cabernet Sauvignon, Toscana, Italia",
              price: 79900,
              category: "Blends",
              image: ""
            },
            {
              id: "bodega-petra-petra",
              name: "Bodega Petra - Petra",
              description: "Cabernet Sauvignon - Merlot - Cabernet Franc, Toscana, Italia",
              price: 144900,
              category: "Blends",
              image: ""
            }
          ]
        },
        {
          id: "pinot-noir",
          title: "Pinot Noir",
          items: [
            {
              id: "primogenito-patagonia-pinot",
              name: "Primogénito",
              description: "Patagonia, Argentina",
              price: 31900,
              category: "Pinot Noir",
              image: ""
            },
            {
              id: "boen-california",
              name: "Böen",
              description: "California, Estados Unidos",
              price: 36900,
              category: "Pinot Noir",
              image: ""
            },
            {
              id: "alma-fria-plural",
              name: "Alma Fria Plural",
              description: "Sonoma Coast, Estados Unidos",
              price: 45700,
              category: "Pinot Noir",
              image: ""
            },
            {
              id: "joseph-faiveley",
              name: "Joseph Faiveley",
              description: "Borgoña, Francia",
              price: 49900,
              category: "Pinot Noir",
              image: ""
            }
          ]
        },
        {
          id: "blancos",
          title: "Blancos",
          items: [
            {
              id: "cousino-macul-don-luis",
              name: "Cousiño-Macul Don Luis",
              description: "Chardonnay, Valle Central, Chile",
              price: 18900,
              category: "Blancos",
              image: ""
            },
            {
              id: "siegel-handpicked-reserva-sauvignon",
              name: "Siegel Handpicked Reserva Sauvignon Blanc",
              description: "Valle de Curicó, Chile",
              price: 18900,
              category: "Blancos",
              image: ""
            },
            {
              id: "jose-pariente-verdejo-botella",
              name: "José Pariente Verdejo",
              description: "Rueda, España",
              price: 27900,
              category: "Blancos",
              image: ""
            },
            {
              id: "jose-pariente-sauvignon-blanc",
              name: "José Pariente Sauvignon Blanc",
              description: "Rueda, España",
              price: 27900,
              category: "Blancos",
              image: ""
            },
            {
              id: "corners-chenin-blanc",
              name: "3 Corners Chenin Blanc",
              description: "Negev, Israel",
              price: 29900,
              category: "Blancos",
              image: ""
            }
          ]
        },
        {
          id: "espumantes",
          title: "Espumantes",
          items: [
            {
              id: "villa-conchi-cava",
              name: "Villa Conchi Cava",
              description: "Comtats de Barcelona, España",
              price: 19900,
              category: "Espumantes",
              image: ""
            },
            {
              id: "villa-marcello-prosecco",
              name: "Villa Marcello Prosecco",
              description: "Treviso, Italia",
              price: 26900,
              category: "Espumantes",
              image: ""
            }
          ]
        },
        {
          id: "champagne",
          title: "Champagne",
          items: [
            {
              id: "veuve-clicquot",
              name: "Veuve Clicquot Brut",
              description: "Champagne, Francia",
              price: 85700,
              category: "Champagne",
              image: ""
            }
          ]
        }
      ]
    },
    {
      id: "ninos",
      label: "Niños",
      menu: [
        {
          id: "platos-ninos",
          title: "Platos",
          items: [
            {
              id: "pizza-peque",
              name: "Pizza la Peque",
              description: "Jamón y hongos o margarita",
              price: 4500,
              category: "Platos",
              image: ""
            },
            {
              id: "spaghetti-ninos",
              name: "Spaghetti",
              description: "Al burro o bolognese",
              price: 4500,
              category: "Platos",
              image: ""
            },
            {
              id: "dedos-pollo",
              name: "Dedos de Pollo",
              description: "Con papas",
              price: 4500,
              category: "Platos",
              image: ""
            }
          ]
        }
      ]
    }
  ]
};

export default negroni;
