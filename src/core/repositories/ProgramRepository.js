import apiClient from '../apiClient';

export const ProgramRepository = {
    async getAll() {
        const response = await apiClient.get('/programs');
        return response.data;
    },
    async getById(id) {
        const response = await apiClient.get(`/programs/${id}`);
        return response.data;
    }
};
