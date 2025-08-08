import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover fresh groceries, delicious treats, and everyday essentials organized by category
          </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group block"
              >
                <div className="bg-white p-8 text-center hover:scale-105 transform transition-all duration-300 cursor-pointer group-hover:shadow-xl rounded-lg h-full">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <i className={`${category.icon} text-3xl text-green-600 w-12 h-12 flex items-center justify-center`}></i>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>{category.productCount} items</span>
                    <span>•</span>
                    <span>Starting from ₹{category.priceRange.min}</span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700">
                      Browse Category
                      <i className="ri-arrow-right-line ml-2 w-4 h-4 flex items-center justify-center group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
