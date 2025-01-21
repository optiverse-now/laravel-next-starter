import useSWR from 'swr';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthProps {
    middleware?: 'auth' | 'guest';
    redirectIfAuthenticated?: string;
}

interface RegisterProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: any) => void;
}

interface LoginProps {
    email: string;
    password: string;
    remember: boolean;
    setErrors: (errors: any) => void;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
    const router = useRouter();

    const { data: user, error, mutate } = useSWR('/api/v1/auth/me', () =>
        axios
            .get('/api/v1/auth/me')
            .then(res => res.data.user)
            .catch(error => {
                if (error.response?.status !== 409) {
                    if (middleware === 'auth') {
                        router.push('/login');
                    }
                    return null;
                }
                router.push('/verify-email');
            }),
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        try {
            await csrf();
            setErrors([]);
            const response = await axios.post('/api/v1/auth/register', props);
            mutate();
            return response;
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
            throw error;
        }
    };

    const login = async ({ setErrors, ...props }: LoginProps) => {
        try {
            await csrf();
            setErrors([]);
            const response = await axios.post('/api/v1/auth/login', props);
            mutate();
            return response;
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post('/api/v1/auth/logout');
            mutate(null, false);
            window.location.pathname = '/login';
            return response;
        } catch (error) {
            window.location.pathname = '/login';
            throw error;
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }

        if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated || '/dashboard');
        }

        if (middleware === 'auth' && error) {
            logout();
        }
    }, [user, error]);

    return {
        user,
        register,
        login,
        logout,
    };
};
