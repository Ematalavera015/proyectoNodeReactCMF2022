import Router from 'express';
import { upload, uploadsConfig } from '../controllers/uploadController.js';
import { uploads3, uploadsConfigs3 } from '../controllers/uploads3Controller.js';
import { admin, protect } from '../middlewares/authMiddelware.js';

const router = Router()

router.post('/', protect, admin, uploadsConfig.single('file'), upload);
router.post('/aws', protect, admin, uploadsConfigs3, uploads3)

export default router;