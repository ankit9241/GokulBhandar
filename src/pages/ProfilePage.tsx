import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { orderService } from '@/services/orders';
import { User } from '@/types/auth';
import { toast } from 'react-hot-toast';
import ProfileInfo from '../components/profile/ProfileInfo';
import AddressesSection from '../components/profile/AddressesSection';
import LoyaltySection from '../components/profile/LoyaltySection';
import PreferencesSection from '../components/profile/PreferencesSection';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      toast.error('Please log in to view your profile');
      navigate('/login', { state: { from: '/profile' } });
      return;
    }
    setUser(currentUser);
    setIsLoading(false);
  }, [navigate]);

  const tabs = [
    { id: 'profile', name: 'Profile Info', icon: 'ri-user-line' },
    { id: 'addresses', name: 'Addresses', icon: 'ri-map-pin-line' },
    { id: 'loyalty', name: 'Loyalty Points', icon: 'ri-star-line' },
    { id: 'preferences', name: 'Preferences', icon: 'ri-settings-line' }
  ];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const userOrders = orderService.getUserOrders(user.id);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.finalTotal, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">
                  My Account
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your profile, addresses, and preferences
                </p>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-green-800">Total Orders</h3>
                    <p className="text-2xl font-bold text-green-600">{userOrders.length}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-blue-800">Total Spent</h3>
                    <p className="text-2xl font-bold text-blue-600">₹{totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h3 className="font-semibold text-yellow-800">Loyalty Points</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {(user as any).loyaltyPoints || 0}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`${tab.icon} w-5 h-5 flex items-center justify-center`}></i>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && <ProfileInfo user={user} />}
              {activeTab === 'addresses' && <AddressesSection user={user} />}
              {activeTab === 'loyalty' && <LoyaltySection user={user} />}
              {activeTab === 'preferences' && <PreferencesSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
