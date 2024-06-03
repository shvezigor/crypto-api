import {selectActiveAccounts} from "./models/account.js";


// Асинхронна функція для виклику selectActiveAccounts і обробки результатів
async function processActiveAccounts() {
    try {
        const accounts = await selectActiveAccounts();
        // Перебираємо кожен аккаунт в отриманому результаті
        accounts.forEach(account => {
            console.log(account); // Виведення інформації про кожен аккаунт



        });
    } catch (error) {
        console.error('Error processing accounts:', error);
    }
}

// Виклик асинхронної функції
processActiveAccounts();