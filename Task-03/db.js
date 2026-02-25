const sql = require("mssql");

const config = {
  user: "login_user",
  password: "StrongPass@123",
  server: "localhost",
  port: 1433,
  database: "LoginDB",
  options: { encrypt: true, trustServerCertificate: true }
};

module.exports = { sql, config };
