import { Category, MenuItem } from './types';
export interface RestaurantData {
  name: string;
  slug?: string; // Optional slug for restaurant identification
  logo: string | null;
  colors: Record<string, string>;
  recommendations: MenuItem[];
  menu: Category[];
}

// Restaurant data is now loaded from the /restaurants folder.
// To add a new restaurant, create a file in /restaurants and add it to /restaurants/index.ts as described in README.
export { RESTAURANTS } from './restaurants';