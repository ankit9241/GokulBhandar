
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  unit: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    icon: 'ri-plant-line',
    count: 250,
    image: 'https://readdy.ai/api/search-image?query=fresh%20colorful%20fruits%20and%20vegetables%20arrangement%20on%20clean%20white%20background%2C%20organic%20produce%2C%20healthy%20food%20display%2C%20vibrant%20colors&width=400&height=300&seq=cat-fruits&orientation=landscape'
  },
  {
    id: '2',
    name: 'Dairy & Bakery',
    icon: 'ri-cake-3-line',
    count: 180,
    image: 'https://readdy.ai/api/search-image?query=dairy%20products%20milk%20cheese%20butter%20bread%20bakery%20items%20on%20clean%20white%20background%2C%20fresh%20dairy%20and%20baked%20goods%20arrangement&width=400&height=300&seq=cat-dairy&orientation=landscape'
  },
  {
    id: '3',
    name: 'Chocolates & Sweets',
    icon: 'ri-gift-line',
    count: 120,
    image: 'https://readdy.ai/api/search-image?query=premium%20chocolates%20and%20sweets%20arrangement%20on%20clean%20white%20background%2C%20luxury%20confectionery%2C%20colorful%20candies%20and%20chocolate%20bars&width=400&height=300&seq=cat-choco&orientation=landscape'
  },
  {
    id: '4',
    name: 'Ice Creams',
    icon: 'ri-snow-line',
    count: 80,
    image: 'https://readdy.ai/api/search-image?query=various%20ice%20cream%20flavors%20and%20frozen%20treats%20on%20clean%20white%20background%2C%20colorful%20ice%20cream%20scoops%20and%20popsicles%20arrangement&width=400&height=300&seq=cat-icecream&orientation=landscape'
  },
  {
    id: '5',
    name: 'Stationery',
    icon: 'ri-pencil-line',
    count: 200,
    image: 'https://readdy.ai/api/search-image?query=office%20and%20school%20stationery%20items%20on%20clean%20white%20background%2C%20pens%20pencils%20notebooks%20supplies%20neat%20arrangement&width=400&height=300&seq=cat-stationery&orientation=landscape'
  },
  {
    id: '6',
    name: 'Indoor Games',
    icon: 'ri-gamepad-line',
    count: 50,
    image: 'https://readdy.ai/api/search-image?query=board%20games%20and%20indoor%20gaming%20items%20on%20clean%20white%20background%2C%20family%20games%20puzzle%20cards%20toys%20arrangement&width=400&height=300&seq=cat-games&orientation=landscape'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Red Apples',
    description: 'Crisp and sweet red apples, perfect for snacking or cooking',
    price: 120,
    originalPrice: 150,
    discount: 20,
    category: 'Fruits & Vegetables',
    brand: 'Fresh Farm',
    image: 'https://readdy.ai/api/search-image?query=fresh%20red%20apples%20on%20clean%20white%20background%2C%20crisp%20healthy%20fruit%2C%20premium%20quality%20produce%20for%20grocery%20store&width=300&height=300&seq=apple-1&orientation=squarish',
    stock: 50,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    unit: 'kg',
    tags: ['fresh', 'organic', 'healthy']
  },
  {
    id: '2',
    name: 'Organic Bananas',
    description: 'Sweet and ripe organic bananas, rich in potassium',
    price: 60,
    originalPrice: 70,
    discount: 14,
    category: 'Fruits & Vegetables',
    brand: 'Organic Valley',
    image: 'https://readdy.ai/api/search-image?query=fresh%20yellow%20bananas%20bunch%20on%20clean%20white%20background%2C%20organic%20tropical%20fruit%2C%20premium%20quality%20grocery%20product&width=300&height=300&seq=banana-1&orientation=squarish',
    stock: 75,
    rating: 4.7,
    reviews: 95,
    inStock: true,
    unit: 'dozen',
    tags: ['organic', 'potassium', 'energy']
  },
  {
    id: '3',
    name: 'Full Cream Milk',
    description: 'Fresh full cream milk, pasteurized and homogenized',
    price: 65,
    originalPrice: 70,
    discount: 7,
    category: 'Dairy & Bakery',
    brand: 'Amul',
    image: 'https://readdy.ai/api/search-image?query=milk%20carton%20or%20bottle%20on%20clean%20white%20background%2C%20fresh%20dairy%20product%2C%20premium%20quality%20milk%20packaging&width=300&height=300&seq=milk-1&orientation=squarish',
    stock: 30,
    rating: 4.6,
    reviews: 203,
    inStock: true,
    unit: 'liter',
    tags: ['fresh', 'calcium', 'protein']
  },
  {
    id: '4',
    name: 'Dark Chocolate Bar',
    description: 'Premium dark chocolate with 70% cocoa content',
    price: 180,
    originalPrice: 200,
    discount: 10,
    category: 'Chocolates & Sweets',
    brand: 'Cadbury',
    image: 'https://readdy.ai/api/search-image?query=premium%20dark%20chocolate%20bar%20on%20clean%20white%20background%2C%20luxury%20confectionery%2C%20elegant%20chocolate%20packaging&width=300&height=300&seq=chocolate-1&orientation=squarish',
    stock: 25,
    rating: 4.8,
    reviews: 87,
    inStock: true,
    unit: '100g',
    tags: ['premium', 'dark', 'antioxidants']
  },
  {
    id: '5',
    name: 'Vanilla Ice Cream',
    description: 'Creamy vanilla ice cream made with real vanilla beans',
    price: 120,
    originalPrice: 140,
    discount: 14,
    category: 'Ice Creams',
    brand: 'Amul',
    image: 'https://readdy.ai/api/search-image?query=vanilla%20ice%20cream%20container%20on%20clean%20white%20background%2C%20creamy%20frozen%20dessert%2C%20premium%20ice%20cream%20packaging&width=300&height=300&seq=icecream-1&orientation=squarish',
    stock: 15,
    rating: 4.4,
    reviews: 156,
    inStock: true,
    unit: '500ml',
    tags: ['creamy', 'vanilla', 'dessert']
  },
  {
    id: '6',
    name: 'Notebook Set',
    description: 'Pack of 5 ruled notebooks for school and office use',
    price: 250,
    originalPrice: 300,
    discount: 17,
    category: 'Stationery',
    brand: 'Classmate',
    image: 'https://readdy.ai/api/search-image?query=stack%20of%20notebooks%20on%20clean%20white%20background%2C%20school%20stationery%20supplies%2C%20educational%20materials%20neat%20arrangement&width=300&height=300&seq=notebook-1&orientation=squarish',
    stock: 40,
    rating: 4.3,
    reviews: 76,
    inStock: true,
    unit: 'pack',
    tags: ['school', 'office', 'writing']
  },
  {
    id: '7',
    name: 'Chess Board Game',
    description: 'Classic wooden chess set for family entertainment',
    price: 850,
    originalPrice: 1000,
    discount: 15,
    category: 'Indoor Games',
    brand: 'Classic Games',
    image: 'https://readdy.ai/api/search-image?query=wooden%20chess%20board%20with%20pieces%20on%20clean%20white%20background%2C%20classic%20board%20game%2C%20family%20entertainment%20indoor%20game&width=300&height=300&seq=chess-1&orientation=squarish',
    stock: 10,
    rating: 4.9,
    reviews: 34,
    inStock: true,
    unit: 'set',
    tags: ['strategy', 'wooden', 'family']
  },
  {
    id: '8',
    name: 'Fresh Tomatoes',
    description: 'Juicy red tomatoes, perfect for cooking and salads',
    price: 40,
    originalPrice: 50,
    discount: 20,
    category: 'Fruits & Vegetables',
    brand: 'Farm Fresh',
    image: 'https://readdy.ai/api/search-image?query=fresh%20red%20tomatoes%20on%20clean%20white%20background%2C%20juicy%20ripe%20vegetables%2C%20premium%20quality%20produce%20for%20cooking&width=300&height=300&seq=tomato-1&orientation=squarish',
    stock: 60,
    rating: 4.4,
    reviews: 112,
    inStock: true,
    unit: 'kg',
    tags: ['fresh', 'juicy', 'vitamin-c']
  }
];

export const getProductsByCategory = (categoryName: string): Product[] => {
  return products.filter(product => product.category.toLowerCase().includes(categoryName.toLowerCase()));
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
