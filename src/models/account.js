
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
export const  getExpiredTime = (currentTime) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`SELECT * FROM accounts where expired_time  < "${currentTime}" and deleted = 0`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}

export const selectActiveAccounts = () => {
    return new Promise((resolve, reject) => {
        conMySql.query(`SELECT * FROM accounts WHERE deleted = 0`, (err, result) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        });
    });
}

export const  getExpiredTimeDeleted = (currentTime) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`SELECT * FROM accounts where expired_time  < "${currentTime}" and deleted = 1`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}

export const insert = (id, expiredTime, callbackUrl) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`INSERT INTO accounts (id, callback_url, expired_time) VALUES ("${id}", "${callbackUrl}", "${expiredTime}")`, function (err, result) {
            if (err) throw console.log(err);
            resolve(result);
        });
    });
}
export const insertBody = (body) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`INSERT INTO logs (data) VALUES ("${body}")`, function (err, result) {
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

export const deletedAccount = (id) => {
    return new Promise((resolve, reject) => {
        conMySql.query(`UPDATE accounts SET deleted = 1 WHERE reference_id = "${id}"`, function (err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    });
}