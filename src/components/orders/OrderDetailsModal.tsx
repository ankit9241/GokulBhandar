import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Order } from '@/types/orders';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  
  if (!order) return null;
  
  const handleTrackOrder = (e: React.MouseEvent) => {
    // Prevent any default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Track Order clicked - direct handler');
    
    if (!order?.id) {
      console.error('No order ID available');
      return;
    }
    
    // Close the modal
    if (onClose) onClose();
    
    // Navigate directly using window.location
    console.log('Navigating to track page with order ID:', order.id);
    window.location.href = `/track?orderId=${order.id}`;
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full';
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'shipped':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default: // pending, processing
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'upi':
        return 'UPI';
      case 'net_banking':
        return 'Net Banking';
      case 'wallet':
        return 'Wallet';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose} onClick={(e) => e.stopPropagation()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Order #{order.orderNumber}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Order Items */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span>₹{order.subtotal?.toFixed(2) || '0.00'}</span>
                        </div>
                        {order.deliveryFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span>₹{order.deliveryFee?.toFixed(2)}</span>
                          </div>
                        )}
                        {order.discount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Discount</span>
                            <span className="text-green-600">-₹{order.discount?.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <span>Total</span>
                            <span>₹{order.finalTotal?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="font-medium">{getPaymentMethod(order.paymentMethod)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Payment Status</p>
                            <span className={getStatusBadge(order.paymentStatus)}>
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-500">Order Status</p>
                            <span className={getStatusBadge(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          {order.deliveredAt && (
                            <div>
                              <p className="text-gray-500">Delivered On</p>
                              <p>{format(new Date(order.deliveredAt), 'MMM d, yyyy')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {order.deliveryAddress && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{order.deliveryAddress.name}</p>
                          <p className="text-sm text-gray-600">{order.deliveryAddress.street}</p>
                          <p className="text-sm text-gray-600">
                            {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {order.status !== 'cancelled' && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Div click handler');
                        handleTrackOrder(e);
                      }}
                      className="inline-block"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Button click handler');
                          handleTrackOrder(e);
                        }}
                        className="relative z-[9999] inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!order.id}
                        style={{ pointerEvents: 'auto' }}
                      >
                        Track Order
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OrderDetailsModal;
