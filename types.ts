export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  orderedBy?: string; // User ID who ordered this item
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
