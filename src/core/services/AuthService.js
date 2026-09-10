import { AuthRepository } from '../repositories/AuthRepository';

export const AuthService = {
    async login(email, password) {
        const user = await AuthRepository.login(email, password);
        localStorage.setItem('y4c_user', JSON.stringify(user));
        return user;
    },
    async register(userData) {
        const user = await AuthRepository.register(userData);
        localStorage.setItem('y4c_user', JSON.stringify(user));
        return user;
    },
    async logout() {
        await AuthRepository.logout();
        localStorage.removeItem('y4c_user');
    },
    getCurrentUser() {
        try {
            const user = localStorage.getItem('y4c_user');
            if (!user || user === 'undefined' || user === 'null') return null;
            return JSON.parse(user);
        } catch (error) {
            console.error('Error parsing user from localStorage', error);
            localStorage.removeItem('y4c_user');
            return null;
        }
    }
};
