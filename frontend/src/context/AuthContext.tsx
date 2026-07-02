import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Типы
interface User {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (err) {

                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);


    // Функция входа
    const login = async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        
        const userResponse = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);
    };


    // Функция выхода
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };


        return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};


// Хук 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};