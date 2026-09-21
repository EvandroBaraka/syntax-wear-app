import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const loginFormSchema = z.object({
        email: z.email("E-mail inválido"),
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    });

    type LoginFormData = z.infer<typeof loginFormSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        
        try {
            await login(data);
            navigate({ to: "/" });

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocorreu um erro desconhecido ao fazer login.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="flex flex-col gap-3.5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="border rounded-[1px] border-gray-200 w-full text-black p-3"
                type="email"
                placeholder="E-mail"
                {...register("email")}
            />
            {errors.email && (
                <span className="text-red-500 text-sm">
                    {errors.email.message}
                </span>
            )}

            <input
                className="border rounded-[1px] border-gray-200 w-full text-black p-3"
                type="password"
                placeholder="Senha"
                {...register("password")}
            />
            {errors.password && (
                <span className="text-red-500 text-sm">
                    {errors.password.message}
                </span>
            )}

            {error && (
                <span className="text-red-500 text-sm text-center">
                    {error}
                </span>
            )}
            <button
                className="bg-[#212A2F] w-full p-3.5 rounded-[1px] cursor-pointer text-white disabled:opacity-60
                disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Processando..." : "Continuar"}
            </button>
        </form>
    );
};
