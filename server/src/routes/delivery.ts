import { Router } from 'express';
import { getDeliveryStations, createOrder } from '../controllers/deliveryController';

const router: Router = Router();

router.get('/stations', getDeliveryStations);
router.post('/order', createOrder);

export default router;
