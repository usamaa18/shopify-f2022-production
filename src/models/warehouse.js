const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1
  },
  location: {
    type: pointSchema,
    required: true
  }
});

const Warehouse = mongoose.model('Warehouse', schema);

module.exports = Warehouse;