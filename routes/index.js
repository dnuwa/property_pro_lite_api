import { Router } from 'express';
import authRouter from './auth';


const prefix = '/api/v1';

const router = Router();
router.use(prefix, authRouter);

module.exports = router;
