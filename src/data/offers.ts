export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  code: string;
  validTill: string;
  category: string;
  image: string;
}

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Fresh Fruits Week',
    description: 'Get 30% off on all fresh fruits',
    discount: '30% OFF',
    code: 'FRESH30',
    validTill: '2024-02-15',
    category: 'Fruits & Vegetables',
    image: 'https://readdy.ai/api/search-image?query=fresh%20colorful%20fruits%20in%20a%20basket%20with%20green%20leaves%2C%20bright%20natural%20lighting%2C%20healthy%20organic%20produce%2C%20vibrant%20colors%2C%20premium%20quality%20fruits%20display&width=400&height=300&seq=offer1&orientation=landscape'
  },
  {
    id: 2,
    title: 'Dairy Special',
    description: 'Buy 2 Get 1 Free on all dairy products',
    discount: 'Buy 2 Get 1',
    code: 'DAIRY21',
    validTill: '2024-02-20',
    category: 'Dairy & Bakery',
    image: 'https://readdy.ai/api/search-image?query=fresh%20dairy%20products%20milk%20cheese%20yogurt%20on%20clean%20white%20background%2C%20premium%20quality%20dairy%20items%2C%20healthy%20nutrition%2C%20bright%20clean%20lighting&width=400&height=300&seq=offer2&orientation=landscape'
  },
  {
    id: 3,
    title: 'Chocolate Lovers',
    description: 'Special prices on premium chocolates',
    discount: '25% OFF',
    code: 'CHOCO25',
    validTill: '2024-02-25',
    category: 'Chocolates',
    image: 'https://readdy.ai/api/search-image?query=premium%20dark%20chocolate%20bars%20and%20cocoa%20beans%20on%20elegant%20wooden%20background%2C%20luxury%20chocolate%20display%2C%20rich%20brown%20tones%2C%20artisanal%20quality&width=400&height=300&seq=offer3&orientation=landscape'
  },
  {
    id: 4,
    title: 'Ice Cream Bonanza',
    description: 'Cool deals on all ice cream flavors',
    discount: '20% OFF',
    code: 'ICE20',
    validTill: '2024-02-18',
    category: 'Ice Creams',
    image: 'https://readdy.ai/api/search-image?query=colorful%20ice%20cream%20scoops%20and%20frozen%20treats%20on%20light%20blue%20background%2C%20summer%20treats%2C%20refreshing%20desserts%2C%20playful%20and%20fun%20atmosphere&width=400&height=300&seq=offer4&orientation=landscape'
  }
];

export interface FlashDeal {
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  timeLeft: string;
}

export const flashDeals: FlashDeal[] = [
  { name: 'Red Apples', originalPrice: 120, salePrice: 84, discount: 30, timeLeft: '2h 45m' },
  { name: 'Milk 1L', originalPrice: 65, salePrice: 49, discount: 25, timeLeft: '4h 12m' },
  { name: 'Bread Loaf', originalPrice: 40, salePrice: 28, discount: 30, timeLeft: '1h 23m' },
  { name: 'Bananas', originalPrice: 60, salePrice: 42, discount: 30, timeLeft: '3h 56m' }
];
