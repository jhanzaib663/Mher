export interface Product {
  id: string;
  name: string;
  brand: 'Nike' | 'Adidas' | 'Puma' | 'New Balance' | 'Converse' | 'Vans' | 'Reebok' | 'Jordan';
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  category: 'Running' | 'Lifestyle' | 'Basketball' | 'Training' | 'Sneakers' | 'Slides' | 'Boots';
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  isNew?: boolean;
  isSale?: boolean;
  colorway?: string;
  description?: string;
  sizes: number[];
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: Product['category'];
  image: string;
  itemCount: number;
}

export interface BrandItem {
  name: string;
  slug: Product['brand'];
  tagline?: string;
}

export interface FilterOptions {
  category: string;
  brand: string;
  gender: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  priceRange: [number, number];
  onlySale: boolean;
}
