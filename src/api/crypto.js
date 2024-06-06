
import axios from 'axios';
import dotenv from 'dotenv';
import {update} from "../models/account.js";
dotenv.config();

export const createSubscriptionConfirm = async (account, blockchain, network, params) => {
    let  message;
    let resultRequest = await createSubscriptionTokensTransactionsConfirmed(blockchain, network, params);
    console.log("result", resultRequest.status);
    if (resultRequest.status === 201) {
        const referenceId = resultRequest.data.data.item.referenceId;
        await update(account, referenceId);
        message = `The account ${account} has been added successfully`;
        console.log(message)
        return true;
    } else {
        message = `The webhook for ${account} has not been created`;
        console.log(message)
        return false;
    }
}


export const createSubscriptionTokensTransactionsConfirmed = async (blockchain, network, params) => {
    const headers = {
        "X-API-Key": process.env.API_KEYS,
        "Content-Type": "application/json"
    };

   const url = process.env.API_SERVER + `/blockchain-events/${blockchain}/${network}/subscriptions/address-tokens-transactions-confirmed`;
   return axios.post(url,
                     params,
              { headers }  )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            //console.log(error);
            return error;
        });
}

export const createSubscriptionTokensEachTransactionsConfirmed = async (blockchain, network, params) => {
    const headers = {
        "X-API-Key": process.env.API_KEYS,
        "Content-Type": "application/json"
    };

    const url = process.env.API_SERVER + `/blockchain-events/${blockchain}/${network}/subscriptions/address-coins-transactions-confirmed-each-confirmation`;
    return axios.post(url,
        params,
        { headers }  )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export const listSubscriptions = async (blockchain, network) => {
    const headers = {
        "X-API-Key": process.env.API_KEYS,
        "Content-Type": "application/json"
    };

    const url = process.env.API_SERVER + `/blockchain-events/${blockchain}/${network}/subscriptions`;
    return axios.get(url,
        { headers }  )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}

export const deleteSubscriptions = async (blockchain, network, referenceId) => {
    const headers = {
        "X-API-Key": process.env.API_KEYS,
        "Content-Type": "application/json"
    };

    const url = process.env.API_SERVER + `/blockchain-events/${blockchain}/${network}/subscriptions/${referenceId}`;
    console.log("url", url, headers);

    return axios.delete(url,
        { headers }  )
        .then(function (response) {
            console.log("response", response);
            return true;
        })
        .catch(function (error) {
           // console.log(error);
            return false;
        });
}