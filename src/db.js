import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();
console.log(process.env.DATABASE_HOST, process.env.DATABASE_NAME, process.env.DATABASE_PORT, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD);

let conMySql = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: 'crypto',
  password: 'Rtyueherfde198310!',
  database: 'tron',
  port: '3306'
});

// Connect to Data Base
conMySql.connect(function(err) {
  console.log("connected db");
  if (err) throw err;
  
  // uses Data Base
  conMySql.query("use tron", function (err, result) {
    if (err) throw err;
  }); 
  
});

export default conMySql;
