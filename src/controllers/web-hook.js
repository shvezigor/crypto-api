
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
        let code = 200;
        const result = await get(account);
        if (result.length === 0) {
            let result = await insert(account.toLocaleLowerCase());
            if (result.affectedRows === 1){
                console.log("result", result);
                message = `The account ${account} has been added successfully`;
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