import express from 'express';
const router = express.Router();

export default (applicationController) => {
    router.post('/', (req, res) => applicationController.submit(req, res));
    return router;
};
