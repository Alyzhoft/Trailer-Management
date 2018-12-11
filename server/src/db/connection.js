const { Pool, Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Trailer Management",
  password: "Al475500",
  port: 5432
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Trailer Management",
  password: "Al475500",
  port: 5432
});

module.exports = {
  client,
  pool
};
