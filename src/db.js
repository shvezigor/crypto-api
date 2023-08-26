import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

var conMySql = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
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
