import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

var conMySql = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: '',
  database: 'tron',
  port:'3306',
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
