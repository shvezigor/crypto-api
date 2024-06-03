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
                const delResSubscribe = await deleteSubscriptions("tron", "mainnet", account.reference_id);
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
processActiveAccounts();
