import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import {getExpiredTime, deletedAccount, getExpiredTimeDeleted} from "./models/account.js";
import { deleteSubscriptions } from "./api/crypto.js";

dotenv.config();

nodeCron.schedule('* * * * *', async () => {
    try {
        console.log("Start cron deactivated subscribe by address.");

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        console.log(formattedDate);

        const result = await getExpiredTimeDeleted(formattedDate);
        console.log("result", result.length)

        if (result.length > 0) {
            console.log("Start map")
            result.map(async (row) => {
                try {
                    console.log(`ID: ${row.reference_id}`);
                    let resRequest = await deleteSubscriptions("tron", "mainnet", row.reference_id);
                    console.log("resRequest", resRequest);
                    if (resRequest) {
                        console.log("Deleted", row.reference_id)
                        await deletedAccount(row.reference_id);
                    }
                } catch (error) {
                    console.error(`Error processing ID: ${row.reference_id}`, error.data);
                }
            });
        } else {
            console.log('No records found in the query result.');
        }
    } catch (e) {
        console.error(e.message);
    }
});
