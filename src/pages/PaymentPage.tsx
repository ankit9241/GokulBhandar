import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast, Toaster } from 'react-hot-toast';
import { orderService } from '@/services/orders';


interface OrderData {
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  total: number;
  discount: number;
  finalTotal: number;
  orderType: 'pickup' | 'delivery';
  date: string;
  time: string;
  deliveryFee?: number;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { clearCart } = useCart();
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'wallet'>('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    const orderDataFromState = location.state?.orderData;
    if (!orderDataFromState) {
      navigate('/cart');
      return;
    }
    
    // Ensure all required fields are present
    const completeOrderData = {
      ...orderDataFromState,
      discount: orderDataFromState.discount || 0,
      deliveryFee: orderDataFromState.deliveryFee || 0,
      finalTotal: orderDataFromState.finalTotal || orderDataFromState.total + (orderDataFromState.deliveryFee || 0)
    };
    
    setOrderData(completeOrderData);
    setDeliveryFee(completeOrderData.deliveryFee);
    setFinalTotal(completeOrderData.finalTotal);
  }, [location.state, navigate]);

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: 'ri-hand-coin-line',
      desc: orderData?.orderType === 'pickup' ? 'Pay at store' : 'Pay when delivered'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: 'ri-smartphone-line',
      desc: 'Pay via UPI apps'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'ri-bank-card-line',
      desc: 'Visa, Mastercard, etc.'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'ri-wallet-line',
      desc: 'Paytm, PhonePe, GPay'
    }
  ];

  const handlePayment = async () => {
    // Check if user is authenticated
    if (!currentUser) {
      toast.error('Please log in to complete your purchase');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // Validate order data
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    // Validate payment method
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Validate payment method specific fields
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast.error('Please fill all card details');
        return;
      }
      // Basic card validation
      if (cardDetails.number.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      if (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
        toast.error('Please enter a valid CVV (3-4 digits)');
        return;
      }
    } else if (paymentMethod === 'upi' && !upiId) {
      toast.error('Please enter a valid UPI ID');
      return;
    }

    setIsProcessing(true);

    try {
      // Show processing message
      toast.loading('Processing your payment...');
      
      // Create order and handle response
      // Transform cart items to match OrderItem type with proper error handling
      const orderItems = orderData.items.map(item => {
        // Validate item structure
        if (!item) {
          console.error('Invalid item in order:', item);
          throw new Error('Invalid item in order. Please try again.');
        }
        
        // Handle both cart item and product structures
        const product = item.product || item;
        
        if (!product.id || !product.name || product.price === undefined || !item.quantity) {
          console.error('Invalid item structure in order:', item);
          throw new Error('One or more items in your order are invalid. Please try again.');
        }
        
        return {
          id: `item-${Date.now()}-${product.id}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.image || ''
        };
      });

      const newOrder = await orderService.createOrder({
        userId: currentUser.id,
        items: orderItems,
        subtotal: orderData.total + (orderData.discount || 0), // Calculate subtotal before discount
        deliveryFee: orderData.deliveryFee || 0,
        discount: orderData.discount || 0,
        total: orderData.total,
        finalTotal: orderData.finalTotal,
        status: paymentMethod === 'cod' ? 'confirmed' : 'processing',
        deliveryAddress: orderData.orderType === 'pickup' ? {
          id: 'pickup',
          name: 'Store Pickup',
          street: '123 Fresh Mart Store, Market Street',
          city: 'Downtown',
          state: 'State',
          pincode: '12345',
          isDefault: false
        } : currentUser.addresses?.[0] || {
          id: 'default',
          name: 'Default Address',
          street: 'Default Street',
          city: 'Default City',
          state: 'Default State',
          pincode: '123456',
          isDefault: true
        },
        paymentMethod: paymentMethod as 'cod' | 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet',
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        expectedDelivery: orderData.date
      });

      // Clear cart
      clearCart();
      
      // Dismiss loading toast
      toast.dismiss();
      
      // Show success message
      toast.success(`Order #${newOrder.orderNumber} placed successfully!`);
      
      // Navigate to order confirmation page
      navigate('/orders');
      
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.dismiss();
      
      // More specific error messages based on the error type
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        
        if (error.response.status === 401) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
        } else if (error.response.data?.message) {
          toast.error(`Payment failed: ${error.response.data.message}`);
        } else {
          toast.error(`Payment failed with status ${error.response.status}. Please try again.`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server. Please check your internet connection.');
      } else if (error.message) {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        toast.error(`Payment failed: ${error.message}`);
      } else {
        // Unknown error
        console.error('Unknown error:', error);
        toast.error('An unknown error occurred. Please try again later.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="text-green-600 hover:text-green-700 mr-2">
            <i className="ri-arrow-left-line text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.id as any)}
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${method.icon} text-2xl text-green-600 w-8 h-8 flex items-center justify-center`}></i>
                      <div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Method Forms */}
              <div className="mt-6">
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Card Details</h4>
                    <div className="space-y-4">
                      <div>
                            <input
                              type="text"
                              placeholder="Card Number"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Cardholder Name"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">Enter UPI ID</h4>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">Select Wallet</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Paytm', 'PhonePe', 'GPay', 'Amazon Pay'].map(wallet => (
                        <div
                          key={wallet}
                          className="p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors text-center cursor-pointer"
                        >
                          {wallet}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{orderData?.total?.toFixed(2)}</span>
                </div>
                
                {orderData?.discount && orderData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderData.discount.toFixed(2)}</span>
                  </div>
                )}
                
                {deliveryFee !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${
                  isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                } transition-colors`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Processing...
                  </span>
                ) : (
                  `${paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'} - ₹${orderData.finalTotal}`
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
