import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { orderService } from '@/services/orders';

const DELIVERY_OPTIONS = [
  { id: 'pickup', name: 'Store Pickup', price: 0 },
  { id: 'standard', name: 'Standard Delivery', price: 49, freeAbove: 999 },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery' },
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'debit_card', name: 'Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'net_banking', name: 'Net Banking' },
  { id: 'wallet', name: 'Wallet' },
];

export default function NewCheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('cod');
  // Delivery address is handled by the form inputs directly
  
  const deliveryOption = DELIVERY_OPTIONS.find(opt => opt.id === delivery) || DELIVERY_OPTIONS[0];
  const deliveryCharge = deliveryOption.freeAbove && cartTotal >= deliveryOption.freeAbove ? 0 : deliveryOption.price;
  const total = cartTotal + deliveryCharge;
  const partialPayment = delivery === 'pickup' ? Math.round(total * 0.3) : total;

  const placeOrder = async () => {
    try {
      const orderData = {
        userId: 'current-user-id', // This should be replaced with actual user ID from auth context
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || ''
        })),
        subtotal: cartTotal,
        deliveryFee: deliveryCharge,
        total,
        discount: 0,
        finalTotal: total,
        status: 'pending' as const,
        paymentMethod: payment as 'cod' | 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet',
        paymentStatus: 'pending' as const,
        deliveryAddress: {
          id: 'pickup',
          name: 'Store Pickup',
          street: '123 Market Street',
          city: 'Downtown',
          state: 'State',
          pincode: '12345',
          isDefault: true
        },
        expectedDelivery: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Create order using the order service
      const order = await orderService.createOrder(orderData);
      
      clearCart();
      setStep(3);
      
      // Redirect to order confirmation page
      setTimeout(() => navigate(`/orders/${order.id}`), 3000);
    } catch (error) {
      console.error('Failed to place order:', error);
      // Show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= i ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > i ? '✓' : i}
              </div>
              <span className="mt-2 text-sm">
                {['Delivery', 'Payment', 'Confirm'][i-1]}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Delivery Method</h2>
            <div className="space-y-4 mb-6">
              {DELIVERY_OPTIONS.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => setDelivery(option.id)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    delivery === option.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{option.name}</span>
                    <span>
                      {option.freeAbove && cartTotal >= option.freeAbove 
                        ? 'Free' 
                        : `₹${option.price}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            <div className="space-y-4 mb-6">
              {PAYMENT_METHODS.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setPayment(method.id)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    payment === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  {method.name}
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              {delivery === 'pickup' && (
                <div className="text-sm text-gray-600 mt-1">
                  Pay ₹{partialPayment.toFixed(2)} now, rest at store
                </div>
              )}
            </div>
            
            <button
              onClick={placeOrder}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
            <Link
              to="/products"
              className="inline-block px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
