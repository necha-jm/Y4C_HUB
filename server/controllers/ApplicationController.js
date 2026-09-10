export class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }

    async submit(req, res) {
        try {
            const application = await this.applicationService.submitApplication(req.body);
            res.status(201).json(application);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
