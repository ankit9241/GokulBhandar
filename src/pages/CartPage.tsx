
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { CartItem } from '@/context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM', 
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
    setSelectedTime(timeSlots[0]);
  }, []);

  const updateItemQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    toast.success('Cart updated');
  };

  const removeItem = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    // Store quick order data in state for payment page
    const quickOrderData = {
      items: cartItems,
      orderType,
      date: selectedDate,
      time: selectedTime,
      total: cartTotal,
      discount: 0, // Add discount field
      deliveryFee: orderType === 'delivery' ? (cartTotal >= 500 ? 0 : 40) : 0,
      finalTotal: cartTotal + (orderType === 'delivery' ? (cartTotal >= 500 ? 0 : 40) : 0)
    };
    
    // Navigate to payment page with order data
    navigate('/payment', { state: { orderData: quickOrderData } });
  };

  const deliveryFee = orderType === 'delivery' ? (cartTotal >= 500 ? 0 : 40) : 0;
  const finalOrderTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Toaster position="top-right" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <i className="ri-shopping-cart-line text-6xl text-gray-400 mb-6 w-24 h-24 flex items-center justify-center mx-auto"></i>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="p-6 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.brand || 'Gokul Bhandar'} • {item.unit || '1 pc'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-green-600">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                          disabled={item.quantity <= 1}
                        >
                          <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({cartItems.length} items)</p>
                  <p className="text-gray-900 font-medium">₹{cartTotal}</p>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹0</span>
                </div>
                {!showQuickOrder && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">Delivery Fee</p>
                    <p className="text-green-600 font-medium">{cartTotal >= 500 ? 'FREE' : '₹40'}</p>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">{showQuickOrder ? `₹${finalOrderTotal}` : `₹${cartTotal + (cartTotal >= 500 ? 0 : 40)}`}</span>
                </div>
              </div>

              {!showQuickOrder ? (
                <>
                  {cartTotal < 500 && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-blue-800">
                        <i className="ri-information-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
                        Add ₹{500 - cartTotal} more for free delivery!
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowQuickOrder(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <i className="ri-flash-line mr-2 w-4 h-4 flex items-center justify-center inline-flex"></i>
                      Quick Order
                    </button>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Full Checkout
                    </button>
                    
                    <Link
                      to="/"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {/* Order Type Selection */}
                  <div>
                    <h3 className="font-semibold mb-3">Select Order Type</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div 
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderType === 'pickup' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                        }`}
                        onClick={() => setOrderType('pickup')}
                      >
                        <div className="flex items-center space-x-2">
                          <i className="ri-store-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                          <div>
                            <h3 className="font-medium text-gray-900">Store Pickup</h3>
                            <p className="text-xs text-gray-600">Collect from store</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          orderType === 'delivery' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                        }`}
                        onClick={() => setOrderType('delivery')}
                      >
                        <div className="flex items-center space-x-2">
                          <i className="ri-truck-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">Home Delivery</h3>
                            <p className="text-xs text-gray-600">
                              {cartTotal >= 500 ? 'Free delivery' : '+₹40 delivery fee'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div>
                    <h3 className="font-semibold mb-3">Schedule {orderType === 'pickup' ? 'Pickup' : 'Delivery'}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-8"
                        >
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Updated Total with Delivery Fee */}
                  {orderType === 'delivery' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span>
                        </div>
                        <hr className="border-blue-200" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-green-600">₹{finalOrderTotal}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={(e) => handleQuickOrder(e)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
                      type="button"
                    >
                      Proceed to Payment - ₹{finalOrderTotal}
                    </button>
                    
                    <button
                      onClick={() => setShowQuickOrder(!showQuickOrder)}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      {showQuickOrder ? 'Cancel' : 'Quick Order'} (₹{cartTotal})
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
 