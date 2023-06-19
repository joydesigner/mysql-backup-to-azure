if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

module.exports = {
  postgres: {
    host: process.env.sql_host,
    user: process.env.sql_user,
    password: process.env.sql_password,
    database: process.env.database,
    port: 5432,
    ssl: true,
  },
  azure: {
    account: process.env.azure_account,
    accountKey: process.env.azure_accountKey,
    containerName: process.env.azure_container,
  },
};
