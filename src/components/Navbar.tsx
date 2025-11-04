import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { RiShoppingCartLine, RiUserLine, RiMenuLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/offers', label: 'Offers' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Gokul Bhandar" className="h-10 w-auto" />
          </Link>
          
          {/* Search Box - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-4">
            <div className={`flex items-center bg-gray-50 rounded-lg px-4 py-2 w-full max-w-md transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-green-500 bg-white shadow-md' : ''}`}>
              <RiSearchLine className="text-gray-400 mr-3 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-transparent outline-none text-sm"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Cart and Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 text-gray-700 hover:text-emerald-600 relative">
              <RiShoppingCartLine className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <RiUserLine className="h-5 w-5 text-gray-600" />
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-emerald-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <RiCloseLine className="h-6 w-6" />
              ) : (
                <RiMenuLine className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-full">
                  <RiSearchLine className="text-gray-400 mr-3 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
              
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                to="/cart"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 border-t border-gray-200 mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 border-t border-gray-200 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="pt-4 pb-2 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
