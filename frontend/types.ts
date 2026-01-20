export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  selectionOptions?: string[]; // For items that require a selection (e.g., grouped beverages)
}

export interface ExtraItem {
  name: string;
  price: number;
}

export interface ItemCustomization {
  extras: ExtraItem[];
  specialInstructions: string;
  totalExtrasPrice: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  orderedBy?: string; // User ID who ordered this item
  customization?: ItemCustomization;
}

export interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}

export type ViewState = 'MENU' | 'SUCCESS' | 'PAYMENT' | 'PAYMENT_SUCCESS';

export interface TableUser {
  id: string;
  name: string;
  joinedAt: number;
}

export interface PaidItem {
  itemId: string;
  quantity: number;
  paidBy: string; // User ID
}
