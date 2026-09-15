export interface BrandLogo {
  name: string;
  slug: 'Nike' | 'Adidas' | 'Puma' | 'New Balance' | 'Converse' | 'Vans' | 'Reebok';
  subtitle?: string;
}

export const BRANDS: BrandLogo[] = [
  { name: 'NIKE', slug: 'Nike' },
  { name: 'adidas', slug: 'Adidas' },
  { name: 'PUMA', slug: 'Puma' },
  { name: 'new balance', slug: 'New Balance' },
  { name: 'CONVERSE', slug: 'Converse' },
  { name: 'VANS', subtitle: '"OFF THE WALL"', slug: 'Vans' },
  { name: 'Reebok', slug: 'Reebok' },
];
