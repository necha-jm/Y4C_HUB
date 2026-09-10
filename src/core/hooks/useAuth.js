import { useState, useCallback } from 'react';
import { AuthService } from '../services/AuthService';

export const useAuth = () => {
    const [user, setUser] = useState(() => AuthService.getCurrentUser());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const loggedInUser = await AuthService.login(email, password);
            setUser(loggedInUser);
            return loggedInUser;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const registeredUser = await AuthService.register(userData);
            setUser(registeredUser);
            return registeredUser;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await AuthService.logout();
        setUser(null);
    }, []);

    return {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
};
