import { Router } from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders} from "../controllers/orderController.js";
import { admin, protect } from "../middlewares/authMiddelware.js";

const router = Router()

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/pay', protect, admin, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.get('/:id', protect, admin, getOrderById);


export default router;