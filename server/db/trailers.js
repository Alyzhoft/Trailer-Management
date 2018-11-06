const db = require('./connection');
const Joi = require('joi');

const createSchema = Joi.object().keys({
    trailerNumber: Joi.string().alphanum().min(4).max(5).required(),
    trailerName: Joi.string().alphanum().required(),
    trailerLocation: Joi.string().alphanum().required()
});

const updateSchema = Joi.object().keys({
    trailerNumber: Joi.string().alphanum().min(4).max(5).required(),
    trailerName: Joi.string().alphanum().required(),
    trailerLocation: Joi.string().alphanum().required(),
    created: Joi.string(),
    _id: Joi.string().alphanum().required()
});

const trailers = db.get('trailers');

function getAll() {
    return trailers.find();
}

async function createTrailer(trailer) {
    const result = Joi.validate(trailer, createSchema);

    if (result.error === null) {
        trailer.created = new Date();
        return trailers.insert(trailer);
    } else {
        return result.error;
    }
}

async function removeTrailer(trailer) {
    const result = await trailers.remove({_id: trailer._id})
    return trailers.find();
}

async function updateTrailer (trailer) {
    const result = Joi.validate(trailer, updateSchema);

    if (result.error === null) {
        trailer.update = new Date();
        const result = await trailers.update({_id: trailer._id}, {$set: {trailerNumber: trailer.trailerNumber, trailerName: trailer.trailerName, update: trailer.update}})
        return trailers.find();
    } else {
        return Promise.reject(result.error);
    }
}

async function moveTrailer(trailer) {
    trailer.update = new Date();
    const result = await trailers.update({_id: trailer._id}, {$set: {trailerLocation: trailer.trailerLocation, update: trailer.update}})
    return trailers.find();
}

module.exports = {
    getAll,
    createTrailer,
    removeTrailer,
    moveTrailer,
    updateTrailer
}