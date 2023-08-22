
import express from 'express';
import { homePage, verifyDomain } from "../controllers/site-controller.js";
//import { getDipLink, fileUpload, sharingDocuments } from '../controllers/diya-controller.js';
export const router = express.Router();


router.get('/', homePage);
router.get('/cryptoapisverifydomain', verifyDomain);
//router.get('/api/v1/crypt/getDipLink', getDipLink);
//router.post('/api/v1/crypt/fileUpload', fileUpload);
//router.post('/api/v1/crypt/sharingDocuments', sharingDocuments);


