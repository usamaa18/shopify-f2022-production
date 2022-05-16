const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const idValidator = require('mongoose-id-validator');

const schema = new Schema({
  desc: {
    type: String,
    required: [true, "Description is required"],
    minLength: [1, "Description is required"]
  },
  weight: {
    type: Number,
    required: [true, "Weight is required"],
    min: [0, "Cannot have negative weight"]
  },
  length: {
    type: Number,
    required: [true, "Length is required"],
    min: [0, "Cannot have negative length"]
  },
  width: {
    type: Number,
    required: [true, "Width is required"],
    min: [0, "Cannot have negative width"]
  },
  height: {
    type: Number,
    required: [true, "Height is required"],
    min: [0, "Cannot have negative height"]
  },
  warehouseId: {
    type: ObjectId,
    required: [true, "Warehouse is required"],
    ref: 'Warehouse',
  },
});


// custom validation to ensure the warehouseId actually links to a warehouse in the DB
schema.plugin(idValidator, { message: 'Invalid warehouse (warehouseId not found in DB)' });

const Item = mongoose.model('Item', schema);

module.exports = Item;