import { Router } from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddelware.js";

const router = Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.get('/top', getTopProducts);
router.post('/:id/reviews', protect, admin, createProductReview)
router.get('/:id', getProductById);
router.put('/:id', protect, admin, updateProduct);
router.post('/:id', protect, admin, deleteProduct);




export default router;