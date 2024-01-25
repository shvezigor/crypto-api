import {get, insert, update} from "../models/account.js";
import {getTransaction, insertTransaction} from "../models/transactions.js";
import {createSubscriptionConfirm, deleteSubscriptions} from "../api/crypto.js";
import {sendTransaction} from "../api/exwallet.js";

import dotenv from 'dotenv';

dotenv.config();

export const minedTransaction = async (req, res) => {
    try {
        console.log("minedTransaction", req.body)
        console.log("minedTransaction", req.body.data)
        console.log("minedTransaction", req.body.data.item.transactionId)


        //let result = {};

        res.json(req.body.data.item.transactionId);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const tokensTransactionsConfirmed = async (req, res) => {
    try {
        //console.log("body", req.body)
        //console.log("data", req.body.data)
        //console.log("transactionId", req.body.data.item.transactionId)


        const transactionId = req.body.data.item.transactionId;
        console.log("transactionId", transactionId)
        const address = req.body.data.item.address;
        console.log("address", address)

        if (transactionId) {
            try {
                console.log("----transactionId", transactionId)
                let data = await getTransaction(transactionId);
                console.log("data", data)
                if (data.length === 0) {
                    const resAccount = await get(address);
                    const callbackURL = resAccount[0].callback_url;
                    console.log("callbackURL", callbackURL);
                    if (callbackURL) {
                        await sendTransaction(transactionId, address, callbackURL);
                    }
                }
            } catch (e) {
                console.log("Error getTransaction", e)
                const resAccount = await get(address);
                const callbackURL = resAccount[0].callback_url;
                console.log("callbackURL", callbackURL);
                if (callbackURL) {
                    await sendTransaction(transactionId, address, callbackURL);
                }
            }
        }
        res.json(req.body.data.item.transactionId);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const tokensTransactionsEachConfirmed = async (req, res) => {
    try {
        console.log("body", req.body)
        console.log("data", req.body.data)
        console.log("transactionId", req.body.data.item.transactionId)

        const address = req.body.data.item.address;
        const transactionId = req.body.data.item.transactionId;
        const callbackSecretKey = req.body.data.item.callbackSecretKey

        console.log("address", address)
        console.log("transactionId", transactionId)
        //console.log("callbackSecretKey", callbackSecretKey)
        //console.log("CALLBACK_SECRETKEY", process.env.CALLBACK_SECRETKEY)

        if (transactionId && (callbackSecretKey === process.env.CALLBACK_SECRETKEY)) {
            let data = await getTransaction(transactionId);
            console.log("data", data)
            if (data.length === 0) {
                const resAccount = await get(address);
                const callbackURL = resAccount[0].callback_url;
                console.log("callbackURL", callbackURL);
                if (callbackURL) {
                    await sendTransaction(transactionId, callbackURL);
                }
            }
        }

        res.json(req.body.data.item.transactionId);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export const creatNewAccount = async (req, res) => {
    try {
        console.log('Running get Accounts', req.body);
        let account = req.body.id;
        let callbackUrl = req.body.callback_url;
        let message = "";
        let code;
        let result;
        console.log('account', account);

        try {
            result = await get(account);
        } catch (e) {
            console.log("Error check account", e);
        }

        console.log('account', account);
        console.log('result find account', result);

        if (result.length === 0) {
            let res = await insert(account, callbackUrl);
            console.log('res insert account', res);
            if (res.affectedRows === 1) {
                console.log("result", res);
                const params = {
                    "context": "address-tokens-transactions-confirmed-each-confirmation",
                    "data": {
                        "item": {
                            "address": account,
                            "allowDuplicates": true,
                            "callbackSecretKey": process.env.CALLBACK_SECRETKEY,
                            "callbackUrl": process.env.CALLBACK_URL,
                            "receiveCallbackOn": 2
                        }
                    }
                }
                await createSubscriptionConfirm(account, "tron", "mainnet", params);
                code = 200;
                message = `The account ${account} has been added successfully`;
            } else {
                code = 400;
                message = `The account ${account} has not been added`;
            }

        } else {
            code = 400;
            message = `The address ${account} has already been added before`;
            console.log(message);
        }

        const response = {
            code: code,
            data: message
        };

        console.log(response);

        res.json(response);

    } catch (e) {
        console.log(e.message);
        const response = {
            code: 500,
            data: "Bad request " + e.message
        };
        res.json(response);
    }
}

export const deleteSubscribeByAccount = async (req, res) => {
    try {
        console.log('Running delete Subscribe By Account', req.body);
        let referenceId = req.body.id;
        let code = 200;
        console.log('account', account);

        let message = "";
        console.log('account', account);
        console.log('result find account', result);

        deleteSubscriptions("tron", "mainnet", referenceId);
        message = `The account ${account} has been deleted successfully`;

        const response = {
            code: code,
            data: message
        };

        console.log(response);

        res.json(response);

    } catch (e) {
        console.log(e.message);
        const response = {
            code: 500,
            data: "Bad request " + e.message
        };
        res.json(response);
    }
}



