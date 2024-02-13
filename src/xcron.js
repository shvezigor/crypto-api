import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import { getExpiredTime, deletedAccount } from "./models/account.js";
import { deleteSubscriptions } from "./api/crypto.js";

dotenv.config();

nodeCron.schedule('* * * * *', async () => {
    try {
        console.log("Start cron deactivated subscribe by address.");

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        console.log(formattedDate);

        const result = await getExpiredTime(formattedDate);

        if (result.length > 0) {
            const deletePromises = result.map(async (row) => {
                try {
                    console.log(`ID: ${row.reference_id}`);
                    let resRequest = await deleteSubscriptions("tron", "mainnet", row.reference_id);
                    if (resRequest) {
                        await deletedAccount(row.reference_id);
                    }
                } catch (error) {
                    console.error(`Error processing ID: ${row.reference_id}`, error);
                }
            });

            await Promise.all(deletePromises);
        } else {
            console.log('No records found in the query result.');
        }
    } catch (e) {
        console.error(e.message);
    }
});
