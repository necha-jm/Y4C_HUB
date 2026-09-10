export class ProgramController {
    constructor(programService) {
        this.programService = programService;
    }

    async getAll(req, res) {
        const programs = await this.programService.getAllPrograms();
        res.json(programs);
    }

    async getById(req, res) {
        const program = await this.programService.getProgramById(req.params.id);
        if (program) {
            res.json(program);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    }
}
