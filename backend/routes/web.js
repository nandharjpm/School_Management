import express from 'express';
import { registerUser } from '../controllers/registerController.js';
import { emailVerification } from '../controllers/verificationController.js';
import {authenticationController} from '../controllers/authenticationController.js'
import {locationMasterController} from '../controllers/master/locationMasterController.js'

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email', emailVerification);
router.post('/login', authenticationController);

// location Master
router.post('/location-submit', locationMasterController.storeLocation);
router.get('/location', locationMasterController.getLocation);
router.get('/get-location/:id', locationMasterController.getLocationView)
router.get('/edit-location/:id', locationMasterController.getLocationEdit)
router.post('/location-editSubmit', locationMasterController.UpdateLocation)
router.post('/delete-location/:id', locationMasterController.DeleteLocation);


export default router;
