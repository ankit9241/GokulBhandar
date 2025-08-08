
import { Product } from './products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
}

class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart_items');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    }
    return this.items;
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: Date.now().toString(),
        product,
        quantity
      });
    }
    
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
        return;
      }
    }
    this.saveToStorage();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveToStorage();
  }

  clearCart(): void {
    this.items = [];
    this.saveToStorage();
  }

  getCart(): Cart {
    const items = this.getItems();
    const total = items.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
    const discount = items.reduce((sum, item) => sum + ((item.product.originalPrice - item.product.price) * item.quantity), 0);
    const finalTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return {
      items,
      total,
      discount,
      finalTotal
    };
  }

  getItemCount(): number {
    return this.getItems().reduce((count, item) => count + item.quantity, 0);
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_items', JSON.stringify(this.items));
    }
  }
}

export const cartService = new CartService();
