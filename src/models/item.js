const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  weight: {
    type: Number,
    required: [true],
  },
  length: {
    type: Number,
    required: [true],
  },
  width: {
    type: Number,
    required: [true],
  },
  height: {
    type: Number,
    required: [true],
  },
  locationId: {
    type: ObjectId,
    ref: 'Location',
  },
});

const Item = mongoose.model('Item', schema);

module.exports = { Item };