
import { CartItem } from './cart';
import { Address } from './auth';

export type OrderStatus = 'confirmed' | 'packed' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
  status: OrderStatus;
  deliveryAddress: Address;
  deliveryType: 'home' | 'pickup';
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: 'cod' | 'upi' | 'card' | 'wallet';
  createdAt: string;
  trackingSteps: TrackingStep[];
}

export interface TrackingStep {
  status: OrderStatus;
  timestamp: string;
  description: string;
  completed: boolean;
}

class OrderService {
  private orders: Order[] = [
    {
      id: 'ORD001',
      userId: '2',
      items: [],
      total: 450,
      discount: 50,
      finalTotal: 400,
      status: 'delivered',
      deliveryAddress: {
        id: '1',
        name: 'Home',
        street: '123 Main Street, Apt 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true
      },
      deliveryType: 'home',
      deliveryDate: '2024-01-15',
      deliveryTime: '10:00 AM - 12:00 PM',
      paymentMethod: 'upi',
      createdAt: '2024-01-14T10:30:00Z',
      trackingSteps: [
        { status: 'confirmed', timestamp: '2024-01-14T10:30:00Z', description: 'Order confirmed', completed: true },
        { status: 'packed', timestamp: '2024-01-14T14:00:00Z', description: 'Order packed', completed: true },
        { status: 'out-for-delivery', timestamp: '2024-01-15T08:00:00Z', description: 'Out for delivery', completed: true },
        { status: 'delivered', timestamp: '2024-01-15T11:30:00Z', description: 'Order delivered', completed: true }
      ]
    }
  ];

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'trackingSteps'>): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order: Order = {
          ...orderData,
          id: `ORD${Date.now()}`,
          createdAt: new Date().toISOString(),
          trackingSteps: [
            {
              status: 'confirmed',
              timestamp: new Date().toISOString(),
              description: 'Order confirmed and payment received',
              completed: true
            }
          ]
        };
        
        this.orders.push(order);
        resolve(order);
      }, 1500);
    });
  }

  getUserOrders(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      
      const stepDescriptions: Record<OrderStatus, string> = {
        confirmed: 'Order confirmed and payment received',
        packed: 'Order packed and ready for dispatch',
        'out-for-delivery': 'Order is out for delivery',
        delivered: 'Order delivered successfully',
        cancelled: 'Order has been cancelled'
      };

      const existingStep = order.trackingSteps.find(step => step.status === status);
      if (!existingStep) {
        order.trackingSteps.push({
          status,
          timestamp: new Date().toISOString(),
          description: stepDescriptions[status],
          completed: true
        });
      }
      
      return true;
    }
    return false;
  }

  getOrderStats() {
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.finalTotal, 0);
    const pendingOrders = this.orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length;
    const deliveredOrders = this.orders.filter(order => order.status === 'delivered').length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders
    };
  }
}

export const orderService = new OrderService();
