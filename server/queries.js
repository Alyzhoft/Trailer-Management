const conn = require("./connection");

const getTrailers = async () => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      "SELECT _id, trailernumber, carrier, trailerlocation, category, status, inserted, updated, string_to_array(trim(shipdates), ' ') shipdates FROM trailers WHERE departed = 'n' order by carrier, trailernumber"
    );
    client.release();
    return results.rows;
  } catch (error) {
    client.release();
    return error;
  }
};

const getDeparted = async () => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      "SELECT _id, trailernumber, category, carrier, to_char(departedtime, 'MM-DD-YYYY HH24:MI') datetime, string_to_array(trim(shipdates), ' ') shipdates FROM trailers WHERE departed = 'y'"
    );
    client.release();
    return results.rows;
  } catch (error) {
    client.release();
    return error;
  }
};

const getRequests = async () => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      "SELECT _id, out, outtrailernumber, outcarrier, outcategory ,incarrier, intrailernumber, intrailerlocation, to_char(inserted, 'MM-DD-YYYY HH24:MI:SS') inserted, urgent, trailer_id, dock, special FROM requests where completed = 'n' order by CASE WHEN urgent = 'true' THEN urgent END, inserted, CASE WHEN outcarrier is not null then outcarrier END"
    );
    client.release();
    return results.rows;
  } catch (error) {
    client.release();
    return error;
  }
};

const getTrailerNumbers = async body => {
  const carrier = body.carrier;

  const client = await conn.pool.connect();

  try {
    const requestResponse = await client.query(
      `SELECT trailernumber, _id, trailerlocation FROM trailers WHERE (trailerlocation like ('SL-%') or trailerlocation like 'Off-Site Lot' or trailerlocation like 'PL') AND departed != 'y' AND carrier = \'${carrier}\'`
    );
    client.release();
    return requestResponse;
  } catch (error) {
    client.release();
    return error;
  }
};

const getEmptyTrailers = async body => {
  const carrier = body.carrier;

  const client = await conn.pool.connect();

  try {
    const requestResponse = await client.query(
      `SELECT trailernumber, _id, trailerlocation FROM trailers WHERE (trailerlocation like ('SL-%') or trailerlocation like 'Off-Site Lot' or trailerlocation like 'PL') AND departed != 'y' AND category = 'Empties for Shipping' AND carrier = \'${carrier}\'`
    );
    client.release();
    return requestResponse;
  } catch (error) {
    client.release();
    return error;
  }
};

const insertTrailer = async trailer => {
  let shipDates = "";
  let sqlQuery = "";

  if (
    trailer.category == "Patio Trailers" ||
    trailer.category == "Storage/Misc. Shipping Trailers" ||
    trailer.category == "In Process"
  ) {
    if (trailer.shipDates.length > 1) {
      for (let i = 0; i < trailer.shipDates.length; i++) {
        shipDates += trailer.shipDates[i] + " ";
      }
    } else {
      shipDates = trailer.shipDates[0];
    }

    if (shipDates == undefined) {
      sqlQuery = `INSERT INTO trailers(trailernumber, carrier, trailerlocation, category, status) VALUES(\'${
        trailer.trailerNumber
      }\', \'${trailer.carrier}\', \'${trailer.trailerLocation}\', \'${
        trailer.category
      }\', \'${trailer.status}\')`;
    } else {
      sqlQuery = `INSERT INTO trailers(trailernumber, carrier, trailerlocation, category, status, shipdates) VALUES(\'${
        trailer.trailerNumber
      }\', \'${trailer.carrier}\', \'${trailer.trailerLocation}\', \'${
        trailer.category
      }\', \'${trailer.status}\', \'${shipDates}\')`;
    }
  } else {
    sqlQuery = `INSERT INTO trailers(trailernumber, carrier, trailerlocation, category, status) VALUES(\'${
      trailer.trailerNumber
    }\', \'${trailer.carrier}\', \'${trailer.trailerLocation}\', \'${
      trailer.category
    }\', \'${trailer.status}\')`;
  }

  const client = await conn.pool.connect();
  try {
    const results = await client.query(sqlQuery);
    const trailers = await getTrailers();
    client.release();
    return trailers;
  } catch (error) {
    client.release();
    return error;
  }
};

