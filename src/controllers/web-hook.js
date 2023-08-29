
import {get, insert, update} from "../models/account.js";
import {getTransaction, insertTransaction} from "../models/transactions.js";
import {createSubscriptionTokensTransactionsConfirmed } from "../api/crypto.js";
import {sendTransaction} from "../api/exwallet.js";

import dotenv from 'dotenv';
dotenv.config();

export const  minedTransaction = async (req, res)=>{
    try {
        console.log("minedTransaction", req.body)
        console.log("minedTransaction", req.body.data)
        console.log("minedTransaction", req.body.data.item.transactionId)


        //let result = {};

        res.json(req.body.data.item.transactionId);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const  tokensTransactionsConfirmed = async (req, res)=>{
    try {
        console.log("minedTransaction", req.body)
        console.log("minedTransaction", req.body.data)
        console.log("minedTransaction", req.body.data.item.transactionId)

       const address = req.body.data.item.address;
       const transactionId = req.body.data.item.transactionId;

       console.log("address", address)
       console.log("transactionId", transactionId)

       if (transactionId){
           let  data = await getTransaction(transactionId);
           if (data.length === 0) {
               /*const result = await insertTransaction(transactionId, address);
               if (result){
                   const resAccount= await get(address);
                   console.log("resAccount", resAccount)
                   await sendTransaction(transactionId, resAccount[0].callbackUrl);
               }*/
           }
       }

        res.json(req.body.data.item.transactionId);
    }catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const creatNewAccount = async (req, res)=>{
    try {
        console.log('Running get Accounts', req.body);
        let account = req.body.id;
        let callbackUrl = req.body.callback_url;
        let message = "";
        let code = 200;
        const result = await get(account);
        if (result.length === 0) {
            let res = await insert(account, callbackUrl);
            if (res.affectedRows === 1){
                console.log("result", res);
                const params = {
                    "context": "address-tokens-transactions-confirmed-each-confirmation",
                    "data": {
                        "item": {
                            "address": account,
                            "allowDuplicates": true,
                            "callbackSecretKey": process.env.CALLBACK_SECRERKEY,
                            "callbackUrl": process.env.CALLBACK_URL,
                            "receiveCallbackOn": 2
                        }
                    }
                }
                let resultRequest = await createSubscriptionTokensTransactionsConfirmed("tron", "mainnet", params);
                console.log("result", resultRequest.status);
                if (resultRequest.status === 201){
                    const referenceId = resultRequest.data.data.item.referenceId;
                    await update(account, referenceId);
                    message = `The account ${account} has been added successfully`;
                }else {
                    code = 400;
                    message = `The webhook for ${account} has not been created`;
                }

            }else {
                code = 400;
                message = `The account ${account} has not been added`;
            }

        }else {
            code = 400;
            message = `No account ${account} has been added`;
        }

        const response = {
            code: code,
            data: message
        };

        res.json(response);

    } catch (e) {
        console.log(e.message);
        const response = {
            code: 500,
            data: "Bad request" + e.message
        };
        res.json(response);
    }
}