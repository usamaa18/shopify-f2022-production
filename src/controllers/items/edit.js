const mongoose = require('mongoose');
const Item = require("../../models/item");

const edit = async (req, res) => {
    if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send("Invalid itemId format, must follow MongoDB ObjectId requirements");
        return;
    }
    if ("warehouseId" in req.body) {
        if (!req.body.warehouseId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send("Invalid warehouseId format, must follow MongoDB ObjectId requirements");
            return;
        }
        else {
            warehouseId = mongoose.Types.ObjectId(req.body.warehouseId);
        }       
    }


    let searchObj = { _id: mongoose.Types.ObjectId(req.params.itemId) };


    // conditionally add member to object, since we only need to update certain fields and not repalce the whole doc
    // https://stackoverflow.com/a/51200448
    const updateObj = {
        ...("description" in req.body) && { desc: req.body.description },
        ...("weight" in req.body) && { weight: new Number(req.body.weight) },
        ...("length" in req.body) && { length: new Number(req.body.length) },
        ...("width" in req.body) && { width: new Number(req.body.width) },
        ...("height" in req.body) && { height: new Number(req.body.height) },
        ...("warehouseId" in req.body) && { warehouseId: warehouseId }
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
            else {
                res.send(doc);
            }
        }
    );

}

module.exports = { edit };