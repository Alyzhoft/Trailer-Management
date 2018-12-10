const db = require("./connection");
const Joi = require("joi");
const moment = require("moment");

const createSchema = Joi.object().keys({
  trailerNumber: Joi.string()
    .alphanum()
    .min(4)
    .max(5)
    .required(),
  carrier: Joi.string().required(),
  trailerLocation: Joi.string().required(),
  category: Joi.string(),
  status: Joi.string()
});

const departedSchema = Joi.object().keys({
  trailerNumber: Joi.string()
    .alphanum()
    .min(4)
    .max(5)
    .required(),
  carrier: Joi.string().required(),
  trailerLocation: Joi.string().required(),
  category: Joi.string(),
  status: Joi.string(),
  _id: Joi.string()
    .alphanum()
    .required()
});

const updateSchema = Joi.object().keys({
  trailerNumber: Joi.string()
    .alphanum()
    .min(4)
    .max(5)
    .required(),
  carrier: Joi.string()
    .alphanum()
    .required(),
  trailerLocation: Joi.string().required(),
  category: Joi.string(),
  status: Joi.string(),
  created: Joi.string(),
  _id: Joi.string()
    .alphanum()
    .required()
});

const trailers = db.get("trailers");
const departedTrailers = db.get("departedTrailers");

function getAllTrailers() {
  return trailers.find();
}

function getDepartedTrailers() {
  return departedTrailers.find();
}

async function createTrailer(trailer) {
  const result = Joi.validate(trailer, createSchema);

  console.log(result);

  if (result.error === null) {
    const date = moment(new Date()).format("YYYY-MM-DD h:mm:ss");
    trailer.created = new Date();
    return trailers.insert(trailer);
  } else {
    return result.error;
  }
}

async function removeTrailer(trailer) {
  const result = await trailers.remove({ _id: trailer._id });
  return trailers.find();
}

async function updateTrailer(trailer) {
  const result = Joi.validate(trailer, updateSchema);

  if (result.error === null) {
    const date = moment().format("MM-DD-YYYY h:mm:ss");
    trailer.update = date;
    const result = await trailers.update(
      { _id: trailer._id },
      {
        $set: {
          trailerNumber: trailer.trailerNumber,
          carrier: trailer.carrier,
          category: trailer.category,
          status: trailer.status,
          update: trailer.update
        }
      }
    );
    return trailers.find();
  } else {
    return Promise.reject(result.error);
  }
}

async function moveTrailer(trailer) {
  const date = moment().format("MM-DD-YYYY h:mm:ss");
  trailer.update = date;
  const result = await trailers.update(
    { _id: trailer._id },
    {
      $set: { trailerLocation: trailer.trailerLocation, update: trailer.update }
    }
  );
  return trailers.find();
}

async function departedTrailer(trailer) {
  const result = await trailers.remove({ _id: trailer._id });
  const joiResult = Joi.validate(trailer, departedSchema);

  if (joiResult.error === null) {
    const date = moment().format("MM-DD-YYYY h:mm:ss");
    trailer.strDepartedDate = date;
    trailer.dtDepartedDate = new Date();
    const insertResults = await departedTrailers.insert(trailer);
    const departedTrailersResults = await departedTrailers.find();
    const trialerResults = await trailers.find();
    return { departedTrailersResults, trialerResults };
  } else {
    return joiResult.error;
  }
}

async function departedTrailerSearch(value) {
  const results = await departedTrailers.find({
    // dtDepartedDate: { $gt: value.startDateTime, $lt: value.endDateTime }
    dtDepartedDate: {
      $gt: "2018-12-07T19:00:00.000Z",
      $lt: "2018-12-07T19:10:00.000Z"
    }
  });

  console.log(results);
}

module.exports = {
  getAllTrailers,
  createTrailer,
  removeTrailer,
  moveTrailer,
  updateTrailer,
  getDepartedTrailers,
  departedTrailer,
  departedTrailerSearch
};
