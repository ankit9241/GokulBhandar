import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="logo text-2xl font-bold text-green-400 mb-4">
              Gokul Bhandar
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted local grocery store delivering fresh products right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 cursor-pointer">
                <i className="ri-facebook-fill text-xl w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 cursor-pointer">
                <i className="ri-instagram-line text-xl w-6 h-6 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 cursor-pointer">
                <i className="ri-twitter-line text-xl w-6 h-6 flex items-center justify-center"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-400 hover:text-green-400 cursor-pointer">Categories</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-green-400 cursor-pointer">Special Offers</Link></li>
              <li><Link to="/delivery" className="text-gray-400 hover:text-green-400 cursor-pointer">Delivery Info</Link></li>
              <li><Link to="/track" className="text-gray-400 hover:text-green-400 cursor-pointer">Track Order</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-green-400 cursor-pointer">Help Center</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-green-400 cursor-pointer">Returns</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 cursor-pointer">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-green-400 cursor-pointer">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-green-400 mt-1"></i>
                <span className="text-gray-400">
                  123 Grocery St, Foodie City, FC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-phone-line text-green-400"></i>
                <a href="tel:+11234567890" className="text-gray-400 hover:text-green-400">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-mail-line text-green-400"></i>
                <a href="mailto:info@gokulbhandar.com" className="text-gray-400 hover:text-green-400">
                  info@gokulbhandar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Gokul Bhandar. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-green-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-green-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-green-400 text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
