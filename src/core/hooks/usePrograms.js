import { useQuery } from '@tanstack/react-query';
import { ProgramService } from '../services/ProgramService';

export const usePrograms = () => {
    return useQuery({
        queryKey: ['programs'],
        queryFn: () => ProgramService.getPrograms(),
    });
};

export const useProgram = (id) => {
    return useQuery({
        queryKey: ['programs', id],
        queryFn: () => ProgramService.getProgram(id),
        enabled: !!id,
    });
};
