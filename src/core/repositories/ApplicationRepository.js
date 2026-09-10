import apiClient from '../apiClient';

export const ApplicationRepository = {
    async submit(applicationData) {
        const response = await apiClient.post('/applications', applicationData);
        return response.data;
    }
};
