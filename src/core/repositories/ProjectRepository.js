import apiClient from '../apiClient';

export const ProjectRepository = {
    async submitApplication(formData) {
        // Since we might have a PDF, we should use multipart/form-data
        // But for simplicity if the backend handles JSON and base64 or just URLs, we use that.
        // However, standard is multipart for files.
        const response = await apiClient.post('/projects/apply', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    async getPending() {
        const response = await apiClient.get('/projects/pending');
        return response.data;
    }
};
