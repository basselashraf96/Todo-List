import Knex from "knex";

import { Model } from "objection";
import knexConfig from "./knexfile";

export function dbConn() {
  return Model.knex(Knex(knexConfig));
}
