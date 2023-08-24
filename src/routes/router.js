
import express from 'express';
import { homePage, verifyDomain } from "../controllers/site-controller.js";
import { minedTransaction } from "../controllers/web-hook.js";
export const router = express.Router();


router.get('/', homePage);
router.get('/cryptoapisverifydomain', verifyDomain);
router.post('/api/v1/crypt/minedTransaction', minedTransaction);



