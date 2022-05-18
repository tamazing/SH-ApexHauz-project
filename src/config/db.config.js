const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apex_hauz",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = connection;
