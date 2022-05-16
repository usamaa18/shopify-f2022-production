const mongoose = require('mongoose');
const Item = require("../../models/item");

const create = async (req, res) => {
    desc = req.body.description;
    weight = new Number(req.body.weight);
    length = new Number(req.body.length);
    width = new Number(req.body.width);
    height = new Number(req.body.height);
    if (req.body.warehouseId.match(/^[0-9a-fA-F]{24}$/)) {warehouseId = mongoose.Types.ObjectId(req.body.warehouseId);}
    else {warehouseId = null;}

    let obj = {
        desc: desc,
        weight: weight,
        length: length,
        width: width,
        height: height,
        warehouseId: warehouseId
      };
    Item.create(obj, (err, doc) => {
      console.log("created?");
      if (err) {res.status(400).send({error: err});}
      else {
        res.send(doc.value);
      }
    });
}

module.exports = { create };