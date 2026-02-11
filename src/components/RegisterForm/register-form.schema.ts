import { z } from "zod"
import { isValidCPF } from "../../utils/cpf-validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const registerUserFormSchema = z.object({
    firstName: z
        .string()
        .nonempty("Primeiro nome é obrigatório"),

    lastName: z
        .string()
        .nonempty("Último nome é obrigatório"),

    email: z
        .email("E-mail inválido"),

    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    confirmPassword: z
        .string()
        .nonempty("Confirmação de senha é obrigatória"),

    cpf: z
        .string()
        .nonempty("CPF é obrigatório")
        .refine(isValidCPF, {
            message: "CPF inválido",
        }),

    birthDate: z
        .string()
        .nonempty("Data de nascimento é obrigatória")
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data de nascimento inválida",
        }),

    phone: z.string().nonempty("Telefone é obrigatório")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });


// Tipo inferido automaticamente
type RegisterFormData = z.infer<typeof registerUserFormSchema>;

export const useRegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerUserFormSchema),
        mode: 'onBlur',
        defaultValues: {
            email: "",
            password: ""
        },
        criteriaMode: "all",
    });

    return {
        handleSubmit,
        register,
        errors,
        isSubmitting,
        setError,
        reset
    }
}