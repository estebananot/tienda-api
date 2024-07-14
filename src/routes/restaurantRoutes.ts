import { Router } from 'express';
import { fetchRestaurants } from '../controllers/restaurantController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/restaurants', authenticate, fetchRestaurants);

export default router;
