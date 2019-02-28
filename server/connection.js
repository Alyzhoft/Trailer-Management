const { Pool, Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "Al475500",
  database: "Trailer Management",
  port: 5432
});

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Al475500",
  database: "Trailer Management",
  port: 5432
});

module.exports = {
  client,
  pool
};
