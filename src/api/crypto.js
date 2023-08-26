
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const createSubscriptionTokensTransactionsConfirmed = async (blockchain, network, params) => {
   return axios.post(process.env.API_SERVER + `/blockchain-events/${blockchain}/${network}/subscriptions/address-tokens-transactions-confirmed`, params)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
}