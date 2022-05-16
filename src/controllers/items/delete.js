const mongoose = require('mongoose');
const Item = require("../../models/item");

const deleteItem = async (req, res) => {
    if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send("Invalid itemId format, must follow MongoDB ObjectId requirements");
        return;
    }

    let searchObj = { _id: mongoose.Types.ObjectId(req.params.itemId) };

    Item.findOneAndDelete(
        searchObj,
        {},
        (err, doc) => {
            if (err) { res.status(400).send({ error: err }); }
            else if (doc == null) {res.status(400).send("Invalid item (itemId not found in DB)");} 
            else {
                res.send("Deleted item successfully");
                // alternatively can do res.send(doc);
            }
        }
    );

}

module.exports = { deleteItem };