import axios from 'axios';
import dotenv from 'dotenv';
import {getTransaction, updateTransaction} from "../models/transactions.js";

dotenv.config();

export const sendTransaction = async (id, url) => {
    try {
        console.log('running send');
        let params = {
            "id": id
        }
        const response = await sendData(url, params);
        console.log('status', response.status);
        if (response.status === 200) {
            console.log("updateTransaction", id);
            await updateTransaction(id);
            return true;
        }

        return false;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

function sendData(url, params) {
    return axios.post(process.env.API_SERVER + '/wallet-bscgate/webhook/qfjn3fc8wc9j2djska', params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

