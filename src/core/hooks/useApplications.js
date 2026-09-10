import { useMutation } from '@tanstack/react-query';
import { ApplicationService } from '../services/ApplicationService';

export const useSubmitApplication = () => {
    return useMutation({
        mutationFn: (applicationData) => ApplicationService.apply(applicationData),
    });
};
