import { RestaurantData } from '../data';

const tsunami: RestaurantData = {
  name: "Tsunami Sushi",
  slug: "tsunamisushi",
  logo: "/images/tsunami/tsunamilogo.png",
  colors: {
    primary: "#E21E26",
    "primary-dark": "#003580",
    background: "#FFFFFF"
  },
  recommendations: [
    {
      id: "crunch-roll",
      name: "Crunch Roll",
      description: "Hecho con kanikama y camarón tempura, cubierto con hojuelas de tempura y salsa de anguila. Todos los rollos son servidos con semillas de ajonjolí, aguacate y pepino.",
      price: 11570,
      category: "SUSHI ROLLS",
      image: "https://github.com/user-attachments/assets/28afe178-3390-49f1-9056-6ad3f71d54a7"
    },
    {
      id: "tsunami-signature-roll",
      name: "Tsunami Signature Roll",
      description: "Hecho con camarón tempura, kanikama, cubierto de atún y aguacate, servido con salsa de anguila.",
      price: 11050,
      category: "SUSHI ROLLS",
      image: "https://github.com/user-attachments/assets/99197edc-4571-410f-9418-ef05bce673db"
    },
    {
      id: "arroz-frito-con-lomito",
      name: "Arroz Frito con Lomito",
      description: "Arroz frito salteado con vegetales mixtos y trozos de lomito de res.",
      price: 13600,
      category: "Entradas",
      image: "https://github.com/user-attachments/assets/f3157e99-0945-4bd3-909e-d0faccfc78fd"
    }
  ],
  cartRecommendations: [
    {
      id: "crispy-gyosa",
      name: "Crispy Gyosa",
      description: "Con atún picante o pollo.",
      price: 8125,
      category: "Entradas",
      image: "/images/tsunami/gyoza.png"
    },
    {
      id: "edamame-basico",
      name: "Edamame Básico",
      description: "Orden de edamame en vaina, clásico y ligero para compartir.",
      price: 4485,
      category: "Entradas",
      image: "https://private-user-images.githubusercontent.com/173657784/536296833-b9eeb277-4195-4cf4-bc6a-58669756b54c.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njg0OTE5MzUsIm5iZiI6MTc2ODQ5MTYzNSwicGF0aCI6Ii8xNzM2NTc3ODQvNTM2Mjk2ODMzLWI5ZWViMjc3LTQxOTUtNGNmNC1iYzZhLTU4NjY5NzU2YjU0Yy5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTE1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDExNVQxNTQwMzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01YWQ4OTZhZGNiOTIyNTY0ZDM3ODU3YWIwN2ZjM2MzNDJiOGE0YTY5YTc4OTAzZmQ4ZDE0YjlhMDM4NmJhOGZmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.y790O7kc7UdxHJOQ2CNDs-hGJCdOpho177pqGhoiuGE"
    },
    {
      id: "arroz-frito-con-lomito",
      name: "Arroz Frito con Lomito",
      description: "Arroz frito salteado con vegetales mixtos y trozos de lomito de res.",
      price: 13600,
      category: "Entradas",
      image: "https://github.com/user-attachments/assets/f3157e99-0945-4bd3-909e-d0faccfc78fd"
    }
  ],
  menu: [
    {
      id: "entradas",
      title: "Entradas",
      items: [
        {
      id: "arroz-frito-con-lomito",
      name: "Arroz Frito con Lomito",
      description: "Arroz frito salteado con vegetales mixtos y trozos de lomito de res.",
          price: 13600,
          image: "https://github.com/user-attachments/assets/f3157e99-0945-4bd3-909e-d0faccfc78fd",
          category: "Entradas"
        },
        {
          id: "crispy-gyosa",
          name: "Crispy Gyosa",
          description: "Con atún picante o pollo.",
          price: 8125,
          category: "Entradas"
        },
        {
          id: "rollos-primavera-crispy",
          name: "Rollos Primavera Crispy",
          description: "Con camarón o pollo.",
          price: 8125,
          category: "Entradas"
        },
        {
          id: "edamame-basico",
          name: "Edamame Básico",
          description: "Orden de edamame en vaina, clásico y ligero para compartir.",
          price: 4485,
          image: "https://private-user-images.githubusercontent.com/173657784/536296833-b9eeb277-4195-4cf4-bc6a-58669756b54c.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njg0OTE5MzUsIm5iZiI6MTc2ODQ5MTYzNSwicGF0aCI6Ii8xNzM2NTc3ODQvNTM2Mjk2ODMzLWI5ZWViMjc3LTQxOTUtNGNmNC1iYzZhLTU4NjY5NzU2YjU0Yy5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTE1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDExNVQxNTQwMzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01YWQ4OTZhZGNiOTIyNTY0ZDM3ODU3YWIwN2ZjM2MzNDJiOGE0YTY5YTc4OTAzZmQ4ZDE0YjlhMDM4NmJhOGZmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.y790O7kc7UdxHJOQ2CNDs-hGJCdOpho177pqGhoiuGE",
          category: "Entradas"
        },
        {
      id: "edamame-spicy-with-garlic",
      name: "Edamame Spicy with Garlic",
          description: "Orden de edamames con picante",
          price: 5135,
          image: "/images/tsunami/Spicy-edamame-47614-1.jpg.webp",
          category: "Entradas"
        },
        {
      id: "tempura-vegetales-con-camaron",
      name: "Tempura Vegetales con Camarón",
          description: "Vegetales tempura con camarón",
          price: 8944,
          category: "Entradas"
        },
        {
      id: "arroz-frito-con-pollo",
      name: "Arroz Frito con Pollo",
          description: "Arroz frito con pollo.",
          price: 9750,
          category: "Entradas"
        },
        {
          id: "tempura-vegetales",
          name: "Tempura Vegetales",
          description: "Elaborado con vegetales mixtos rebozados al estilo tempura, crujientes.",
          price: 5850,
          category: "Entradas"
        },
        {
          id: "arroz-frito",
          name: "Arroz Frito",
          description: "Arroz frito de la casa.",
          price: 4744,
          category: "Entradas"
        },
        {
          id: "poke-surf-tower",
          name: "Poke Surf Tower",
          description: "Pescado poke, aguacate y pepino, apilados con won ton chips.",
          price: 11050,
          category: "Entradas"
        },
        {
      id: "arroz-frito-mixto",
      name: "Arroz Frito Mixto",
          description: "Arroz frito mixto con vegetales y proteínas variadas.",
          price: 12870,
          category: "Entradas"
        },
        {
          id: "tuna-tatake",
          name: "Tuna Tatake",
          description: "Sellado con semillas de ajonjoli, cubierto en una salsa de ponzu dulce con ajo.",
          price: 9360,
          category: "Entradas"
        },
        {
      id: "arroz-frito-con-camaron",
      name: "Arroz Frito con Camarón",
          description: "Porción de arroz frito con camarón, ideal como entrada.",
          price: 11050,
          category: "Entradas"
        },
        {
      id: "tempura-vegetales-con-mariscos",
      name: "Tempura Vegetales con Mariscos",
          description: "Vegetales tempura con mariscos agregados",
          price: 8970,
          category: "Entradas"
        }
      ]
    },
    {
      id: "sushi-rolls",
      title: "SUSHI ROLLS",
      items: [
        {
          id: "crunch-roll",
          name: "Crunch Roll",
          description: "Hecho con kanikama y camarón tempura, cubierto con hojuelas de tempura y salsa de anguila. Todos los rollos son servidos con semillas de ajonjolí, aguacate y pepino.",
          price: 11570,
          image: "https://github.com/user-attachments/assets/28afe178-3390-49f1-9056-6ad3f71d54a7",
          category: "SUSHI ROLLS"
        },
        {
          id: "sunburn-roll",
          name: "Sunburn Roll",
          description: "California roll cubierto con hojuelas tempura, camarón tempura al horno, servido con salsa de anguila, cebollino y mayonesa picante.",
          price: 11570,
          image: "https://github.com/user-attachments/assets/6cb863f1-acac-4786-a582-51611488295a",
          category: "SUSHI ROLLS"
        },
        {
          id: "sasha-campbell-roll",
          name: "Sasha Campbell Roll",
          description: "Hecho con atún picante y camarón tempura, cubierto con tempura, servido con salsa de anguila y mayonesa picante.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/27003ea4-d2f4-4d14-8cd2-c4977d5a345f",
          category: "SUSHI ROLLS"
        },
        {
          id: "tempura-roll",
          name: "Tempura Roll",
          description: "Elaborado con atún cajún, queso crema y masago, cubierto en tempura, servido con salsa de anguila.",
          price: 10270,
          image: "https://github.com/user-attachments/assets/8b80fa12-22e2-45a9-8a8d-3746e2996064",
          category: "SUSHI ROLLS"
        },
        {
          id: "rainbow-roll",
          name: "Rainbow Roll",
          description: "California roll cubierto con atún, salmón y pescado blanco.",
          price: 10394,
          image: "https://github.com/user-attachments/assets/8671df36-e160-4a44-b054-d247e2559cf0",
          category: "SUSHI ROLLS"
        },
        {
          id: "tsunami-signature-roll",
          name: "Tsunami Signature Roll",
          description: "Hecho con camarón tempura, kanikama, cubierto de atún y aguacate, servido con salsa de anguila.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/99197edc-4571-410f-9418-ef05bce673db",
          category: "SUSHI ROLLS"
        },
        {
          id: "veggie-tempura-avocado-roll",
          name: "Veggie Tempura & avocado Roll",
          description: "Elaborado con papel de arroz y crujientes vegetales tempura, cubiertos con aguacate y salsa de anguila.",
          price: 7690,
          image: "https://github.com/user-attachments/assets/ff09304f-d39e-4fa7-bc6e-568831ba4164",
          category: "SUSHI ROLLS"
        },
        {
          id: "fiesta-pack",
          name: "Fiesta Pack",
          description: "40 piezas de Sushi entre (California-Crunch-Bruce Lee-Philly)",
          price: 20252,
          category: "SUSHI ROLLS"
        },
        {
          id: "bobby-special-roll",
          name: "Bobby Special Roll",
          description: "California roll cubierto con atún al horno, ajo, cebollino, cubierto con aceite de ajonjolí y salsa de anguila.",
          price: 10270,
          image: "https://github.com/user-attachments/assets/96deac2d-5b55-4d3e-bc6e-1a64273787cc",
          category: "SUSHI ROLLS"
        },
        {
          id: "spicy-lobster-roll",
          name: "Spicy Lobster Roll",
          description: "Hecho con langosta, cubierto con tempura, servido with salsa de anguila and mayonesa picante.",
          price: 12870,
          image: "https://github.com/user-attachments/assets/9a658252-4af3-4985-a4bb-2c82638d539f",
          category: "SUSHI ROLLS"
        },
        {
          id: "godzilla-roll",
          name: "Godzilla Roll",
          description: "Elaborado con kanikama, cubierto con tempura, servido con salsa ponzu.",
          price: 8970,
          image: "https://github.com/user-attachments/assets/44e227ca-cb01-4c23-a1b2-0823ee71f2dc",
          category: "SUSHI ROLLS"
        },
        {
          id: "veggie-tico-roll",
          name: "Veggie Tico Roll",
          description: "Hecho con vegetales mixtos al vapor, cubierto con plátano y aguacate",
          price: 7690,
          image: "https://github.com/user-attachments/assets/f12671e9-bc00-497b-8c4a-74027c6418a1",
          category: "SUSHI ROLLS"
        },
        {
          id: "mau-roll",
          name: "Mau! Roll",
          description: "Preparado con salmón, piña, cubierto con hojuelas de tempura, servido con \"sweet chili\".",
          price: 11050,
          image: "https://github.com/user-attachments/assets/d043cc27-59e6-4b16-8a40-79873997bf0a",
          category: "SUSHI ROLLS"
        },
        {
          id: "lonny-roll",
          name: "Lonny Roll",
          description: "Hecho con camarón tempura y queso crema, cubierto con kanikama picante, cebollino, aguacate y salsa de anguila.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/9a5fc5f3-4e68-4ff5-928b-cb33cb21e401",
          category: "SUSHI ROLLS"
        },
        {
          id: "pollo-loco-roll",
          name: "Pollo Loco Roll",
          description: "Elaborado con papel de arroz, pollo y piña salteada.",
          price: 9750,
          image: "https://github.com/user-attachments/assets/d8d5c40c-51b8-4fe6-bc9c-165251278d51",
          category: "SUSHI ROLLS"
        },
        {
          id: "hilo-boy-roll",
          name: "Hilo Boy Roll",
          description: "Hecho con atún cajún, cubierto de salmón, aguacate y salsa de anguila.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/b24c067d-51d8-4179-a54c-848d6d20faf7",
          category: "SUSHI ROLLS"
        },
        {
          id: "raw-veggie-roll",
          name: "Raw Veggie Roll",
          description: "Hecho con hoja de pepino y vegetales mixtos, cubierto con aguacate y salsa de anguila",
          price: 7150,
          image: "https://github.com/user-attachments/assets/c9d5a014-d0b2-477f-a7e4-2a9391206c03",
          category: "SUSHI ROLLS"
        },
        {
          id: "mcgwire-roll",
          name: "McGwire Roll",
          description: "Preparado con atún picante, cubierto de tempura, servido con salsa ponzu, ajo y cebollino.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/a68f4225-5188-44c8-bd78-f4140d4a108e",
          category: "SUSHI ROLLS"
        },
        {
          id: "pura-vida-roll",
          name: "Pura Vida Roll",
          description: "Hecho con papel de arroz, mango, camarón tempura y kanikama, cubierto con mango y atún picante, servido con aderezos de cítricos, salsa de anguila y salsa de coco.",
          price: 11050,
          image: "https://github.com/user-attachments/assets/13348bab-3cf1-4f95-8f8a-fe9cedfb4a3e",
          category: "SUSHI ROLLS"
        },
        {
          id: "california-roll",
          name: "California Roll",
          description: "Hecho con kanikama mayonesa y cubierto con masago",
          price: 8450,
          category: "SUSHI ROLLS"
        },
        {
          id: "spicy-tuna-roll",
          name: "Spicy Tuna Roll",
          description: "Elaborado con atún sriracha, ajo, mayonesa y aceite de ajonjolí",
          price: 9425,
          category: "SUSHI ROLLS"
        },
        {
          id: "bruce-lee-roll",
          name: "Bruce Lee Roll",
          description: "California roll cubierto con atún y aguacate servido con salsa de anguila",
          price: 9750,
          category: "SUSHI ROLLS"
        },
        {
          id: "crab-cali-roll",
          name: "Crab Cali Roll",
          description: "California roll cubierto con kanikama, sriracha y aguacate.",
          price: 9750,
          category: "SUSHI ROLLS"
        },
        {
          id: "salmon-roll",
          name: "Salmon Roll",
          description: "California roll hecho con salmón. Todos los rollos son servidos con semillas de ajonjolí, aguacate y pepino.",
          price: 9010,
          category: "SUSHI ROLLS"
        },
        {
          id: "x-roll",
          name: "X-Roll",
          description: "Elaborado con atún cajún y queso crema, cubierto con aguacate y salsa de anguila.",
          price: 10394,
          category: "SUSHI ROLLS"
        },
        {
          id: "tico-roll",
          name: "Tico Roll",
          description: "Elaborado con kanikama y queso crema, cubierto con plátano y aguacate, servido con salsa de anguila.",
          price: 9750,
          category: "SUSHI ROLLS"
        },
        {
          id: "spicy-shrimp-roll",
          name: "Spicy Shrimp Roll",
          description: "Hecho con camarón tempura, cubierto con salsa de anguila and mayonesa picante.",
          price: 9010,
          category: "SUSHI ROLLS"
        }
      ]
    },
    {
      id: "sushi-rolls-temporada",
      title: "Sushi Rolls Temporada",
      items: [
        {
          id: "spicy-tuna-deluxe",
          name: "Spicy Tuna Deluxe",
          description: "Un Spicy Tuna con cobertura de maduro y bañado con salsa de anguila",
          price: 4800,
          image: "https://github.com/user-attachments/assets/1879b2be-0d9a-4cdd-af24-cf30c9c70a79",
          category: "Sushi Rolls Temporada"
        },
        {
          id: "surfer-roll",
          name: "Surfer Roll",
          description: "Un spicy de camaron con la cobertura de piel de salmon crijiente y bañado con salsa de anguila",
          price: 4800,
          image: "https://github.com/user-attachments/assets/f38b877c-226c-4254-b812-1d74522b10cb",
          category: "Sushi Rolls Temporada"
        },
        {
          id: "pacific-roll",
          name: "Pacific Roll",
          description: "Un philip con cobertura de hojas de hierba buena y mango bañado con una salsa de mango",
          price: 4800,
          image: "https://github.com/user-attachments/assets/eeb5fd2e-a414-4973-9bad-13681d190c58",
          category: "Sushi Rolls Temporada"
        },
        {
          id: "heredia-roll",
          name: "Heredia Roll",
          description: "Un salmon roll con piña y cebollino cobertura de ajonjoli y bañado con salsa anguila",
          price: 4800,
          image: "https://github.com/user-attachments/assets/a1f98f17-519a-4886-b3e5-78d838da669d",
          category: "Sushi Rolls Temporada"
        },
        {
          id: "madona-roll",
          name: "Madona Roll",
          description: "California con spicy mayo, cubierto de aguacate y cebollino bañado con salsa de anguila",
          price: 4800,
          category: "Sushi Rolls Temporada"
        }
      ]
    }
  ]
};

export default tsunami;
