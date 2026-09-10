export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async logout(req, res) {
        await this.authService.logout();
        res.json({ message: 'Logged out' });
    }
}
