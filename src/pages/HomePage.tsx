import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products, categories, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';

// Group products by category
const productsByCategory = categories.map(category => ({
  ...category,
  products: products.filter(product => product.category === category.name).slice(0, 8) // Show max 8 products per category
}));

const HomePage = () => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState<{[key: string]: boolean}>({});

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(prev => ({ ...prev, [product.id]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`, {
        position: 'bottom-right',
        duration: 2000,
        icon: '🛒',
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const features = [
    { icon: 'ri-truck-line', title: 'Free Delivery', desc: 'On orders above ₹500' },
    { icon: 'ri-time-line', title: '30-Min Delivery', desc: 'Express delivery available' },
    { icon: 'ri-shield-check-line', title: '100% Fresh', desc: 'Quality guaranteed' },
    { icon: 'ri-customer-service-2-line', title: '24/7 Support', desc: 'Always here to help' },
  ];

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section (from original HomePage.tsx) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20grocery%20store%20interior%20with%20fresh%20fruits%20and%20vegetables%20displayed%20beautifully%2C%20soft%20natural%20lighting%2C%20clean%20white%20and%20green%20aesthetic%2C%20minimal%20design%2C%20shopping%20baskets%2C%20premium%20grocery%20store%20atmosphere&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Fresh Groceries <br />
            <span className="text-green-400">Delivered Daily</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
            Shop from our wide range of fresh groceries, stationery, games, and treats. 
            Fast delivery to your doorstep with premium quality guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link 
              to="/categories" 
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white px-8 py-4 rounded-full font-medium text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Categories with Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {productsByCategory.map((category) => (
          <section key={category.id} className="mb-20">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2">
              <div className="flex flex-col">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans">
                    {category.name}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm pl-5">{category.description || 'Premium quality products'}</p>
              </div>
              <Link 
                to={`/categories/${category.id}`}
                className="group flex items-center mt-3 sm:mt-0 text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
              >
                <span className="border-b border-transparent group-hover:border-green-600 transition-all">
                  View All
                </span>
                <i className="ri-arrow-right-line ml-1.5 group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            
            {/* Products Grid */}
            <div className="relative">
              <div className="flex space-x-5 overflow-x-auto pb-8 -mx-2 px-2 scrollbar-hide">
                {category.products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64">
                    <div className="h-full group">
                      <Link to={`/product/${product.id}`} className="block h-full">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-green-100">
                          <div className="relative pt-[100%] bg-gray-50">
                            <img 
                              src={product.image || '/placeholder-product.jpg'} 
                              alt={product.name}
                              className="absolute inset-0 w-full h-full object-cover p-6 group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-product.jpg';
                              }}
                            />
                            {product.discount && (
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                {product.discount}% OFF
                              </div>
                            )}
                            <button 
                              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-green-700 p-2 rounded-full shadow-md transition-all hover:scale-110"
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={isAdding[product.id]}
                              aria-label="Add to cart"
                            >
                              {isAdding[product.id] ? (
                                <i className="ri-loader-4-line text-lg animate-spin"></i>
                              ) : (
                                <i className="ri-shopping-cart-2-line text-lg"></i>
                              )}
                            </button>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="mb-3">
                              <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1.5 group-hover:text-green-600 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                                {product.description || 'Premium quality product with best in class ingredients'}
                              </p>
                            </div>
                            <div className="mt-auto pt-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-xl font-extrabold text-green-600">
                                    ₹{product.price.toFixed(2)}
                                  </span>
                                  {product.discount && (
                                    <span className="text-sm text-gray-400 line-through ml-1.5">
                                      ₹{Math.round(product.price / (1 - product.discount / 100))}
                                    </span>
                                  )}
                                </div>
                                <button 
                                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2.5 rounded-xl transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                                  onClick={(e) => handleAddToCart(product, e)}
                                  disabled={isAdding[product.id]}
                                  aria-label="Quick add to cart"
                                >
                                  {isAdding[product.id] ? (
                                    <i className="ri-loader-4-line text-lg animate-spin"></i>
                                  ) : (
                                    <i className="ri-add-line text-lg"></i>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Features Section (from original HomePage.tsx) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-green-600`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (from original HomePage.tsx) */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start shopping?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers who trust us for their daily needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              to="/signup" 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium text-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
