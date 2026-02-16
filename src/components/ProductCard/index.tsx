import { Link } from "@tanstack/react-router";
import { MdAddShoppingCart } from "react-icons/md";
import type { Product } from "../../interfaces/products";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div key={product.id} className="bg-white rounded-2xl shadow-md">
            <Link to="/products/$productId" params={{ productId: product.id }}>
                <img
                    className="w-full max-h-100 object-cover rounded-md mb-2"
                    src={product.image}
                    alt={product.name}
                />
            </Link>

            <div className="text-black rounded-2xl p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <p>{product.color}</p>

                <div className="flex justify-between mt-2.5">
                    <p className="font-bold">R${product.price},00</p>
                    <button
                        className="cursor-pointer"
                        onClick={() => addToCart(product)}
                    >
                        <MdAddShoppingCart className="h-7 w-7" />
                    </button>
                </div>
            </div>
        </div>
    );
};
