// Update with your config settings.
import { knexSnakeCaseMappers } from "objection";
import { Knex } from "knex";
import { getDbHost, getDbName, getDbPassword, getDbPort, getDbUser } from "./Postgresconfig";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const knexConfig: Knex.Config = {
  client: "pg",
  connection: getConnectionCfg(),
  pool: {
    min: 0, //0 is recommended in knex docs to disbale stale connections
    max: 10,
  },
  migrations: {
    extension: "ts",
    tableName: "knex_migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./seeds", //for example data during development
  },
  ...knexSnakeCaseMappers,
};

function getConnectionCfg() {
  return {
    database: getDbName(),
    user: getDbUser(),
    password: getDbPassword(),
    host: getDbHost(),
    port: getDbPort(),
  };
}
export default knexConfig;
