export class ProgramService {
    constructor(programRepository) {
        this.programRepository = programRepository;
    }

    async getAllPrograms() {
        return await this.programRepository.readAll();
    }

    async getProgramById(id) {
        return await this.programRepository.findById(id);
    }

    async createProgram(programData) {
        return await this.programRepository.create(programData);
    }
}
