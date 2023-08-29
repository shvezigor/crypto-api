
import axios from 'axios';
import dotenv from 'dotenv';
import {getTransaction, updateTransaction} from "../models/transactions.js";
dotenv.config();

export const sendTransaction = async (id) => {
    try {
        console.log('running send');
        let  data = await getTransaction(id);
        if (data.length === 0) {
            let params = {
                "id": id
            }
            const response = await sendData(params);
            console.log('status', response.status);
            if (response.status === 200) {
                console.log("remove", id);
                await updateTransaction(id);
                return true;
            }
        }
        return false;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

function sendData(params) {
    return axios.post(process.env.API_SERVER + '/wallet-bscgate/webhook/qfjn3fc8wc9j2djska', params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

