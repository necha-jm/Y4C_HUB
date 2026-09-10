import apiClient from '../apiClient';

export const AuthRepository = {
    async login(email, password) {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data;
    },
    async register(userData) {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },
    async logout() {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    }
};
