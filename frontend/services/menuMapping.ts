/**
 * Mapping from frontend menu item IDs to database UUIDs
 * Generated from populate_menu.py output
 */

export const MENU_ID_MAPPING: Record<string, string> = {
  // Gus restaurant items
  '1': '44ae7542-935a-46ab-8070-d5d17e72c08b',           // Bruschetta Italiana
  '2': 'a649e509-e892-46c9-ad43-8f18f8e584d3',           // Carpaccio de Res
  '3': '63c056e0-0916-48db-baa9-afdd263730b4',           // Hamburguesa Gus
  '4': '5aa4a02b-ec81-4167-85bd-37e189da634e',           // Salmón a la Parrilla
  '5': '8d585fda-b38f-469b-bb1a-ec47b58b6e92',           // Pasta Carbonara
  'cheesecake': 'd31cf39f-b927-4c88-828c-fa9d063797c9', // Cheesecake NY
  'cookie': '08ca9ebb-dcf0-4707-a597-7468d11db616',      // Choco Cookie Skillet
  'brownie': 'b8d62b50-d1ed-4cba-8610-681309da0565',    // Brownie Fudge

  // Sikwa restaurant items
  'cujiniquil': 'c7f85efc-c8c1-4c99-9f1b-ef9aaec75f5b',  // Cujiniquil
  'pezgallopinto': '21f5de81-3e21-416b-893a-f3f5cf630b70', // Pez sobre Gallo Pinto
  'cacao': '104fc44d-327f-4424-be1f-2f57087ecf32',       // Bebida de Cacao
  'frutabosque': '3fc4d7dc-6c99-485b-a870-ba9806669f44', // Frutas del Bosque

  // Olive Garden restaurant items (matching frontend IDs with hyphens)
  'fried-mozzarella': 'ead340da-0c59-4f4a-8559-70f3a17961c9',
  'spinach-artichoke-dip': 'e6f92e30-15e1-432b-bb07-0a32ce2deeff',
  'dipping-sauces-breadsticks': 'f5762281-e472-42c2-824a-bdca9e6c32eb',
  'shrimp-fritto-misto': '6efe22f2-136f-491a-9ad6-3daf43476d64',
  'fried-lasagna': '9b2434d9-d780-4c64-92ce-5615a66a51f2',
  'bruschetta': 'a91e3991-6745-4256-96aa-431b4bd68b0d',
  'meatballs-parmigiana': 'b023d073-7721-4e47-b95a-e14fb3d6183e',
  'chicken-gnocchi': '0cacdd54-2cdc-48a4-90aa-2cc53b4e5dd1',
  'minestrone': 'c4b80f4b-e3b7-4a2c-af63-3514c0a6f43b',
  'zuppa-toscana': '2c52bddf-5e8d-43aa-9384-4cd198519be6',
  'house-salad': '29fb70bf-2eec-4689-91e9-b90534813404',
  'never-ending-soup-salad-breadsticks': 'f7234316-5349-4282-aa27-f99d81abe9fe',
  'herb-grilled-salmon': '3ccb20b6-da77-4ae7-ad4a-e0c0ad52858e',
  'salmon-piccata': 'e5ce137b-b2de-4fa9-b7de-ecbc05d18444',
  'chicken-shrimp-carbonara': 'a9a4dff1-8e4c-4bf2-a429-08a19ddefd1c',
  'chicken-piccata': 'f06a0586-2ba8-493b-aa2b-d9a55112a17c',
  'grilled-chicken-margherita': '39378f09-84dc-4386-affe-d9f55693b2f5',
  'chicken-scampi': 'e4135575-87ee-4b5a-8ae7-09f856bb78bf',
  'spaghetti-meatballs': '3d58b449-39bb-45b1-9a78-0544e488502f',
  'five-cheese-baked-ziti': '363c3459-654e-400d-b30b-c80814bbb795',
  'classic-lasagna': '926a0db8-2901-4932-b47c-340f04803640',
  'chicken-parmigiana': 'd0c35772-5b1b-4934-b6c9-b270b53e1c07',
  'tour-of-italy': 'a9e0fa65-8806-45d3-bb53-4694ac8b544d',
  'shrimp-alfredo': 'd20f2ffd-d099-42b2-b3c7-ae8805a5dbaa',
  'chicken-alfredo': '0f3c24c9-9770-4de0-abf9-2a7cbc129efd',
  'fettuccine-alfredo': '3cf189d9-5b84-4c3f-a754-3080a7a211a6',
  'steak-gorgonzola-alfredo': 'a5e04b65-c32f-44ff-af7d-f02ce77563b3',
  'steak-alfredo': '4f970c0c-a03a-4e1c-bcb5-5fa40629c417',
  'chicken-alfredo-pronto': 'b9971c88-8554-4d9f-8cea-92080254acbf',
  'lasagna-classico-pronto': 'b2d65d59-1cbf-47ba-ae62-fa022fb85869',
  'spaghetti-meatballs-pronto': 'ed1a224e-93c8-42b7-8069-cc5e6ced91ec',
  'tortelloni-al-forno-pronto': 'a7e3d374-601a-41f7-96d9-dd6196df116d',
  'fettuccine-alfredo-pronto': '42743e8b-0218-494d-a1ae-2a21be42a126',
  'margherita-pizza-pronto': '43e3afbb-4e5e-4b36-9e34-6df1899d70fe',
  'spaghetti-marinara-meat-pronto': 'c9508e27-ae50-486f-9cfb-10d7e8add5df',
  'chocolate-lasagna': '62fcd580-23eb-4993-b7eb-ac60900dca4a',
  'ice-cream-cup': '0cc2832c-e6c8-45e5-ba41-f837cdf971c8',
  'strawberry-cream-cake': '956d7b7b-8643-40a1-b87e-0e9595e07a77',
  'black-tie-mousse-cake': 'adc2814d-b971-456f-9db7-dd31a174c3f9',
  'sicilian-cheesecake': '94021be6-fe41-4d5c-947e-a2c364b0f831',
  'tiramisu': 'c5711f2f-5330-40d8-9eef-5c530cb266e9',
  'create-your-own-pasta-kids': 'b50201fc-7d85-4a2b-bc55-ab6c9289789f',
  'ice-cream-cup-kids': '88db9090-381f-4986-8410-72f01da0c921',
  'smoothie': 'b09e7dbf-798d-40f4-aacd-425fa1db883e',
  'lasagna-kids': '38263655-16ad-43ec-a7f5-9fee50affd80',
  'chicken-fingers': '9758221a-789b-43e7-9d22-c284562f935b',
  'garden-salad': 'b423e5cb-e95c-436f-88ec-f1b47860e654',
  'macaroni-cheese': '730ab391-6f9c-42db-a0e3-8ee97f04b1ce',
  'pizza-kids': '025e25de-e4c2-4015-8f88-92e79b45eb10',
  'gallon-iced-tea': 'ead684d5-e6fe-45f6-b287-6f2a8a2e1da1',
  'alcoholic-beverages': '79112ada-548a-4c88-a839-55d237b80467',
  'non-alcoholic-beverages': '4468b4e4-6687-4ab1-b73d-a4b9bbc66ed7',
  'soft-drinks-refills': '5bc4468e-dd88-45e9-95b5-bcc508def39e',
  'beers': '780c64ed-09c3-4ee3-b5e2-7517ea81b7d2',
  'hot-drinks': '05aa467f-e220-4b21-9b62-c5ca83e025d3',
  'bottled-water': 'c3cac735-c59b-42cf-a606-eef976e0c7ad',
};

export const RESTAURANT_ID_MAPPING: Record<string, string> = {
  'gus': '1d446dfa-e91a-4df5-b1d8-7dae543a2292',        // Restaurante El Patio
  'sikwa': '362d4559-0c60-44ea-a799-647b5f5b9a8a',      // Sikwa Restaurant
  'filippo': '64efa06f-429d-4d91-9185-6f85fc42dfa2',    // Filippo Ristorante
  'olivegarden': 'cfbee0db-ed55-4db5-a621-d8634583fae9',    // Olive Garden
};

/**
 * Convert frontend menu item ID to database UUID
 */
export function getMenuItemUUID(frontendId: string): string {
  const uuid = MENU_ID_MAPPING[frontendId];
  if (!uuid) {
    console.warn(`No UUID mapping found for menu item ID: ${frontendId}`);
    return frontendId; // Fallback to original ID
  }
  return uuid;
}

/**
 * Convert restaurant slug to database UUID
 */
export function getRestaurantUUID(slug: string): string {
  const uuid = RESTAURANT_ID_MAPPING[slug];
  if (!uuid) {
    console.warn(`No UUID mapping found for restaurant slug: ${slug}`);
    return slug; // Fallback to slug
  }
  return uuid;
}