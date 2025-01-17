import { Router } from 'express';
import deliveryRoutes from './delivery';
// import transportRoutes from './transport';
// import trafficRoutes from './traffic';

const router: Router = Router();

router.use('/delivery', deliveryRoutes);
// router.use('/transport', transportRoutes);
// router.use('/traffic', trafficRoutes);

export default router;
