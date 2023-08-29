import conMySql from "./../db.js";
import dotenv from 'dotenv';
dotenv.config();


export const  getTransaction = (id) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`SELECT * FROM transactions where id = "${id}"`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}

export const insertTransaction = (id, account) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`INSERT INTO transactions (id, account, export) VALUES ("${id}","${account}", 1)`, function (err, result) {
            if (err) throw console.log(err);
            resolve(result);
        });
    });
}

export const updateTransaction = (id) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`UPDATE transactions SET export = 1 WHERE id = "${id}"`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}