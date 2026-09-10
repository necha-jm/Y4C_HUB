import express from 'express';
const router = express.Router();

export default (programController) => {
    router.get('/', (req, res) => programController.getAll(req, res));
    router.get('/:id', (req, res) => programController.getById(req, res));
    return router;
};
