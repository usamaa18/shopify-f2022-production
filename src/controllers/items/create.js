const req = require('express/lib/request');
const Item = require("../../models/item");
const sharp = require('sharp');
const mongoose = require('mongoose');



const createItem = async (req, res) => {

  // check that all the required item properties are passed via req.body
  const reqProps = ["name", "quantity", "price", "city"];
  if (reqProps.some(x => !(x in req.body))) {
    res.status(400).send("Incomplete form");
    return;
  }

  id = new mongoose.Types.ObjectId();
  image = id; // in a real deployment, this would instead be the url to the image served by a cdn

  const obj = {
    _id: id,
    name: req.body.name,
    quantity: new Number(req.body.quantity),
    price: new Number(req.body.price),
    city: req.body.city,
    ...("description" in req.body && req.body.description !== "") && { desc: req.body.description },
    ...("tags" in req.body && req.body.tags.length > 0) && { tags: req.body.tags }
  };

  const sendReq = async () => Item.create(obj, (err, doc) => {
    if (err) { res.status(400).send({ error: err }); }
    else {
      res.send(doc);
    }
  });

  if (req.file && req.file.mimetype.slice(0, 5) == "image") {
    sharp(req.file.buffer).resize(256, 256).toFile("./public/images/" + image + ".jpg").then(info => {
      obj["image"] = image;
      sendReq();
      
    }).catch(err => { res.status(500).send(err) });
  } else {
    sendReq();
  }

}

module.exports = { createItem };