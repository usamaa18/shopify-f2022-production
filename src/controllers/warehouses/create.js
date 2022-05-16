const Warehouse = require('../../models/warehouse');

const createWarehouse = async (req, res) => {
  if (isNaN(req.body.latitude)) {
    res.status(400).send("Invalid latitude format, must be a number");
    return;
  }
  if (isNaN(req.body.longitude)) {
    res.status(400).send("Invalid longitude format, must be a number");
    return;
  }

  const obj = {
    name: req.body.name,
    location: { 
        type: 'Point', 
        coordinates: [new Number(req.body.longitude), new Number(req.body.latitude)] 
    }
  };

  Warehouse.create(obj, (err, doc) => {
    if (err) { res.status(400).send({ error: err }); }
    else {
      res.send(doc);
    }
  });
}

module.exports = { createWarehouse };