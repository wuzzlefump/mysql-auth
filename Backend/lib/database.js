const mysql = require("mysql");
const { promisify } = require("util");

const pool = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "root",
    database: "Mysql_Auth",
    connectionLimit: 10,
  });

  module.exports.query = function ({ sql, values }) {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, function (error, results, fields) {
        if (error) {
          return reject(error);
        }
  
        return resolve(results);
      });
    });
  };