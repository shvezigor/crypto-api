 import {selectActiveAccounts, get } from "./models/account.js";
import { createSubscriptionConfirm, deleteSubscriptions } from "./api/crypto.js";
import dotenv from 'dotenv';

dotenv.config();

// Асинхронна функція для виклику selectActiveAccounts і обробки результатів
async function processActiveAccounts() {
    try {
        const id = process.argv[1];
        //const accounts = await selectActiveAccounts();
        const accounts = await get(id);
        console.log("get accounts by id", accounts);
        // Використовуємо Promise.all для паралельного виконання асинхронних дій
        await Promise.all(accounts.map(async (account) => {
            try {
                // Виконання deleteSubscriptions асинхронно і чекаємо результат
                console.log("reference_id", account.reference_id);
                const delResSubscribe = await deleteSubscriptions("tron", "mainnet", account.reference_id);
                //const delResSubscribe = await deleteSubscriptions("tron", "mainnet", "T9zpXuXYYJHi8K9t4pcTQupVSFizcJSaet");
                //console.log("delResSubscribe", delResSubscribe);

                const params = {
                    "context": "address-tokens-transactions-confirmed-each-confirmation",
                    "data": {
                        "item": {
                            "address": account.id,
                            "allowDuplicates": true,
                            "callbackSecretKey": process.env.CALLBACK_SECRETKEY,
                            "callbackUrl": "https://node-service.bettertransfer.io/api/v1/crypt/tokensTransactionsConfirmed"
                        }
                    }
                };
                console.log("params", params);
                // Виконання createSubscriptionConfirm асинхронно і чекаємо результат
                const resCreateSubscribe = await createSubscriptionConfirm(account.id, "tron", "mainnet", params);
                console.log("resCreateSubscribe", resCreateSubscribe.data);
                //const referenceId = resCreateSubscribe.data.data.item.referenceId;
                //update(account.id,referenceId);
            } catch (err) {
                console.error(`Error processing account ID ${account.id}:`, err);
            }
        }));
    } catch (error) {
        console.error('Error processing accounts:', error);
    }
}

// Виклик асинхронної функції
processActiveAccounts();


/*const delResSubscribe = await deleteSubscriptions("tron", "mainnet", "c34e2a1e-180b-4e3b-8895-069aebf5f181");
console.log("delResSubscribe", delResSubscribe.data);

const params = {
    "context": "address-tokens-transactions-confirmed-each-confirmation",
    "data": {
        "item": {
            "address": "TCAirSsKZy6Z4HuXvYaZGyeksy4iQbQqjt",
            "allowDuplicates": true,
            "callbackSecretKey": process.env.CALLBACK_SECRETKEY,
            "callbackUrl": "https://node-service.bettertransfer.io/api/v1/crypt/tokensTransactionsConfirmed"
        }
    }
}
*/
//console.log("params", params);
// Виконання createSubscriptionConfirm асинхронно і чекаємо результат
//const resCreateSubscribe = await createSubscriptionConfirm("TCAirSsKZy6Z4HuXvYaZGyeksy4iQbQqjt", "tron", "mainnet", params);
//console.log("resCreateSubscribe", resCreateSubscribe.data);
//const referenceId = resCreateSubscribe.data.data.item.referenceId;
//update("T9zpXuXYYJHi8K9t4pcTQupVSFizcJSaet",referenceId);