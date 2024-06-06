import {selectActiveAccounts, update, updateReferenceById} from "./models/account.js";
import { createSubscriptionConfirm, deleteSubscriptions } from "./api/crypto.js";
import dotenv from 'dotenv';

dotenv.config();

// Асинхронна функція для виклику selectActiveAccounts і обробки результатів
async function processActiveAccounts() {
    try {
        const accounts = await selectActiveAccounts();
        // Використовуємо Promise.all для паралельного виконання асинхронних дій
        await Promise.all(accounts.map(async (account) => {
            try {
                // Виконання deleteSubscriptions асинхронно і чекаємо результат
                //console.log("account", account);
                //console.log("reference_id", account.reference_id);
                //const delResSubscribe = await deleteSubscriptions("tron", "mainnet", account.reference_id);
                const delResSubscribe = await deleteSubscriptions("tron", "mainnet", "T9zpXuXYYJHi8K9t4pcTQupVSFizcJSaet");
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
                };

                // Виконання createSubscriptionConfirm асинхронно і чекаємо результат
                const resCreateSubscribe = await createSubscriptionConfirm(account, "tron", "mainnet", params);
                console.log("resCreateSubscribe", resCreateSubscribe);
                const referenceId = resCreateSubscribe.data.data.item.referenceId;

                update(account.id,referenceId);

            } catch (err) {
                console.error(`Error processing account ID ${account.id}:`, err);
            }
        }));
    } catch (error) {
        console.error('Error processing accounts:', error);
    }
}

// Виклик асинхронної функції
//processActiveAccounts();
//processActiveAccounts();


const delResSubscribe = await deleteSubscriptions("tron", "mainnet", "51563010-5c33-438e-bf2e-6ed724d34aed");
console.log("delResSubscribe", delResSubscribe);

const params = {
    "context": "address-tokens-transactions-confirmed-each-confirmation",
    "data": {
        "item": {
            "address": "TCAirSsKZy6Z4HuXvYaZGyeksy4iQbQqjt",
            "allowDuplicates": true,
            "callbackSecretKey": process.env.CALLBACK_SECRETKEY,
            "callbackUrl": process.env.CALLBACK_URL
        }
    }
}

// Виконання createSubscriptionConfirm асинхронно і чекаємо результат
const resCreateSubscribe = await createSubscriptionConfirm("TCAirSsKZy6Z4HuXvYaZGyeksy4iQbQqjt", "tron", "mainnet", params);
console.log("resCreateSubscribe", resCreateSubscribe);
//const referenceId = resCreateSubscribe.data.data.item.referenceId;
//update("T9zpXuXYYJHi8K9t4pcTQupVSFizcJSaet",referenceId);