export interface Moto {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  url: string;
  type?: string;   // El ? significa que es opcional
  year?: number;
  engine?: string;
  license?: string;
}

export interface Brand {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Producto {
    id: number;
    brand: Brand;
    categories: Category;
    images: string[];
    price: number;
    thumbnail: string;
    title: string;
    url: string;
}

export interface LayoutProps {
    children: React.ReactNode;
}