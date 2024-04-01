import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
  {
    ssl: "require",
    transform: postgres.camel,
  }
);

async function createTable() {
  // create table
}

createTable();

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}
getPgVersion();

export default sql;
