const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength : [1, "Name is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Cannot have negative quantity"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Cannot have negative price"]
  },
  city: {
    type: String,
    enum: ['Edmonton', 'Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    required: [true, "City is required"],
  },
  desc: String,
  tags: [String],
  image: String
});

const Item = mongoose.model('Item', schema);

module.exports = Item;