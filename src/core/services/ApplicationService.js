import { ApplicationRepository } from '../repositories/ApplicationRepository';

export const ApplicationService = {
    async apply(applicationData) {
        return await ApplicationRepository.submit(applicationData);
    }
};
