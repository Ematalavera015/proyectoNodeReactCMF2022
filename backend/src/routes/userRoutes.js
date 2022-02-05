import { Router } from "express";
import { nodeMailer } from "../controllers/nodemailerController.js";
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUserProfile, updateUser } from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddelware.js";

const router = Router()

router.post('/', registerUser, nodeMailer);
router.get('/', protect, admin, getUsers);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.patch('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);


export default router;