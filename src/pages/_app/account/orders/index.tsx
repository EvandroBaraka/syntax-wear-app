import { createFileRoute } from "@tanstack/react-router";
import { formatCurrency } from "../../../../utils/format-currency";
import { useState } from "react";

type OrderStatus = "PAID" | "PENDING" | "CANCELLED";

interface OrderItem {
    id: number;
    productId: number;
    price: number;
    quantity: number;
    size: string;
    product: {
        id: number;
        name: string;
        images: string[];
    };
}

interface ShippingAddress {
    cep: number;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface OrderData {
    id: number;
    status: OrderStatus;
    total: number;
    userId: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    createdAt: string;
    items: OrderItem[];
}

interface Order {
    id: number;
    data: OrderData[];
    status: OrderStatus;
    limit: number;
    page: number;
    totalPages: number;
    createdAt: string;
}

async function getOrders(): Promise<Order> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Erro ao carregar pedidos.");
    }

    return response.json();
}

export const Route = createFileRoute("/_app/account/orders/")({
    loader: async () => {
        const data = await getOrders();
        return data;
    },
    component: OrderPage,
});

function OrderPage() {
    const orders: Order = Route.useLoaderData();
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    function toggleOrder(orderId: number) {
        setExpandedOrderId((currentOrderId) =>
            currentOrderId === orderId ? null : orderId,
        );
    }

    return (
        <main className="w-full flex-1 bg-[#F5F5F5] text-black mt-36">
            <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-6">
                <h1 className="text-2xl font-bold leading-8">Meus pedidos</h1>

                <div className="flex flex-col gap-4">
                    {orders.data.map((order) => (
                        <article
                            className="w-full cursor-pointer rounded-md border border-black bg-white p-4 transition-colors hover:bg-gray-50"
                            key={order.id}
                            onClick={() => toggleOrder(order.id)}
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    toggleOrder(order.id);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedOrderId === order.id}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-base font-bold leading-6">
                                        Pedido #{order.id}
                                    </span>
                                    {order.createdAt && (
                                        <span className="text-sm leading-5 text-[#6A7282]">
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString("pt-BR")}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col items-end gap-0.5 pb-0.5">
                                    <span className="text-base font-bold leading-6">
                                        {formatCurrency(order.total)}
                                    </span>
                                    <span
                                        className={`text-right text-sm leading-5 ${
                                            order.status === "PAID"
                                                ? "text-[#00A63E]"
                                                : order.status === "PENDING"
                                                  ? "text-[#D08700]"
                                                  : "text-[#E7000B]"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                    expandedOrderId === order.id
                                        ? "mt-4 grid-rows-[1fr] opacity-100"
                                        : "mt-0 grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="min-h-0 overflow-hidden">
                                <p className="text-sm text-[#6A7282]">
                                    Endereço de entrega:{" "}
                                    {order.shippingAddress.street},{" "}
                                    {order.shippingAddress.number}
                                    {order.shippingAddress.complement
                                        ? `, ${order.shippingAddress.complement}`
                                        : " - "}
                                    {order.shippingAddress.neighborhood},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.state},{" "}
                                    {order.shippingAddress.cep}
                                </p>
                                    <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                                        {order.items.map((item) => (
                                            <div
                                                className="flex items-center gap-3"
                                                key={item.id}
                                            >
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="h-16 w-16 object-cover"
                                                />
                                                <div className="flex flex-1 flex-col">
                                                    <span className="font-semibold">
                                                        {item.product.name}
                                                    </span>
                                                    <span className="text-sm text-[#6A7282]">
                                                        Quantidade:{" "}
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-sm text-[#6A7282]">
                                                        Tamanho: {item.size}
                                                    </span>
                                                </div>
                                                <span className="font-bold">
                                                    {formatCurrency(item.price)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
