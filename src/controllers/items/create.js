const mongoose = require('mongoose');
const Item = require("../../models/item");

const createItem = async (req, res) => {
  const reqProps = ["description", "weight", "length", "width", "height", "warehouseId"];
  if (reqProps.some(x => !(x in req.body))) {
    res.status(400).send("Incomplete form");
    return;
  }
  if (!req.body.warehouseId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).send("Invalid warehouseId format, must follow MongoDB ObjectId requirements");
    return;
  }
  const obj = {
    desc: req.body.description,
    weight: new Number(req.body.weight),
    length: new Number(req.body.length),
    width: new Number(req.body.width),
    height: new Number(req.body.height),
    warehouseId: mongoose.Types.ObjectId(req.body.warehouseId)
  };
  Item.create(obj, (err, doc) => {
    if (err) { res.status(400).send({ error: err }); }
    else {
      res.send(doc);
    }
  });
}

module.exports = { createItem };