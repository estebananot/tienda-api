import { Router } from 'express';
import { getTransactions } from '../controllers/transactionController';
import { authenticate } from '../middleware/authMiddleware';

const router: Router = Router();

router.get('/transactions', authenticate, getTransactions);

export default router;
