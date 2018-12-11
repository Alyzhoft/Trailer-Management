const conn = require("./connection");

const getTrailers = async () => {
  const client = await conn.pool.connect();
  const results = await client.query(
    "SELECT * FROM trailers WHERE departed = 'n'"
  );
  client.release();
  return results.rows;
};

const getDeparted = async () => {
  const client = await conn.pool.connect();
  const results = await client.query(
    "SELECT _id, trailernumber, category, carrier, to_char(departedtime, 'MM-DD-YYYY HH24:MI') datetime FROM trailers WHERE departed = 'y'"
  );
  client.release();
  return results.rows;
};

const insertTrailer = async trailer => {
  const client = await conn.pool.connect();
  const results = await client.query(
    `INSERT INTO trailers(trailernumber, carrier, trailerlocation, category, status) VALUES(\'${
      trailer.trailerNumber
    }\', \'${trailer.carrier}\', \'${trailer.trailerLocation}\', \'${
      trailer.category
    }\', \'${trailer.status}\')`
  );
  const trailers = await getTrailers();
  client.release();
  return trailers;
};

const updateTrailer = async trailer => {
  const client = await conn.pool.connect();
  const results = await client.query(
    `UPDATE trailers SET trailernumber = \'${
      trailer.trailerNumber
    }\', carrier = \'${trailer.carrier}\', category = \'${
      trailer.category
    }\', status = \'${trailer.status}\', updated = now() WHERE _id = ${
      trailer._id
    }`
  );
  const trailers = await getTrailers();
  client.release();
  return trailers;
};

const moveTrailer = async trailer => {
  const client = await conn.pool.connect();
  const results = await client.query(
    `UPDATE trailers SET trailerlocation = \'${
      trailer.trailerLocation
    }\', updated = now() WHERE _id = ${trailer._id}`
  );
  const trailers = await getTrailers();
  client.release();
  return trailers;
};

const deleteTrailer = async trailer => {
  const client = await conn.pool.connect();
  const results = await client.query(
    `DELETE FROM trailers WHERE _id = ${trailer._id}`
  );
  const trailers = await getTrailers();
  client.release();
  return trailers;
};

const insertDeparted = async trailer => {
  const client = await conn.pool.connect();
  const results = await client.query(
    `UPDATE trailers set departed = 'y', departedtime = now() WHERE _id = ${
      trailer._id
    }`
  );
  const trailers = await getTrailers();
  const departed = await getDeparted();
  client.release();
  return { departed, trailers };
};

const trailerSearch = async body => {
  const trailerNumber = body.trailerNumber;
  const startDateTime = body.startDateTime;
  const endDateTime = body.endDateTime;
  const category = body.category;
  const carrier = body.carrier;
  const departed = body.departed;
  let sqlQuery = "";

  if (departed) {
    sqlQuery = `SELECT _id, trailernumber, category, carrier, to_char(departedtime, 'MM-DD-YYYY HH24:MI') datetime  
    FROM trailers `;
  } else {
    sqlQuery = `SELECT _id, trailernumber, category, carrier, trailerlocation, to_char(inserted, 'MM-DD-YYYY HH24:MI') datetime  
    FROM trailers `;
  }

  if (trailerNumber != "") {
    const trailerNumberSQL = `WHERE trailernumber = \'${trailerNumber}\' `;
    sqlQuery += trailerNumberSQL;
  }

  if (startDateTime != "" && endDateTime != "") {
    if (trailerNumber != "") {
      const dateRangeSQL = `AND departedtime >= \'${startDateTime}\' AND departedtime <= \'${endDateTime}\' `;
      sqlQuery += dateRangeSQL;
    } else {
      const dateRangeSQL = `WHERE departedtime >= \'${startDateTime}\' AND departedtime <= \'${endDateTime}\' `;
      sqlQuery += dateRangeSQL;
    }
  }

  if (category != "") {
    if (trailerNumber != "" || (startDateTime != "" && endDateTime != "")) {
      const categorySQL = `AND category = \'${category}\'`;
      sqlQuery += categorySQL;
    } else {
      const categorySQL = `WHERE category = \'${category}\'`;
      sqlQuery += categorySQL;
    }
  }

  if (carrier != "") {
    if (
      trailerNumber != "" ||
      category != "" ||
      (startDateTime != "" && endDateTime != "")
    ) {
      const carrierSQL = `AND carrier = \'${carrier}\' `;
      sqlQuery += carrierSQL;
    } else {
      const carrierSQL = `WHERE carrier = \'${carrier}\' `;
      sqlQuery += carrierSQL;
    }
  }

  if (departed) {
    if (
      trailerNumber != "" ||
      category != "" ||
      carrier != "" ||
      (startDateTime != "" && endDateTime != "")
    ) {
      const departedSQL = `AND departed = 'y'`;
      sqlQuery += departedSQL;
    } else {
      const departedSQL = `WHERE departed = 'y'`;
      sqlQuery += departedSQL;
    }
  } else {
    if (
      trailerNumber != "" ||
      category != "" ||
      carrier != "" ||
      (startDateTime != "" && endDateTime != "")
    ) {
      const departedSQL = `AND departed = 'n'`;
      sqlQuery += departedSQL;
    } else {
      const departedSQL = `WHERE departed = 'n'`;
      sqlQuery += departedSQL;
    }
  }

  const client = await conn.pool.connect();
  const results = await client.query(sqlQuery);

  client.release();
  return results;
};

module.exports = {
  getTrailers,
  insertTrailer,
  updateTrailer,
  moveTrailer,
  deleteTrailer,
  getDeparted,
  insertDeparted,
  trailerSearch
};