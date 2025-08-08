export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export type DeliveryType = 'home' | 'pickup';
export type PaymentMethod = 'cod' | 'upi' | 'card' | 'wallet';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
}
