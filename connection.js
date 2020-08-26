const { Pool } = require("pg");
const credentials = new Pool({
  user: "Lab2",
  password: "password1234",
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB",
  ssl: false
});

module.exports = credentials;