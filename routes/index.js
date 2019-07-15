import { Router } from 'express';
import authRouter from './auth';
import adRouter from './ads';


const prefix = '/api/v1';

const router = Router();
router.use(prefix, authRouter);
router.use(prefix, adRouter);

module.exports = router;
