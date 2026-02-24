import { useState } from "react";
import { useCEPForm } from "./cep-form.schema";
import type { Address } from "../../interfaces/address";
import { formatCurrency } from "../../utils/format-currency";

const SHIPPING_BY_REGION: Record<string, number> = {
    Norte: 39.9,
    Nordeste: 29.9,
    "Centro-Oeste": 24.9,
    Sudeste: 14.9,
    Sul: 19.9,
};

export const CEPForm = () => {
    const { register, handleSubmit, errors, isSubmitting } = useCEPForm();
    const [address, setAddress] = useState<Address | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);

    const onSubmit = async ({ cep }: { cep: string }) => {
        setAddressError(null);
        setAddress(null);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setAddressError("CEP não encontrado.");
                return;
            }

            const shippingCost = SHIPPING_BY_REGION[data.regiao] || 49.9; // Custo padrão para regiões desconhecidas
            setAddress({ ...data, shippingCost });
        } catch (error) {
            setAddressError("Erro ao buscar o endereço. Tente novamente.");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex gap-3"
            >
                <div className="flex flex-col flex-1">
                    <input
                        {...register("cep")}
                        type="text"
                        inputMode="numeric"
                        placeholder="Digite seu CEP"
                        className={`border border-border rounded-md p-3 ${errors?.cep ? "border-error" : ""}`}
                    />
                    {errors?.cep && (
                        <span className="text-error text-sm mt-1">
                            {String(errors.cep.message)}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white py-3 px-6 rounded-md cursor-pointer hover:bg-gray-800 disabled:opacity-60"
                >
                    {isSubmitting ? "Calculando..." : "Calcular"}
                </button>
            </form>

            {addressError && (
                <div className="mt-4">
                <p className="text-error text-sm">{addressError}</p>
                </div>
            )}

            {address && (
                <div className="mt-4">
                    <p>
                        <strong>Região:</strong>{" "}
                        {address.regiao ? address.regiao : "Desconhecida"}
                    </p>
                    <p>
                        <strong>Custo de entrega:</strong>{" "}
                        {formatCurrency(address.shippingCost)}
                    </p>
                </div>
            )}
        </>
    );
};
