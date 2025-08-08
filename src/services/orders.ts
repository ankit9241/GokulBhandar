import { Order, OrderStatus } from '../types/orders';
import { authService } from './auth';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    orderNumber: 'ORD-2023-1001',
    items: [
      {
        id: '101',
        productId: 'p1',
        name: 'Fresh Apples',
        price: 120,
        quantity: 2,
        image: 'https://readdy.ai/api/search-image?query=fresh%20red%20apples%20on%20white%20background&width=200&height=200'
      },
      {
        id: '102',
        productId: 'p2',
        name: 'Bananas',
        price: 60,
        quantity: 5,
        image: 'https://readdy.ai/api/search-image?query=fresh%20yellow%20bananas&width=200&height=200'
      }
    ],
    subtotal: 540,
    deliveryFee: 40,
    discount: 54,
    total: 526,
    finalTotal: 526,
    status: 'delivered' as OrderStatus,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    deliveryAddress: {
      id: '1',
      name: 'Home',
      street: '123 Main Street, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    createdAt: '2023-10-15T10:30:00Z',
    deliveredAt: '2023-10-16T14:20:00Z'
  },
  {
    id: '2',
    userId: '2',
    orderNumber: 'ORD-2023-1002',
    items: [
      {
        id: '201',
        productId: 'p3',
        name: 'Fresh Milk 1L',
        price: 65,
        quantity: 3,
        image: 'https://readdy.ai/api/search-image?query=fresh%20milk%20bottle%20on%20white%20background&width=200&height=200'
      },
      {
        id: '202',
        productId: 'p4',
        name: 'Brown Bread',
        price: 40,
        quantity: 2,
        image: 'https://readdy.ai/api/search-image?query=fresh%20brown%20bread&width=200&height=200'
      }
    ],
    subtotal: 275,
    deliveryFee: 40,
    discount: 27.5,
    total: 287.5,
    finalTotal: 288,
    status: 'shipped' as OrderStatus,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    deliveryAddress: {
      id: '1',
      name: 'Home',
      street: '123 Main Street, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    createdAt: '2023-11-05T15:45:00Z',
    expectedDelivery: '2023-11-07T18:00:00Z'
  }
];

class OrderService {
  private orders: Order[] = [];

  constructor() {
    // Load orders from localStorage if available, otherwise use mock data
    const savedOrders = localStorage.getItem('user_orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    } else {
      this.orders = [...mockOrders];
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('user_orders', JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }
  
  private async updateUserLoyaltyPoints(userId: string, pointsEarned: number): Promise<boolean> {
    try {
      // Get current user data
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === userId);
      
      if (userIndex === -1) return false;
      
      // Update loyalty points
      users[userIndex].loyaltyPoints = (users[userIndex].loyaltyPoints || 0) + pointsEarned;
      users[userIndex].updatedAt = new Date().toISOString();
      
      // Save updated users
      localStorage.setItem('users', JSON.stringify(users));
      
      // Update current user in localStorage if it's the same user
      const currentUser = authService.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = {
          ...currentUser,
          loyaltyPoints: (currentUser.loyaltyPoints || 0) + pointsEarned,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('Error updating loyalty points:', error);
      return false;
    }
  }

  getUserOrders(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  getOrderByOrderNumber(orderNumber: string): Order | undefined {
    return this.orders.find(order => order.orderNumber === orderNumber);
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'orderNumber' | 'pointsEarned'>): Promise<Order> {
    try {
      // Check if user is authenticated
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        console.error('No authenticated user found');
        throw new Error('User not authenticated. Please log in to place an order.');
      }

      // Validate order data
      if (!orderData.items || orderData.items.length === 0) {
        throw new Error('Cannot create an order with no items');
      }

      // Calculate loyalty points (1 point for every 100 rupees spent)
      const pointsEarned = Math.floor(orderData.finalTotal / 100);
      
      // Create the new order
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        userId: currentUser.id, // Ensure the order is associated with the current user
        orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'pending' as OrderStatus,
        pointsEarned,
        updatedAt: new Date().toISOString()
      };
      
      // Add order to the list
      this.orders.unshift(newOrder);
      this.saveToLocalStorage();
      
      // Update user's loyalty points if not admin
      if (currentUser.role !== 'admin') {
        await this.updateUserLoyaltyPoints(currentUser.id, pointsEarned);
      }
      
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    try {
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex === -1) return false;
      
      this.orders[orderIndex].status = status;
      this.orders[orderIndex].updatedAt = new Date().toISOString();
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  }
}

export const orderService = new OrderService();
