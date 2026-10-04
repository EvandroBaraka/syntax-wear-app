export interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    colors: string[];
    sizes: string[];
    categoryId: number;
    slug: string;
    stock: number;
    active: boolean;
    description: string;
}