import { createFileRoute } from "@tanstack/react-router";
import { ProductList } from "../../../components/ProductList";
import { LoadSpinner } from "../../../components/LoadSpinner";
import { getProducts } from "../../../services/productService";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../../interfaces/products";

export const Route = createFileRoute("/_app/products/")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Produtos - SyntaxWear" }],
    }),
});

function RouteComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const hasFetchedInitialProducts = useRef(false);

    async function loadMoreProducts() {
        if (loading || !hasMore) return;

        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
            const response = await getProducts({ page });

            setProducts((prev) => [...prev, ...response.data]);

            if (response.data.length < response.limit) {
                setHasMore(false);
            } else {
                setPage((prev) => prev + 1);
            }

            console.log("loadMoreProducts response:", response);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (hasFetchedInitialProducts.current) return;
        hasFetchedInitialProducts.current = true;

        loadMoreProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="container pt-44 md:pt-54 pb-10 md:px-10 mb-10 text-black flex flex-col items-center justify-center">
            <h1 className="text-3xl text-center mb-3">Lista de Produtos</h1>

            <h2 className="text-center mb-10 p-4">
                Conforto exepcional para suas aventuras do dia-a-dia
            </h2>

            {loading && products.length === 0 ? (
                <LoadSpinner />
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <>
                    <ProductList products={products} />

                    {hasMore && (
                        <button
                            className="bg-[#212a2f] py-3.5 px-7 rounded-xl cursor-pointer mx-auto text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                            onClick={loadMoreProducts}
                        >
                            {loading ? "Carregando..." : "Carregar mais"}
                        </button>
                    )}
                </>
            )}
        </section>
    );
}
