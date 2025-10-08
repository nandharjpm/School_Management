import express from 'express';
import { registerUser } from '../controllers/registerController.js';
import { emailVerification } from '../controllers/verificationController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email', emailVerification);

export default router;
