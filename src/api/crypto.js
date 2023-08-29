
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
    return axios.delete(url,
        { headers }  )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}