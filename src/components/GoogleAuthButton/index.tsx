import { useState } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export const GoogleAuthButton = () => {
    const [googleError, setGoogleError] = useState<string | null>(null);
    const [, setIsLoadingGoogle] = useState<boolean>(false);

    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = async (
        credentialResponse: CredentialResponse,
    ): Promise<void> => {
        const credentials = credentialResponse.credential;
        // Aqui você pode enviar o token para o backend para autenticação

        if (!credentials) {
            setGoogleError("Erro ao obter credenciais do Google");
            setIsLoadingGoogle(false);
            return;
        }

        setIsLoadingGoogle(true);
        setGoogleError(null);

        try {
            // Enviar o token para o backend
            await loginWithGoogle(credentials);
            navigate({ to: "/" }); // Redireciona para a página do dashboard após o login bem-sucedido
        } catch (error) {
            let errorMessage =
                "Erro ao fazer login com o Google. Tente novamente.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setGoogleError(errorMessage);
        } finally {
            setIsLoadingGoogle(false);
        }
    };

    const handleGoogleLoginError = (): void => {
        throw new Error("Function not implemented.");
    };

    return (
        <>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
            />

            {googleError && (
                <p className="mt-3.5 text-red-600 text-center">{googleError}</p>
            )}
        </>
    );
};
