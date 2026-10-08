import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import lockIcon from "../../assets/images/lock_icon.png";
import phoneIcon from "../../assets/images/phone-checkout.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import type { Address } from "../../interfaces/address";
import { formatCurrency } from "../../utils/format-currency";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import Decimal from "decimal.js";

const shippingAdressFormSchema = z.object({
    street: z.string().nonempty("Informe a rua"),
    number: z.coerce.number().min(1, "Informe o número"),
    complement: z.string().optional(),
    neighborhood: z.string().nonempty("Informe o bairro"),
    city: z.string().nonempty("Informe a cidade"),
    state: z.string().nonempty("Informe o estado"),
    cep: z.string().min(8, "CEP inválido").max(8, "CEP inválido"),
});

type ShippingAdressFormData = z.infer<typeof shippingAdressFormSchema>;

async function getCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await response.json();
}

const FRETE_POR_REGIAO: Record<string, number> = {
    Norte: 39.9,
    Nordeste: 29.9,
    "Centro-Oeste": 24.9,
    Sudeste: 14.9,
    Sul: 19.9,
};

interface OrderItem {
    productId: number;
    quantity: number;
    size?: string;
}

async function createStripeCheckout(
    items: OrderItem[],
    shippingAddress: ShippingAdressFormData,
    shippingCost: number,
    paymentMethod: string,
    userId: number,
) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stripe/checkout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items,
                shippingAddress,
                shippingCost,
                paymentMethod,
                userId,
            }),
        },
    );
    return await response.json();
}

export const Route = createFileRoute("/checkout/")({
    component: CheckoutPage,
});

