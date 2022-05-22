const Item = require("../../models/item");

const listItems = async (req, res) => {
    Item.find(
        {},
        (err, doc) => {
            if (err) { res.status(400).send({ error: err }); }
            else if (doc == null) { res.status(404).send("No items to show"); }
            else {
                res.send({
                    list: doc
                });
            }
        }
    );

}

module.exports = { listItems };