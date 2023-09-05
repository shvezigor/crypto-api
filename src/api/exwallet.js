import axios from 'axios';
import dotenv from 'dotenv';
import {getTransaction, insertTransaction} from "../models/transactions.js";

dotenv.config();

export const sendTransaction = async (id, account, url) => {
    try {
        console.log('running send');
        let params = {
            "id": id
        }
        const response = await sendData(url, params);
        console.log('status', response.status);
        if (response.status === 200) {
            console.log("insertTransaction", id);
            await insertTransaction(id, account);
            return true;
        }

        return false;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

function sendData(url, params) {
    return axios.post(url, params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

