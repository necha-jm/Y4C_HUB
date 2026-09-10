import express from 'express';
const router = express.Router();

export default (authController) => {
    router.post('/login', (req, res) => authController.login(req, res));
    router.post('/register', (req, res) => authController.register(req, res));
    router.post('/logout', (req, res) => authController.logout(req, res));
    return router;
};
