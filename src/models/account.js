
import conMySql from "./../db.js";
import dotenv from 'dotenv';
dotenv.config();

export const  get = (id) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`SELECT * FROM accounts where id = "${id}"`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}

export const insert = (id) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`INSERT INTO accounts (id) VALUES ("${id}")`, function (err, result) {
            if (err) throw console.log(err);
            resolve(result);
        });
    });
}

export const update = (id, value) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`UPDATE accounts SET webhook = 1,  reference_id = "${value}" WHERE id = "${id}"`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}