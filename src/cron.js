
import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import {getExpiredTime} from "./models/account.js";
import {deleteSubscriptions} from "./api/crypto.js";

dotenv.config();

nodeCron.schedule('* * * * *', async () => {
    try {
       console.log("Start cron deactivated subscribe by address.")
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Місяці в JavaScript ідуть від 0 до 11
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log(formattedDate);

        let result = await getExpiredTime(formattedDate);
        if (result.length !== 0) {
            results.forEach(row => {
                console.log(`ID: ${row.reference_id}`);
                deleteSubscriptions("tron", "mainnet", row.reference_id);
            });
        }
    } catch (e) {
        console.log(e.message);
    }
});

  
   



