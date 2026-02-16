import { createContext } from "react";
import type { Product } from "../interfaces/products";
import type { ProductCart } from "./CartProvider";

interface CartContextType {
    cart: ProductCart[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    incrementInCart: (product: ProductCart) => void;
    decrementInCart: (product: ProductCart) => void;
}

export const CartContext = createContext({} as CartContextType);