function CheckoutPage() {
    const {
        register,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ShippingAdressFormData>({
        resolver: zodResolver(
            shippingAdressFormSchema,
        ) as unknown as Resolver<ShippingAdressFormData>,
        defaultValues: {
            street: "",
            number: 0,
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            cep: "",
        },
        mode: "onBlur",
    });

    const [address, setAddress] = useState<Address | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const cepValue = watch("cep");
    let subtotalPrice = new Decimal(0);
    cart.forEach((product) => {
        subtotalPrice = subtotalPrice.plus(
            new Decimal(product.price).times(product.quantity),
        );
    });

    useEffect(() => {
        if (cepValue.length !== 8) return;

        setIsSearching(true);

        async function fetchData() {
            try {
                const data = await getCep(cepValue);

                const shippingCost = FRETE_POR_REGIAO[data.regiao];

                setAddress({
                    ...data,
                    shippingCost,
                });

                setValue("street", data.logradouro);
                setValue("neighborhood", data.bairro);
                setValue("city", data.localidade);
                setValue("state", data.uf);
            } catch (error) {
                console.error("Erro ao buscar o CEP:", error);
            } finally {
                setIsSearching(false);
            }
        }
        fetchData();
    }, [cepValue, setValue]);

    const redirectToCheckout = async () => {
        if (!address || !user?.id) return;

        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        if (!stripePublicKey) return;

        const shippingData = getValues();
        const paymentMethod = "credit_card"; // Example payment method

        const items = cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.sizes[0],
        }));

        const { sessionId } = await createStripeCheckout(
            items,
            shippingData,
            address?.shippingCost || 0,
            paymentMethod,
            user?.id,
        );

        const stripe = await loadStripe(stripePublicKey);
        
        stripe?.redirectToCheckout({ sessionId });
        
        clearCart();
    };

    return (
        <div className="min-h-screen bg-[#ECE9E2] text-black">
            <header className="bg-white">
                <div className="container flex items-center justify-between py-6">
                    <Logo />

                    <div className="flex items-center gap-2 text-black">
                        <img src={lockIcon} alt="" />
                        <p>100% Seguro</p>
                    </div>
                </div>
            </header>

            <main className="container mx-auto grid grid-cols-1 items-start justify-between gap-8 px-3 pb-10 pt-10 lg:grid-cols-[minmax(0,684px)_322px]">
                <div className="flex flex-col gap-8">
                    <section className="flex flex-col gap-2 rounded-md bg-white p-4">
                        <h1 className="text-xl font-medium">Identificação</h1>
                        <div className="flex flex-col gap-1 text-sm text-gray-text">
                            <p>robertodias@gmail.com</p>
                            <p>Roberto Dias</p>
                        </div>
                        <div className="relative flex flex-col  min-h-20.5 gap-2 rounded-md border border-border bg-surface-alt ">
                            <div className="flex items-center mt-2 p-2 gap-2">
                                <img
                                    src={phoneIcon}
                                    alt=""
                                    className="h-7 w-7"
                                />
                                <div className="flex flex-col">
                                    <p className="text-xs leading-4">
                                        Antes de continuar, verifique se o
                                        telefone para contato está correto.
                                    </p>
                                    <p className="text-base font-medium">
                                        13 82382378
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded-b-md">
                                <button
                                    type="button"
                                    className="text-sm text-link underline"
                                >
                                    editar telefone
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="w-full max-w-171 space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-[20px] leading-7 font-medium text-[#333132]">
                                Informe seu endereço
                            </h3>

                            <form className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            placeholder="CEP"
                                            className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                            {...register("cep")}
                                        />
                                        <button
                                            type="button"
                                            className="h-11.5 rounded bg-black px-4 text-base leading-6 text-white"
                                            disabled={
                                                isSearching ||
                                                cepValue.length !== 8
                                            }
                                        >
                                            Buscar
                                        </button>
                                    </div>
                                    {errors.cep && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cep.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label
                                        className="text-base leading-6 text-black"
                                        htmlFor="street"
                                    >
                                        Endereço
                                    </label>
                                    <input
                                        id="street"
                                        type="text"
                                        placeholder="Endereço"
                                        className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                        {...register("street")}
                                    />
                                    {errors.street && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.street.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label
                                            className="text-base leading-6 text-black"
                                            htmlFor="number"
                                        >
                                            Número
                                        </label>
                                        <input
                                            id="number"
                                            type="number"
                                            placeholder="Número"
                                            className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                            {...register("number")}
                                        />
                                        {errors.number && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.number.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label
                                            className="text-base leading-6 text-black"
                                            htmlFor="complement"
                                        >
                                            Complemento
                                        </label>
                                        <input
                                            id="complement"
                                            type="text"
                                            placeholder="Complemento"
                                            className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                            {...register("complement")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label
                                        className="text-base leading-6 text-black"
                                        htmlFor="neighborhood"
                                    >
                                        Bairro
                                    </label>
                                    <input
                                        id="neighborhood"
                                        type="text"
                                        placeholder="Bairro"
                                        className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                        {...register("neighborhood")}
                                    />
                                    {errors.neighborhood && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.neighborhood.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label
                                            className="text-base leading-6 text-black"
                                            htmlFor="city"
                                        >
                                            Cidade
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            placeholder="Cidade"
                                            className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                            {...register("city")}
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.city.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label
                                            className="text-base leading-6 text-black"
                                            htmlFor="state"
                                        >
                                            Estado
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            placeholder="Estado"
                                            className="h-11.5 w-full rounded border border-[#D1D5DC] px-2 text-base text-black placeholder:text-black/50 bg-white"
                                            {...register("state")}
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.state.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {address && (
                            <section className="flex flex-col gap-4 rounded-md bg-white p-4">
                                <h2 className="text-xl font-medium text-text-secondary">
                                    Escolha a forma de entrega
                                </h2>
                                <label className="flex cursor-pointer items-start gap-4 rounded-lg border border-border p-4">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="Entrega rápida"
                                        className="mt-1 h-4 w-4 accent-black"
                                    />
                                    <span className="flex flex-1 flex-col gap-1">
                                        <span className="flex justify-between gap-4 text-base font-medium">
                                            <span>Entrega rápida</span>
                                            <span>
                                                {formatCurrency(
                                                    address.shippingCost,
                                                )}
                                            </span>
                                        </span>
                                        <span className="text-sm text-gray-text">
                                            Receba em até 5 dias úteis
                                        </span>
                                    </span>
                                </label>
                            </section>
                        )}
                    </section>
                </div>

                <aside className="w-full max-w-80.5 rounded-md bg-white flex flex-col h-[calc(100dvh-116px)]">
                    <div className="flex-1 flex flex-col px-5 pt-5 overflow-hidden">
                        <h2 className="text-2xl leading-8 font-medium text-[#585858] mb-4">
                            Resumo do pedido
                        </h2>

                        <div className="flex-1 overflow-y-auto pr-5 border-r border-[#B3B3B3]">
                            <ul className="space-y-4">
                                {cart.map((product) => (
                                    <li
                                        key={product.id}
                                        className="border-b border-[#B3B3B3] pb-4"
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                alt={product.name}
                                                className="h-16 w-16"
                                                src={product.images[0]}
                                            />
                                            <div>
                                                <p className="pb-1 text-sm leading-5 text-black">
                                                    {product.name}
                                                </p>
                                                <p className="pb-1 text-xs leading-4 text-black">
                                                    Quantidade:{" "}
                                                    {product.quantity}
                                                </p>
                                                <p className="text-base leading-6 text-black">
                                                    <span className="font-medium">
                                                        {formatCurrency(
                                                            product.price *
                                                                product.quantity,
                                                        )}
                                                    </span>{" "}
                                                    à vista
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#F3F4F6] px-5 py-3">
                        <div className="flex items-center justify-between text-sm leading-5 text-[#252525]">
                            <p>Subtotal</p>
                            <p className="font-medium">
                                {formatCurrency(subtotalPrice.toNumber())}
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-sm leading-5 text-[#252525]">
                            <p>Frete</p>
                            <p>
                                {address
                                    ? formatCurrency(address.shippingCost)
                                    : "A calcular"}
                            </p>
                        </div>
                        <div className="flex items-center justify-between pb-3 text-sm leading-5 text-[#252525]">
                            <p>Total</p>
                            <p className="font-medium">
                                {formatCurrency(
                                    subtotalPrice.toNumber() +
                                        (address ? address.shippingCost : 0),
                                )}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="w-full cursor-pointer rounded-lg bg-black py-3 text-base leading-6 text-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!address}
                            onClick={redirectToCheckout}
                        >
                            Fechar pedido
                        </button>
                    </div>
                </aside>
            </main>

            <footer className="bg-white p-4">
                <p className="text-[#4A5565] text-center">
                    Preços e condições exclusivos para o site www.iplace.com.br
                    e para o televendas, podendo sofrer alterações sem prévia
                    notificação. Global Distribuição de Bens de Consumo LTDA /
                    www.iplace.com.br / BR 116, km 223,5, Nº 7350 / Dois Irmãos
                    - RS / CEP 93950-000 / CNPJ: 89.237.911/0001-40
                </p>
            </footer>
        </div>
    );
}
