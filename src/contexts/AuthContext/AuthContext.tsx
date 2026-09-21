import { createContext, useContext } from "react";

export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    phone?: string;
    cpf?: string;
    birthDate?: string;
}

export type Credentials = {
	email: string;
    password: string;
}

export type RegisterInput = Credentials & {
    firstName: string;
    lastName: string;
    phone: string;
    cpf: string;
    birthDate: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
    // loading: boolean;
    // error: string | null;
	login: (credentials: Credentials) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = (): AuthContextType => useContext(AuthContext);
