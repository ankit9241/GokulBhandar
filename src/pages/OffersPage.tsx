import { Link } from 'react-router-dom';
import { offers, flashDeals } from '@/data/offers';

const OffersPage = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers & Deals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save more with our exclusive offers and flash deals on fresh groceries and essentials
          </p>
        </div>

          {/* Flash Deals */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
              <div className="flex items-center space-x-2 text-red-600">
                <i className="ri-time-line w-5 h-5 flex items-center justify-center"></i>
                <span className="font-medium">Limited Time Only</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashDeals.map((deal, index) => (
                <div key={index} className="bg-white p-6 text-center border-2 border-red-200 hover:border-red-300 transition-colors rounded-lg">
                  <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">
                    {deal.discount}% OFF
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm text-gray-500 line-through">₹{deal.originalPrice}</p>
                    <p className="text-xl font-bold text-red-600">₹{deal.salePrice}</p>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Ends in: <span className="font-medium text-red-600">{deal.timeLeft}</span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
                    Grab Deal
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* All Offers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-48 h-48">
                      <img 
                        className="w-full h-full object-cover" 
                        src={offer.image} 
                        alt={offer.title} 
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {offer.category}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {offer.discount}
                          </span>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold text-gray-900">{offer.title}</h3>
                        <p className="mt-3 text-base text-gray-600">{offer.description}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Use code: <span className="font-mono font-bold text-gray-900">{offer.code}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Valid till: <span className="font-medium">{formatDate(offer.validTill)}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/products?category=${encodeURIComponent(offer.category)}`}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default OffersPage;
