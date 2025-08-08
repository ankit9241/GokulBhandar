import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { orderService } from '@/services/orders';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TrackPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'N/A' : format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'N/A' : format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date time:', error);
      return 'N/A';
    }
  };

  useEffect(() => {
    const orderIdFromUrl = searchParams.get('orderId');
    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
      handleTrackOrder(orderIdFromUrl);
    }
  }, [searchParams]);

  const handleTrackOrder = (searchId?: string) => {
    const trackingId = searchId || orderId;
    if (!trackingId.trim()) return;

    setIsLoading(true);
    setNotFound(false);

    // First try to find by orderNumber (e.g., ORD-2025-2140)
    const foundByOrderNumber = orderService.getOrderByOrderNumber(trackingId);
    
    // If not found by orderNumber, try by id as fallback
    const foundOrder = foundByOrderNumber || orderService.getOrderById(trackingId);

    setTimeout(() => {
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    }, 500);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return 'ri-check-line';
      case 'packed': return 'ri-package-line';
      case 'out-for-delivery': return 'ri-truck-line';
      case 'delivered': return 'ri-home-line';
      case 'cancelled': return 'ri-close-line';
      default: return 'ri-time-line';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Enter your order ID to get real-time updates on your delivery status
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., ORD-2023-1234)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                className="w-full px-6 py-4 pr-24 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
              <button
                onClick={() => handleTrackOrder()}
                disabled={isLoading || !orderId.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  isLoading || !orderId.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-lg hover:shadow-emerald-100'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Tracking...</span>
                  </div>
                ) : (
                  <span className="flex items-center space-x-2">
                    <i className="ri-search-line"></i>
                    <span>Track Order</span>
                  </span>
                )}
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">
              Can't find your order ID? Check your email or order history
            </p>
          </div>
        </div>

        {notFound && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-close-line text-4xl text-red-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Order Not Found</h2>
            <p className="text-gray-600 mb-8 text-lg">We couldn't find an order with that ID. Please check and try again.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/orders" 
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
              >
                View Order History
              </Link>
              <button 
                onClick={() => setNotFound(false)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {order && (
          <div className="space-y-8">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order #{order.id}</h2>
                    <p className="text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block px-4 py-2 bg-green-50 text-green-800 text-sm font-medium rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Delivery Address</p>
                      <p className="text-gray-600">{order.deliveryAddress.city}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <i className="ri-calendar-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Delivery Date</p>
                      <p className="text-gray-600">
                        {formatDate(order.deliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                      <i className="ri-truck-line text-xl"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Delivery Type</p>
                      <p className="text-gray-600">
                        {order.deliveryType === 'home' ? 'Home Delivery' : 'Store Pickup'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Order Total</p>
                    <p className="text-2xl font-bold text-gray-900">₹{order.finalTotal}</p>
                    <p className="text-sm text-gray-500 mt-1">{order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-900">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </p>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Progress */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
              <div className="p-8">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-xl shadow-md">
                    <i className="ri-truck-line text-2xl text-white"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">Order Progress</h3>
                    <p className="text-gray-500">Track your order's journey to you</p>
                  </div>
                </div>
                
                <div className="relative">
                  {order?.trackingSteps?.length > 0 && (
                    <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-100">
                      <div 
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500 to-green-600 origin-top transition-all duration-1000 ease-out"
                        style={{
                          transform: `scaleY(${order.trackingSteps.filter((s: any) => s.completed).length / order.trackingSteps.length})`,
                          transformOrigin: 'top center'
                        }}
                      ></div>
                    </div>
                  )}
                  
                  {(order?.trackingSteps || []).map((step: any, index: number) => {
                    const isCompleted = step.completed;
                    const isCurrent = !isCompleted && (index === 0 || order.trackingSteps[index - 1]?.completed);
                    
                    return (
                    <div 
                      key={step.status} 
                      className={`relative flex items-start pb-12 last:pb-8 group transition-all duration-300 ${
                        isCompleted ? 'opacity-100' : isCurrent ? 'opacity-90' : 'opacity-50'
                      }`}
                    >
                      <div className="flex flex-col items-center mr-6 z-10">
                        <div 
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white scale-100' 
                              : isCurrent
                                ? 'bg-white border-4 border-emerald-400 text-emerald-600 scale-110 group-hover:scale-125' 
                                : 'bg-gray-100 text-gray-400 scale-90'
                          }`}
                        >
                          <i className={`${getStepIcon(step.status)} text-2xl transition-transform duration-300 ${isCurrent ? 'animate-pulse' : ''}`}></i>
                        </div>
                      </div>
                      
                      <div className="flex-1 pt-3 transform transition-transform duration-300 group-hover:translate-x-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className={`text-lg font-semibold ${
                            isCompleted 
                              ? 'text-gray-900' 
                              : isCurrent 
                                ? 'text-emerald-700' 
                                : 'text-gray-400'
                          }`}>
                            {step.status.split('-').map((word: string) => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                            {isCurrent && (
                              <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full animate-pulse">
                                In Progress
                              </span>
                            )}
                          </h4>
                          {isCompleted && step.timestamp && (
                            <span className="text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-50 px-2.5 py-1 rounded-full">
                              <i className="ri-time-line mr-1"></i>
                              {formatDateTime(step.timestamp)}
                            </span>
                          )}
                        </div>
                        
                        <p className={`mt-2 ${
                          isCompleted ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                        
                        {step.notes && isCompleted && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  <i className="ri-information-line"></i>
                                </div>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                  {step.notes}
                                </p>
                                {step.estimatedDelivery && (
                                  <p className="mt-1 text-xs text-blue-600 font-medium">
                                    <i className="ri-time-line mr-1"></i>
                                    Estimated delivery: {formatDate(step.estimatedDelivery)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {isCurrent && step.expectedCompletion && (
                          <div className="mt-3 inline-flex items-center text-sm text-gray-500 bg-amber-50 px-3 py-1.5 rounded-full">
                            <i className="ri-time-line mr-1.5 text-amber-500"></i>
                            Expected by: {formatDate(step.expectedCompletion)}
                          </div>
                        )}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link 
                to={`/orders/${order.id}`} 
                className="px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors duration-200 text-center"
              >
                View Full Details
              </Link>
              <Link 
                to="/delivery" 
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-100 transition-all duration-200 text-center"
              >
                <i className="ri-truck-line mr-2"></i>
                Delivery Information
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TrackPage;