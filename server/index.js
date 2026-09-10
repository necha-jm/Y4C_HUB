import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { UserRepository } from './repositories/UserRepository.js';
import { ProgramRepository } from './repositories/ProgramRepository.js';
import { ApplicationRepository } from './repositories/ApplicationRepository.js';
import { AuthService } from './services/AuthService.js';
import { ProgramService } from './services/ProgramService.js';
import { ApplicationService } from './services/ApplicationService.js';
import { AuthController } from './controllers/AuthController.js';
import { ProgramController } from './controllers/ProgramController.js';
import { ApplicationController } from './controllers/ApplicationController.js';
import authRoutes from './routes/auth.js';
import programRoutes from './routes/programs.js';
import applicationRoutes from './routes/applications.js';

const app = express();
const port = 5000;

app.use(cors()); // Allow all origins for development
app.use(express.json());

// Initialize Repositories
const userRepository = new UserRepository();
const programRepository = new ProgramRepository();
const applicationRepository = new ApplicationRepository();

// Initialize Services
const authService = new AuthService(userRepository);
const programService = new ProgramService(programRepository);
const applicationService = new ApplicationService(applicationRepository);

// Initialize Controllers
const authController = new AuthController(authService);
const programController = new ProgramController(programService);
const applicationController = new ApplicationController(applicationService);

// Routes
app.use('/api/auth', authRoutes(authController));
app.use('/api/programs', programRoutes(programController));
app.use('/api/applications', applicationRoutes(applicationController));

app.get('/', (req, res) => {
    res.send('Y4C Innovation Lab API');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
