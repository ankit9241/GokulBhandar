import { useState } from 'react';
import { toast } from 'react-hot-toast';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      offers: true,
      orderUpdates: true,
      priceDrop: false,
      backInStock: true,
      deliveryUpdates: true
    },
    delivery: {
      defaultTime: '9:00 AM - 11:00 AM',
      instructions: '',
      contactless: true,
      leaveAtDoor: false,
      callBeforeDelivery: false
    },
    communication: {
      newsletter: true,
      productRecommendations: true,
      marketting: false,
      survey: true
    }
  });

  const handleSave = () => {
    // In a real app, you would save these preferences via an API call
    toast.success('Preferences updated successfully!');
  };

  const handleNotificationToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handleDeliveryChange = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [key]: value
      }
    }));
  };

  const handleCommunicationToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      communication: {
        ...prev.communication,
        [key]: !prev.communication[key as keyof typeof prev.communication]
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Email Notifications</h3>
          {[
            { key: 'email', label: 'Account Notifications', description: 'Important updates about your account and orders' },
            { key: 'offers', label: 'Special Offers & Promotions', description: 'Get the best deals and exclusive offers' },
            { key: 'newsletter', label: 'Weekly Newsletter', description: 'Our weekly roundup of new products and content' },
            { key: 'priceDrop', label: 'Price Drop Alerts', description: 'Get notified when prices drop on your wishlist' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications[item.key as keyof typeof preferences.notifications] as boolean}
                  onChange={() => handleNotificationToggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}

          <div className="border-t border-gray-200 my-4"></div>
          
          <h3 className="font-medium text-gray-900">Mobile Notifications</h3>
          {[
            { key: 'push', label: 'Push Notifications', description: 'Get updates on your device' },
            { key: 'sms', label: 'SMS Alerts', description: 'Important updates via text message' },
            { key: 'orderUpdates', label: 'Order Status Updates', description: 'Track your order in real-time' },
            { key: 'deliveryUpdates', label: 'Delivery Updates', description: 'Get notified about delivery status' },
            { key: 'backInStock', label: 'Back in Stock Alerts', description: 'When products you want are back in stock' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications[item.key as keyof typeof preferences.notifications] as boolean}
                  onChange={() => handleNotificationToggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Delivery Preferences</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Delivery Time
            </label>
            <select
              value={preferences.delivery.defaultTime}
              onChange={(e) => handleDeliveryChange('defaultTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
              <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
              <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
              <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Delivery Instructions
            </label>
            <textarea
              value={preferences.delivery.instructions}
              onChange={(e) => handleDeliveryChange('instructions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
              placeholder="Any special instructions for delivery (e.g., gate code, building name, etc.)"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Delivery Options</h3>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Contactless Delivery</h4>
                <p className="text-sm text-gray-600">Leave at my door without contact</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.delivery.contactless}
                  onChange={() => handleDeliveryChange('contactless', !preferences.delivery.contactless)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Leave at Door</h4>
                <p className="text-sm text-gray-600">Leave the package at my door if I'm not home</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.delivery.leaveAtDoor}
                  onChange={() => handleDeliveryChange('leaveAtDoor', !preferences.delivery.leaveAtDoor)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Call Before Delivery</h4>
                <p className="text-sm text-gray-600">Call me before arriving for delivery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.delivery.callBeforeDelivery}
                  onChange={() => handleDeliveryChange('callBeforeDelivery', !preferences.delivery.callBeforeDelivery)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Communication Preferences</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">We'd love to stay in touch! Please let us know how you'd like to hear from us.</p>
          
          {[
            { key: 'newsletter', label: 'Email Newsletter', description: 'Receive our weekly newsletter with the latest products and offers' },
            { key: 'productRecommendations', label: 'Personalized Recommendations', description: 'Get product recommendations based on your shopping habits' },
            { key: 'marketting', label: 'Marketing Communications', description: 'Receive marketing emails about our products and services' },
            { key: 'survey', label: 'Surveys & Feedback', description: 'Help us improve by participating in surveys' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.communication[item.key as keyof typeof preferences.communication] as boolean}
                  onChange={() => handleCommunicationToggle(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PreferencesSection;
