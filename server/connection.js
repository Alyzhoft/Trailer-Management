const { Pool, Client } = require("pg");

const client = new Client({
  host: "trailermanagementdb.postgres.database.azure.com",
  user: "Alyzhoft@trailermanagementdb",
  password: "Al475500",
  database: "Trailer Management",
  port: 5432,
  ssl: true
});

const pool = new Pool({
  host: "trailermanagementdb.postgres.database.azure.com",
  user: "Alyzhoft@trailermanagementdb",
  password: "Al475500",
  database: "Trailer Management",
  port: 5432,
  ssl: true
});

module.exports = {
  client,
  pool
};
