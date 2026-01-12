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
};

export const RESTAURANT_ID_MAPPING: Record<string, string> = {
  'gus': '1d446dfa-e91a-4df5-b1d8-7dae543a2292',        // Restaurante El Patio
  'sikwa': '362d4559-0c60-44ea-a799-647b5f5b9a8a',      // Sikwa Restaurant
  'filippo': '64efa06f-429d-4d91-9185-6f85fc42dfa2',    // Filippo Ristorante
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