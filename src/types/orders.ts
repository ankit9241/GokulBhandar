import { Address } from './auth';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
export type PaymentMethod = 'cod' | 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  weight?: string;
  variant?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  finalTotal: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress: Address;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  cancelledAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  expectedDelivery?: string;
  couponCode?: string;
  couponDiscount?: number;
  taxAmount?: number;
  taxPercentage?: number;
  pointsEarned?: number;
}
