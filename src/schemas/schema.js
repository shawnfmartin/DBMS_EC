const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({}, { strict: false });

module.exports = { ModelSchema };