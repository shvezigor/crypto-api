import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

let conMySql = mysql.createConnection({
  host: 'localhost',
  user: 'crypto',
  password: 'Rtyueherfde198310!',
  database: 'sys',
  port:'3306',
});

// Connect to Data Base
conMySql.connect(function(err) {
  console.log("connected db");
  if (err) throw err;
  
  // uses Data Base
  conMySql.query("use sys", function (err, result) {
    if (err) throw err;
  }); 
  
});

export default conMySql;
