import express from 'express';
import { registerUser } from '../controllers/registerController.js';
import { emailVerification } from '../controllers/verificationController.js';
import {authenticationController} from '../controllers/authenticationController.js'

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email', emailVerification);
router.post('/login', authenticationController);

export default router;
