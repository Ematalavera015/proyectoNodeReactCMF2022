import { Router } from "express";
import userRouter from './userRoutes.js';
import orderRouter from './orderRoutes.js';
import productRouter from './productRoutes.js';
import uploadRouter from './uploadRoutes.js'
import config from "../config/index.js";

const router = Router();

router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/upload', uploadRouter);
router.use('/config/paypal', (req, res) => res.send(config.payPal));

export default router;