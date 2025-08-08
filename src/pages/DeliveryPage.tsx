import { Link } from 'react-router-dom';

const DeliveryPage = () => {
  const deliveryAreas = [
    { area: 'Downtown', time: '30-45 mins', fee: 'Free above ₹500' },
    { area: 'City Center', time: '45-60 mins', fee: 'Free above ₹500' },
    { area: 'Suburbs', time: '60-90 mins', fee: '₹40' },
    { area: 'Airport Road', time: '90-120 mins', fee: '₹60' },
  ];

  const timeSlots = [
    { slot: '9:00 AM - 11:00 AM', status: 'Available' },
    { slot: '11:00 AM - 1:00 PM', status: 'Available' },
    { slot: '1:00 PM - 3:00 PM', status: 'Busy' },
    { slot: '3:00 PM - 5:00 PM', status: 'Available' },
    { slot: '5:00 PM - 7:00 PM', status: 'Available' },
  ];

  const deliveryPartners = [
    { name: 'Raj Kumar', phone: '+91 98765 43210', area: 'Downtown & City Center' },
    { name: 'Amit Singh', phone: '+91 98765 43211', area: 'Suburbs & Airport Road' },
    { name: 'Priya Sharma', phone: '+91 98765 43212', area: 'All Areas (Express)' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Delivery Information</h1>
          <p className="text-gray-600">Everything you need to know about our delivery service</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Store Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-store-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
              Store Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-green-600 mt-1 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">Gokul Bhandar Store</p>
                  <p className="text-gray-600">123 Market Street, Downtown</p>
                  <p className="text-gray-600">City Center, State - 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">Store Contact</p>
                  <p className="text-gray-600">+91 98765 00000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-time-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">Store Hours</p>
                  <p className="text-gray-600">Mon-Sun: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Contact */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-customer-service-2-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
              Delivery Support
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">Delivery Helpline</p>
                  <p className="text-gray-600">+91 98765 11111</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-600">delivery@Gokul Bhandar.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-whatsapp-line text-green-600 w-5 h-5 flex items-center justify-center"></i>
                <div>
                  <p className="font-medium">WhatsApp Support</p>
                  <p className="text-gray-600">+91 98765 22222</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <i className="ri-map-2-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
            Delivery Areas & Timings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Area</th>
                  <th className="text-left py-3 px-4 font-medium">Delivery Time</th>
                  <th className="text-left py-3 px-4 font-medium">Delivery Fee</th>
                </tr>
              </thead>
              <tbody>
                {deliveryAreas.map((area, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 px-4 font-medium">{area.area}</td>
                    <td className="py-3 px-4 text-gray-600">{area.time}</td>
                    <td className="py-3 px-4">
                      <span className={area.fee === 'Free above ₹500' ? 'text-green-600' : 'text-gray-600'}>
                        {area.fee}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time Slots */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <i className="ri-calendar-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
            Available Time Slots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((slot, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{slot.slot}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    slot.status === 'Available' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Partners */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <i className="ri-user-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
            Our Delivery Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryPartners.map((partner, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="font-medium">{partner.name}</h3>
                    <p className="text-sm text-gray-600">{partner.phone}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{partner.area}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Policy */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <i className="ri-file-text-line text-green-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
            Delivery Policy
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <i className="ri-check-line text-green-600 mt-1 w-5 h-5 flex items-center justify-center"></i>
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-gray-600">On orders above ₹500 within city limits</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <i className="ri-check-line text-green-600 mt-1 w-5 h-5 flex items-center justify-center"></i>
              <div>
                <p className="font-medium">Express Delivery</p>
                <p className="text-gray-600">30-minute delivery available for select areas (₹20 extra)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <i className="ri-check-line text-green-600 mt-1 w-5 h-5 flex items-center justify-center"></i>
              <div>
                <p className="font-medium">Contactless Delivery</p>
                <p className="text-gray-600">Safe delivery at your doorstep with minimal contact</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <i className="ri-check-line text-green-600 mt-1 w-5 h-5 flex items-center justify-center"></i>
              <div>
                <p className="font-medium">Return Policy</p>
                <p className="text-gray-600">Easy returns within 24 hours for damaged or incorrect items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Need Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/track" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Track Your Order
            </Link>
            <Link to="/orders" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              View All Orders
            </Link>
            <a href="tel:+919876511111" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Call Delivery Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryPage;