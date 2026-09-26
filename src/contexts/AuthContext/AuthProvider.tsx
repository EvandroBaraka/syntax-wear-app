import { useEffect, useState } from "react";
import {
    AuthContext,
    type User,
    type Credentials,
    type RegisterInput,
} from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/auth/profile`,
                    {
                        method: "GET",
                        credentials: "include", // faz com que o cookie seja enviado junto com a requisição
                    },
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar perfil do usuário");
                }

                const data = await response.json();

                setUser(data.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Erro ao buscar perfil do usuário:", error);
                setUser(null);
                setIsAuthenticated(false);
            }
        };

        fetchUserProfile();
    }, []);

    async function login(credentials: Credentials): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include", // faz com que o cookie seja enviado junto com a requisição
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao fazer login");
        }

        setUser(data.user);
        setIsAuthenticated(true);
    }

    async function registerNewUser(registerData: RegisterInput): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const userData = await response.json();

        if (!response.ok) {
            throw new Error(userData.message || "Erro ao se cadastrar");
        }

        setUser(userData.user);
        setIsAuthenticated(true);
    }

    async function logout(): Promise<void> {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    async function loginWithGoogle(credentials: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credentials }),
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
            throw new Error(data.message || "Erro ao fazer login com o Google");
        }

        setUser(data.user);
        setIsAuthenticated(true);
    }

    const value = {
        user,
        isAuthenticated,
        login,
        registerNewUser,
        logout,
        loginWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
