const backupToAzure = require("./backupAzure");
const listDatabases = require("./listSQLDatabases");
const moment = require("moment");
const backupMySQL = require("./backupSQL");
(async function () {
  // Build array of database names.
  const databases = await listDatabases();

  // for each database
  for await (const db of databases) {
    const fileName = `${moment().format("DD-MM-YY")}/${db}_${moment().format(
      "HH-mm"
    )}.sql`;
    console.log(`Backing up ${db}`);
    // backup database
    const content = await backupSQL(db);
    // check MySQL dump is not empty
    if (content != undefined) {
      // Backup to azure
      await backupToAzure(
        fileName,
        `${content.dump.schema}\n${content.dump.data}`
      );
    }
  }
})();
