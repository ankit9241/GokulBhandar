export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  image: string;
  productCount: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    icon: 'ri-plant-line',
    count: 250,
    description: 'Fresh and organic fruits and vegetables',
    image: 'https://readdy.ai/api/search-image?query=fresh%20colorful%20fruits%20and%20vegetables%20arrangement%20on%20clean%20white%20background%2C%20organic%20produce%2C%20healthy%20food%20display%2C%20vibrant%20colors&width=400&height=300&seq=cat-fruits&orientation=landscape',
    productCount: 45,
    priceRange: { min: 20, max: 500 }
  },
  {
    id: '2',
    name: 'Dairy & Bakery',
    icon: 'ri-cake-3-line',
    count: 180,
    description: 'Fresh dairy products and baked goods',
    image: 'https://readdy.ai/api/search-image?query=dairy%20products%20milk%20cheese%20butter%20bread%20bakery%20items%20on%20clean%20white%20background%2C%20fresh%20dairy%20and%20baked%20goods%20arrangement&width=400&height=300&seq=cat-dairy&orientation=landscape',
    productCount: 32,
    priceRange: { min: 15, max: 300 }
  },
  {
    id: '3',
    name: 'Chocolates & Sweets',
    icon: 'ri-gift-line',
    count: 120,
    description: 'Delicious chocolates and sweets for every occasion',
    image: 'https://readdy.ai/api/search-image?query=premium%20chocolates%20and%20sweets%20arrangement%20on%20clean%20white%20background%2C%20luxury%20confectionery%2C%20colorful%20candies%20and%20chocolate%20bars&width=400&height=300&seq=cat-choco&orientation=landscape',
    productCount: 28,
    priceRange: { min: 10, max: 1000 }
  },
  {
    id: '4',
    name: 'Beverages',
    icon: 'ri-cup-line',
    count: 150,
    description: 'Refreshing drinks for every taste',
    image: 'https://readdy.ai/api/search-image?query=assortment%20of%20beverages%20on%20table%2C%20cold%20drinks%20juices%20and%20water%20bottles%20arrangement%2C%20refreshing%20drinks%20display&width=400&height=300&seq=cat-bev&orientation=landscape',
    productCount: 38,
    priceRange: { min: 15, max: 200 }
  },
  {
    id: '5',
    name: 'Snacks',
    icon: 'ri-cookie-line',
    count: 200,
    description: 'Tasty snacks for any time of the day',
    image: 'https://readdy.ai/api/search-image?query=assortment%20of%20snacks%20on%20table%2C%20chips%20crackers%20and%20nuts%20arrangement%2C%20crispy%20snacks%20display&width=400&height=300&seq=cat-snacks&orientation=landscape',
    productCount: 42,
    priceRange: { min: 10, max: 500 }
  },
  {
    id: '6',
    name: 'Household',
    icon: 'ri-home-4-line',
    count: 180,
    description: 'Essential household items for your home',
    image: 'https://readdy.ai/api/search-image?query=household%20cleaning%20supplies%20and%20essentials%20on%20white%20background%2C%20home%20care%20products%20arrangement&width=400&height=300&seq=cat-house&orientation=landscape',
    productCount: 35,
    priceRange: { min: 20, max: 1000 }
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Apples',
    description: 'Fresh and juicy apples, perfect for snacking',
    price: 120,
    image: '/assets/apples.png',
    category: 'Fruits & Vegetables',
    brand: 'Farm Fresh',
    rating: 4.5,
    numReviews: 24,
    countInStock: 50,
    isNew: true
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    price: 45,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop',
    category: 'Dairy & Bakery',
    brand: 'Bakery Fresh',
    rating: 4.2,
    numReviews: 18,
    countInStock: 30
  },
  {
    id: '3',
    name: 'Organic Milk',
    description: '1L pack of organic cow milk',
    price: 70,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop',
    category: 'Dairy & Bakery',
    brand: 'Organic Valley',
    rating: 4.7,
    numReviews: 36,
    countInStock: 40,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Potato Chips',
    description: 'Crunchy and delicious potato chips',
    price: 30,
    image: '/assets/potato-chips.png',
    category: 'Snacks',
    brand: 'Lays',
    rating: 4.3,
    numReviews: 42,
    countInStock: 60,
    discount: 10
  },
  {
    id: '5',
    name: 'Mineral Water',
    description: '1L pack of mineral water',
    price: 20,
    image: 'https://images.unsplash.com/photo-1561040186-4d8e0fce823e?w=500&auto=format&fit=crop',
    category: 'Beverages',
    brand: 'Bisleri',
    rating: 4.0,
    numReviews: 15,
    countInStock: 100
  },
  {
    id: '6',
    name: 'Toilet Paper',
    description: 'Soft and strong toilet paper, 10 rolls',
    price: 250,
    image: 'https://images.unsplash.com/photo-1605727217651-d8d3f8e2c1e0?w=500&auto=format&fit=crop',
    category: 'Household',
    brand: 'Hygiene Plus',
    rating: 4.6,
    numReviews: 28,
    countInStock: 25
  }
];
