import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../services/apiClient";
import Router from "next/router";

type AuthProviderProps = {
    children: ReactNode;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    user: User;
    isAuthenticated: boolean;
};

type User = {
    email: string;
    permissions: string[];
    roles: string[];
};

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')
  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const isAuthenticated = !!user;
    const router = useRouter();

    useEffect(() => {
      authChannel =  new BroadcastChannel('auth');

      authChannel.onmessage = (message) => {
        switch (message.data) {
          case 'signOut':
            destroyCookie(undefined, 'nextauth.token');
            destroyCookie(undefined, 'nextauth.refreshToken');
            Router.push('/dashboard');
            authChannel.close();
            break;
          case 'signIn':
            Router.push('/dashboard');
            authChannel.close();
            break;
          default:
            break;
        }
      }
    }, [])

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { email, permissions, roles } = response.data

                setUser({ email, permissions, roles})
            })
            .catch(() => {
              signOut();
            })
        }

    }, []);

    async function signIn({email, password}: SignInCredentials): Promise<void> {

        try {
            const response = await api.post('/sessions', {
                email,
                password,
            })

            const {token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });

            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            });

            setUser({
                email,
                permissions,
                roles
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            router.push('/dashboard');
            authChannel.postMessage("signIn");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

