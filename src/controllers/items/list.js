const mongoose = require('mongoose');
const Item = require("../../models/item");

const listItems = async (req, res) => {

    const searchObj = { _id: mongoose.Types.ObjectId(req.query.itemId) };

    Item.find(
        {},
        (err, doc) => {
            if (err) { res.status(400).send({ error: err }); }
            else if (doc == null) {res.status(404).send("No items to show");} 
            else {
                res.send(doc);
            }
        }
    );

}

module.exports = { listItems };