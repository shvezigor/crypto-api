
import express from 'express';
import {deleteSubscription, homePage, verifyDomain} from "../controllers/site-controller.js";
import {
    minedTransaction,
    tokensTransactionsConfirmed,
    creatNewAccount,
    deleteSubscribeByAccount
} from "../controllers/web-hook.js";
export const router = express.Router();


router.get('/', homePage);
router.get('/cryptoapisverifydomain', verifyDomain);

router.post('/api/v1/crypt/account', creatNewAccount);

router.post('/api/v1/crypt/minedTransaction', minedTransaction);
router.post('/api/v1/crypt/tokensTransactionsConfirmed', tokensTransactionsConfirmed);


router.post('/api/v1/crypt/deletedTransaction', deleteSubscribeByAccount);




