const mongoose = require('mongoose');
const Item = require("../../models/item");

const editItem = async (req, res) => {
    if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send("Invalid itemId format, must follow MongoDB ObjectId requirements");
        return;
    }
    if ("warehouseId" in req.body && req.body.warehouseId !== "") {
        if (!req.body.warehouseId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send("Invalid warehouseId format, must follow MongoDB ObjectId requirements");
            return;
        }
        else {
            warehouseId = mongoose.Types.ObjectId(req.body.warehouseId);
        }       
    }


    const searchObj = { _id: mongoose.Types.ObjectId(req.params.itemId) };


    // conditionally add properties to object, since we only need to update certain fields and not repalce the whole doc
    // for each property we check for two conditions
    // condition 1: the property must exist in the req.body
    // condition 2: the property must not be an empty string (which can definetly occur if using html-only forms)
    // only when condition 1 and 2 are met, do we add that property to the updateObj 
    // https://stackoverflow.com/a/51200448
    const updateObj = {
        ...("description" in req.body && req.body.description !== "") && { desc: req.body.description },
        ...("weight" in req.body && req.body.weight !== "") && { weight: new Number(req.body.weight) },
        ...("length" in req.body && req.body.length !== "") && { length: new Number(req.body.length) },
        ...("width" in req.body && req.body.width !== "") && { width: new Number(req.body.width) },
        ...("height" in req.body && req.body.height !== "") && { height: new Number(req.body.height) },
        ...("warehouseId" in req.body && req.body.warehouseId !== "") && { warehouseId: warehouseId }
    };


    Item.findOneAndUpdate(
        searchObj,
        updateObj,
        {
            new: true, // return updated object
            runValidators: true, // validify data
        },
        (err, doc) => {
            if (err) { res.status(400).send({ error: err }); }
            else if (doc == null) {res.status(404).send("Invalid item (itemId not found in DB)");}
            else {
                res.send(doc);
            }
        }
    );

}

module.exports = { editItem };