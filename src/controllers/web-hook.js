
import { get, insert } from "../models/account.js";

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

export const creatNewAccount = async (req, res)=>{
    try {
        console.log('Running get Accounts', req.body);
        let account = req.body.id;
        let message = "";
        const result = await get(account);
        if (result.length === 0) {
            await insert(account.toLocaleLowerCase());
            message = `The account ${account} has been added successfully`;
        }else {
            message = `No account ${account} has been added`;
        }

        const response = {
            code: 200,
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