const updateTrailer = async trailer => {
  let shipDates = "";
  let sqlQuery = "";
  if (
    trailer.category == "Patio Trailers" ||
    trailer.category == "Storage/Misc. Shipping Trailers" ||
    trailer.category == "In Process" ||
    trailer.category == "Empties for Shipping"
  ) {
    if (trailer.shipDates.length > 1) {
      for (let i = 0; i < trailer.shipDates.length; i++) {
        shipDates += trailer.shipDates[i] + " ";
      }
    } else {
      shipDates = trailer.shipDates[0];
    }

    if (shipDates == undefined) {
      sqlQuery = `UPDATE trailers SET trailernumber = \'${
        trailer.trailerNumber
      }\', carrier = \'${trailer.carrier}\', category = \'${
        trailer.category
      }\', status = \'${
        trailer.status
      }\', shipdates = null,updated = (now() at time zone 'US/Central') WHERE _id = ${
        trailer._id
      }`;
    } else {
      sqlQuery = `UPDATE trailers SET trailernumber = \'${
        trailer.trailerNumber
      }\', carrier = \'${trailer.carrier}\', category = \'${
        trailer.category
      }\', status = \'${
        trailer.status
      }\', shipdates = \'${shipDates}\', updated = (now() at time zone 'US/Central') WHERE _id = ${
        trailer._id
      }`;
    }
  } else {
    sqlQuery = `UPDATE trailers SET trailernumber = \'${
      trailer.trailerNumber
    }\', carrier = \'${trailer.carrier}\', category = \'${
      trailer.category
    }\', status = \'${
      trailer.status
    }\', updated = (now() at time zone 'US/Central') WHERE _id = ${
      trailer._id
    }`;
  }

  const client = await conn.pool.connect();
  try {
    const results = await client.query(sqlQuery);
    const trailers = await getTrailers();
    client.release();
    return trailers;
  } catch (error) {
    client.release();
    return error;
  }
};

const moveTrailer = async trailer => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      `UPDATE trailers SET trailerlocation = \'${
        trailer.trailerLocation
      }\', updated = (now() at time zone 'US/Central') WHERE _id = ${
        trailer._id
      }`
    );
    const trailers = await getTrailers();
    client.release();
    return trailers;
  } catch (error) {
    client.release();
    return error;
  }
};

const deleteTrailer = async trailer => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      `DELETE FROM trailers WHERE _id = ${trailer._id}`
    );
    const trailers = await getTrailers();
    client.release();
    return trailers;
  } catch (error) {
    client.release();
    return error;
  }
};

const deleteRequest = async request => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      `DELETE FROM requests WHERE _id = ${request._id}`
    );
    const requests = await getRequests();
    client.release();
    return requests;
  } catch (error) {
    client.release();
    return error;
  }
};

const insertDeparted = async trailer => {
  const client = await conn.pool.connect();
  try {
    const results = await client.query(
      `UPDATE trailers set departed = 'y', departedtime = (now() at time zone 'US/Central') WHERE _id = ${
        trailer._id
      }`
    );
    const trailers = await getTrailers();
    const departed = await getDeparted();

    client.release();
    return { departed, trailers };
  } catch (error) {
    client.release();
    return error;
  }
};

const request = async data => {
  const client = await conn.pool.connect();
  let sqlQuery = "";

  if (data.inRequest && data.outRequest) {
    let [res1, res2] = await Promise.all([outRequest(data), inRequest(data)]);

    if (res1.name || res2.name) {
      if (res1.name) {
        const response = {
          name: res1.name,
          message: res1.message
        };
        return response;
      } else if (res2.name) {
        const response = {
          name: res2.name,
          message: res2.message
        };
        return response;
      }
    }
  } else if (data.inRequest && !data.outRequest) {
    const res = await inRequest(data);
    if (res.name) {
      const response = {
        name: res.name,
        message: res.message
      };
      return response;
    }
  } else {
    const res = await outRequest(data);
    if (res.name) {
      const response = {
        name: res.name,
        message: res.message
      };
      return response;
    }
  }
  try {
    const requests = getRequests();
    client.release();
    return requests;
  } catch (error) {
    client.release();
    return error;
  }
};

