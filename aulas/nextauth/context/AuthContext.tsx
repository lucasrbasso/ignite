import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/api";

type AuthProviderProps = {
    children: ReactNode;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const isAuthenticated = false;
    
    async function signIn({email, password}: SignInCredentials): Promise<void> {

        try {
            const response = await api.post('/sessions', {
                email,
                password,
            })

            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

