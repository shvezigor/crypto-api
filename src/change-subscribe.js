import {selectActiveAccounts} from "./models/account.js";
import {createSubscriptionConfirm, deleteSubscriptions} from "./api/crypto.js";
import dotenv from 'dotenv';

dotenv.config();

// Асинхронна функція для виклику selectActiveAccounts і обробки результатів
// c4134bc9-1495-4751-af29-3d02d4f54493
async function processActiveAccounts() {
    try {
        const accounts = await selectActiveAccounts();
        let delResSubscribe;
        // Перебираємо кожен аккаунт в отриманому результаті
        accounts.forEach(account => {
           // console.log(account); // Виведення інформації про кожен аккаунт

            ///delResSubscribe = deleteSubscriptions("tron", "mainnet", account.reference_id);
            delResSubscribe = deleteSubscriptions("tron", "mainnet", 'c4134bc9-1495-4751-af29-3d02d4f54493');
            console.log("delResSubscribe", delResSubscribe);

            const params = {
                "context": "address-tokens-transactions-confirmed-each-confirmation",
                "data": {
                    "item": {
                        "address": account.id,
                        "allowDuplicates": true,
                        "callbackSecretKey": process.env.CALLBACK_SECRETKEY,
                        "callbackUrl": process.env.CALLBACK_URL_2
                    }
                }
            }
            let resCreateSubscribe =  createSubscriptionConfirm(account, "tron", "mainnet", params);
            console.log("resCreateSubscribe", resCreateSubscribe);
        });
    } catch (error) {
        console.error('Error processing accounts:', error);
    }
}

// Виклик асинхронної функції
processActiveAccounts();