const outRequest = async data => {
  const client = await conn.pool.connect();

  try {
    if (data.categoryChange) {
      const response = await client.query(`INSERT INTO requests(dock, outtrailernumber, outcarrier, urgent, trailer_id, outcategory) VALUES(\'${
        data.dock
      }\',\'${data.outTrailer.trailerNumber}\',\'${
        data.outTrailer.carrier
      }\',\'${data.urgent}\',
      \'${data.outTrailer._id}\', \'${data.outTrailer.category}\')`);
    } else {
      const response = await client.query(`INSERT INTO requests(dock, outtrailernumber, outcarrier, urgent, trailer_id) VALUES(\'${
        data.dock
      }\',\'${data.outTrailer.trailerNumber}\',\'${
        data.outTrailer.carrier
      }\',\'${data.urgent}\',
      \'${data.outTrailer._id}\')`);
    }
    client.release();
    return "Successful";
  } catch (error) {
    client.release();
    return error;
  }
};

const inRequest = async data => {
  const client = await conn.pool.connect();
  try {
    if (Object.keys(data.inTrailer.trailerInfo).length === 0) {
      const response = await client.query(
        `INSERT INTO requests(incarrier, urgent, dock, special) VALUES(\'${
          data.inTrailer.carrier
        }\',\'${data.urgent}\', \'${data.dock}\', \'${
          data.inTrailer.special
        }\')`
      );
    } else {
      const response = await client.query(
        `INSERT INTO requests(incarrier, urgent, dock, special, intrailernumber, intrailerlocation) VALUES(\'${
          data.inTrailer.carrier
        }\',\'${data.urgent}\', \'${data.dock}\', \'${
          data.inTrailer.special
        }\', \'${data.inTrailer.trailerInfo.trailerNumber}\', \'${
          data.inTrailer.trailerInfo.trailerLocation
        }\')`
      );
    }

    client.release();
    return "Successful";
  } catch (error) {
    client.release();
    return error;
  }
};

const completed = async data => {
  let sqlQuery = "";
  const client = await conn.pool.connect();
  try {
    const requestResponse = await client.query(
      `UPDATE requests set completed = 'y', completedtime = (now() at time zone 'US/Central') where _id = \'${
        data._id
      }\'`
    );

    if (data.outcarrier) {
      if (data.outcategory) {
        const outResponse = await client.query(
          `UPDATE trailers set trailerlocation = \'${
            data.outPlacement
          }\', category = \'${
            data.outcategory
          }\', updated = (now() at time zone 'US/Central') where _id = \'${
            data.trailer_id
          }\'`
        );
      } else {
        const outResponse = await client.query(
          `UPDATE trailers set trailerlocation = \'${
            data.outPlacement
          }\', updated = (now() at time zone 'US/Central') where _id = \'${
            data.trailer_id
          }\'`
        );
      }
    }

    if (data.inTrailerNumber) {
      const requestResponse = await client.query(
        `UPDATE trailers set trailerlocation = \'${
          data.dock
        }\', updated = (now() at time zone 'US/Central'), category = 'In Process' where carrier = \'${
          data.inCarrier
        }\' and trailernumber = \'${data.inTrailerNumber}\'`
      );
    }
    const requests = await getRequests();
    const trailers = await getTrailers();

    client.release();
    return { requests, trailers };
  } catch (error) {
    client.release();
    return error;
  }
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
    sqlQuery = `SELECT _id, trailernumber, category, carrier, to_char(departedtime, 'MM-DD-YYYY HH24:MI') datetime, status  
    FROM trailers `;
  } else {
    sqlQuery = `SELECT _id, trailernumber, category, carrier, trailerlocation, shipdates,to_char(inserted, 'MM-DD-YYYY HH24:MI') datetime, status 
    FROM trailers `;
  }

  if (trailerNumber != "") {
    const trailerNumberSQL = `WHERE trailernumber like \'%${trailerNumber}%\' `;
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
  try {
    const results = await client.query(sqlQuery);

    client.release();
    return results;
  } catch (error) {
    client.release();
    return error;
  }
};

module.exports = {
  getTrailers,
  getEmptyTrailers,
  insertTrailer,
  updateTrailer,
  moveTrailer,
  deleteTrailer,
  getDeparted,
  insertDeparted,
  trailerSearch,
  getRequests,
  request,
  deleteRequest,
  inRequest,
  completed,
  getTrailerNumbers
};
