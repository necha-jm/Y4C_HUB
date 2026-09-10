export class ApplicationService {
    constructor(applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    async submitApplication(applicationData) {
        const id = Date.now().toString();
        const application = {
            id,
            ...applicationData,
            status: 'pending',
            submittedAt: new Date().toISOString()
        };
        return await this.applicationRepository.create(application);
    }

    async getApplicationsByEmail(email) {
        const applications = await this.applicationRepository.readAll();
        return applications.filter(app => app.email === email);
    }
}
