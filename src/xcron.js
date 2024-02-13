import dotenv from 'dotenv';
import nodeCron from 'node-cron';
import {getExpiredTime, deletedAccount, getExpiredTimeDeleted} from "./models/account.js";
import {deleteSubscriptions} from "./api/crypto.js";

dotenv.config();

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

getExpiredTimeDeleted(formattedDate)
    .then(result => {
        // Обробка результату, якщо записи існують
        if (result.length > 0) {
            // Отримуємо масив обіцянок для всіх викликів deleteSubscriptions
            const deletePromises = result.map(row => {
                console.log(`ID: ${row.reference_id}`);
                // Повертаємо обіцянку для deleteSubscriptions
                return deleteSubscriptions("tron", "mainnet", row.reference_id)
                    .then(() => deletedAccount(row.reference_id))
                    .catch(error => {
                        console.error(`Помилка при викликанні deleteSubscriptions для ID: ${row.reference_id}`, error);
                        // Повертаємо обіцянку для deletedAccount в будь-якому випадку
                        return deletedAccount(row.reference_id);
                    });
            });

            // Використовуємо Promise.all для очікування виконання всіх deleteSubscriptions та deletedAccount
            return Promise.all(deletePromises);
        } else {
            console.log('Немає записів в результаті запиту.');
        }
    })
    .catch(error => {
        // Обробка помилки
        console.error('Помилка при виконанні запиту:', error);
    });


/* getExpiredTime(formattedDate)
     .then(result => {
         // Обробка результату, якщо записи існують
         if (result.length > 0) {
             result.forEach(row => {
                 console.log(`ID: ${row.reference_id}`);
                 deleteSubscriptions("tron", "mainnet", row.reference_id);
                 deletedAccount(row.reference_id);
             });
         } else {
             console.log('Немає записів в результаті запиту.');
         }
     })
     .catch(error => {
         // Обробка помилки
         console.error('Помилка при виконанні запиту:', error);
     });*/



  
   



