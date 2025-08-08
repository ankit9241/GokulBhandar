import { User } from '@/types/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface LoyaltyTier {
  name: string;
  min: number;
  max: number;
  color: string;
  benefits: string[];
}

interface LoyaltySectionProps {
  user: User;
}

const LoyaltySection: React.FC<LoyaltySectionProps> = ({ user }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const loyaltyTiers: LoyaltyTier[] = [
    { 
      name: 'Bronze', 
      min: 0, 
      max: 499, 
      color: 'orange', 
      benefits: ['2% cashback', 'Free delivery on ₹300+'] 
    },
    { 
      name: 'Silver', 
      min: 500, 
      max: 1499, 
      color: 'gray', 
      benefits: ['3% cashback', 'Free delivery on ₹200+', 'Priority support'] 
    },
    { 
      name: 'Gold', 
      min: 1500, 
      max: 4999, 
      color: 'yellow', 
      benefits: ['5% cashback', 'Free delivery always', 'Early access to sales'] 
    },
    { 
      name: 'Platinum', 
      min: 5000, 
      max: 999999, 
      color: 'purple', 
      benefits: ['8% cashback', 'Free delivery always', 'Exclusive products', 'Personal shopper'] 
    }
  ];

  const currentPoints = (user as any).loyaltyPoints || 0;
  const currentTier = loyaltyTiers.find(tier => currentPoints >= tier.min && currentPoints <= tier.max) || loyaltyTiers[0];
  const nextTier = loyaltyTiers.find(tier => tier.min > currentPoints);
  const progress = nextTier 
    ? Math.min(100, Math.round(((currentPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100))
    : 100;

  const rewards = [
    { points: 100, reward: '₹10 Off', description: 'Next purchase' },
    { points: 250, reward: '₹25 Off', description: 'Next purchase' },
    { points: 500, reward: '₹50 Off', description: 'Next purchase' },
    { points: 1000, reward: 'Free Delivery', description: 'For 1 month' }
  ];

  const handleRedeem = (points: number, reward: string) => {
    if (currentPoints < points) {
      toast.error(`You need ${points - currentPoints} more points to redeem this reward`);
      return;
    }
    
    setSelectedReward(reward);
    setIsRedeeming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      setSelectedReward(null);
      toast.success(`Success! Your ${reward} reward has been applied to your account.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loyalty Program</h2>
        
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-star-fill text-3xl text-white w-12 h-12 flex items-center justify-center"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{currentTier.name} Member</h3>
          <p className="text-gray-600">You have {currentPoints} points</p>
          
          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{currentPoints} points</span>
                <span>{nextTier.min - currentPoints} to {nextTier.name}</span>
                <span>{nextTier.min} points</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Current Benefits</h4>
            <ul className="space-y-2">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex-shrink-0 mt-0.5"></i>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            {nextTier && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Next Tier: {nextTier.name}</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Earn {nextTier.min - currentPoints} more points to unlock these benefits:
                </p>
                <ul className="space-y-1 text-sm">
                  {nextTier.benefits.filter(benefit => !currentTier.benefits.includes(benefit)).map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <i className="ri-arrow-right-s-line w-4 h-4 text-green-600"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">How to Earn Points</h4>
            <ul className="space-y-3">
              <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-shopping-cart-line text-green-600"></i>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">1 point for every ₹10 spent</h5>
                  <p className="text-sm text-gray-600">Earn points on every purchase</p>
                </div>
              </li>
              
              <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-chat-check-line text-blue-600"></i>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">50 points for product reviews</h5>
                  <p className="text-sm text-gray-600">Share your feedback on purchased items</p>
                </div>
              </li>
              
              <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-share-line text-purple-600"></i>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">100 points for referrals</h5>
                  <p className="text-sm text-gray-600">Invite friends to join FreshMart</p>
                </div>
              </li>
              
              <li className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i className="ri-gift-line text-yellow-600"></i>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Bonus points during special events</h5>
                  <p className="text-sm text-gray-600">Earn extra points during sales and promotions</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Redeem Points</h3>
        <p className="text-gray-600 mb-4">Use your points to get discounts on your next purchase</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, index) => {
            const canRedeem = currentPoints >= reward.points;
            const isRedeemingThis = isRedeeming && selectedReward === reward.reward;
            
            return (
              <div key={index} className="border rounded-lg p-4 text-center relative overflow-hidden">
                {isRedeemingThis && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                )}
                
                <h4 className={`font-semibold text-lg ${
                  canRedeem ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {reward.reward}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <p className="text-xs text-gray-500 mb-3">{reward.points} points</p>
                
                <button
                  onClick={() => handleRedeem(reward.points, reward.reward)}
                  disabled={!canRedeem || isRedeeming}
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                    canRedeem
                      ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canRedeem ? 'Redeem Now' : 'Not enough points'}
                </button>
                
                {!canRedeem && (
                  <p className="text-xs text-gray-500 mt-2">
                    Need {reward.points - currentPoints} more points
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">How it works</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Redeem points for instant discounts at checkout</li>
            <li>• 100 points = ₹10 discount</li>
            <li>• Rewards can be combined with other promotions</li>
            <li>• Points never expire as long as your account is active</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoyaltySection;
