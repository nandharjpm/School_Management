import express from 'express';
import { registerUser } from '../controllers/registerController.js';
import { emailVerification } from '../controllers/verificationController.js';
import {authenticationController} from '../controllers/authenticationController.js'
import {locationMasterController} from '../controllers/master/locationMasterController.js'
import { collegeMasterController } from '../controllers/master/collegeMasterController.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify-email', emailVerification);
router.post('/login', authenticationController);

// location Master
router.get('/location', locationMasterController.getLocation);
router.post('/location-submit', locationMasterController.storeLocation);
router.get('/get-location/:id', locationMasterController.getLocationView)
router.get('/edit-location/:id', locationMasterController.getLocationEdit)
router.post('/location-editSubmit', locationMasterController.UpdateLocation)
router.post('/delete-location/:id', locationMasterController.DeleteLocation);

// college Master
router.get('/college', collegeMasterController.getCollege);
router.post('/college-submit', collegeMasterController.storeCollege);
router.get('/edit-college/:id', collegeMasterController.getCollegeEdit);
router.get('/college-edit-submit', collegeMasterController.updateCollege);


export default router;
