module.exports = async function () {
  const { Pool, Client } = require("pg");

  const client = new Client({ ...require("./config/config.js").postgres });
  await client.connect();
  const { results, fields } = await client.query("show databases");
  await client.end();

  return await results
    .filter((result) => {
      if (
        // result.Database != "information_schema" &&
        // result.Database != "sys" &&
        // result.Database != "performance_schema" &&
        result.Database != "postgres"
      ) {
        return result;
      }
    })
    .map((result) => {
      return result.Database;
    });

  //connection.connect()
};
