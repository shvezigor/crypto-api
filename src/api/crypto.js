
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