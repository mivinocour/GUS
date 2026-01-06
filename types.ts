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
}

export interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}

export type ViewState = 'MENU' | 'SUCCESS' | 'PAYMENT' | 'PAYMENT_SUCCESS';
