import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductList } from "../../../../components/ProductList";
import { getProductByCategoryId } from "../../../../services/productService";
import { getCategoryByName } from "../../../../services/categoryService";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../../../interfaces/products";
import { LoadSpinner } from "../../../../components/LoadSpinner";

export const Route = createFileRoute("/_app/products/category/$category")({
    loader: async ({ params }) => {
        const category = await getCategoryByName(params.category);

        return { category };
    },
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Produtos - SyntaxWear" }],
    }),
    notFoundComponent: () => {
        return (
            <section className="container flex flex-col items-center justify-center pt-44 text-center text-black">
                <h1 className="text-3xl font-bold mb-4">
                    Categoria não encontrada
                </h1>
                <Link to="/products" className="underline">
                    Voltar para produtos
                </Link>
            </section>
        );
    },
});

function RouteComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { category } = Route.useLoaderData();

    const hasFetchedInitialProducts = useRef(false);

    async function loadMoreProducts() {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const filteredProducts = await getProductByCategoryId(category.id, {
                page,
            });

            setProducts((prev) => [...prev, ...filteredProducts.data]);

            if (filteredProducts.data.length < filteredProducts.limit) {
                setHasMore(false);
            } else {
                setPage((prev) => prev + 1);
            }
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
        <section className="container flex flex-col items-center pt-44 md:pt-54 pb-10 md:px-10 mb-10 text-black min-h-[80vh]">
            <h1 className="text-3xl text-center mb-3">Lista de Produtos</h1>

            <h2 className="text-center mb-10 p-4">
                Conforto exepcional para suas aventuras do dia-a-dia
            </h2>
            {loading && products.length === 0 ? (
                <LoadSpinner />
            ) : products.length === 0 ? (
                <>
                    <p className="text-center text-gray-500 mb-6">
                        Nenhum produto encontrado para a categoria "
                        {category.name}".
                    </p>
                    <Link
                        to="/products"
                        className="text-accent hover:text-accent-hover underline"
                    >
                        Voltar para produtos
                    </Link>
                </>
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
