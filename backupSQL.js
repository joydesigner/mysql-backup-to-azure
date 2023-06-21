const { config } = require("dotenv");
const pg = require("pg");
// module.exports = async function (database) {
//   try {
//     return await sqldump({
//       connection: {
//         database: database,
//         ...require("./config/config.js").postgres,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = async function (database) {
  try {
    const config = require("./config/config").postgres;

    const client = new pg.Client(config);
    client.connect((err) => {
      if (err) throw err;
      else {
        dumpDB();
      }
    });

    function dumpDB() {
      const query = `pg_dump -Fc -v --host=${config.host} --username=${config.user} --dbname=${config.database} -f ${config.database}.dump`;
      client
        .query(query)
        .then(() => {
          console.log(`Database ${config.database} is backuped successfully!`);
          client.end(console.log("Closed client connection"));
        })
        .catch((err) => console.log(err))
        .then(() => {
          console.log(
            `Finished the ${config.database} db backups, exiting now`
          );
          process.exit();
        });
    }
  } catch (error) {
    console.log(error);
  }
};
