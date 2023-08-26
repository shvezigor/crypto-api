import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';


let conMySql = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: '3306'
});

// Connect to Data Base
conMySql.connect(function(err) {
  if (err) throw err;
  
  // uses Data Base
  conMySql.query("use tron", function (err, result) {
    if (err) throw err;
  }); 
  
});

export default conMySql;
