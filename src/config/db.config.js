const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "apex_hauz",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = connection;
