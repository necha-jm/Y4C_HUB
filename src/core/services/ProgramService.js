import { ProgramRepository } from '../repositories/ProgramRepository';

export const ProgramService = {
    async getPrograms() {
        return await ProgramRepository.getAll();
    },
    async getProgram(id) {
        return await ProgramRepository.getById(id);
    }
};
