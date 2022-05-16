const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require("../app")
const Warehouse = require("../src/models/warehouse")
const Item = require("../src/models/item")
const req = require('express/lib/request')
const expect = chai.expect
chai.use(chaiHttp)
chai.should()
var testWarehouseId;


describe("Items", () => {
    // before, all tests we create a test warehouse,  and clear 
    before((done) => { 
        let obj = {
            name: "Test warehouse",
            location: {
                type: 'Point',
                coordinates: [-33.49896, 0.35700]
            }
        };
        Warehouse.create(obj, (err, res) => {
            if (err) { done(err); }
            else {
                testWarehouseId = res._id.toString();
                Item.deleteMany({}, (err) => {
                    if (err) { done(err); }
                    else { done(); }
                });
            }
        });
    });

    // after, we delete the test warehouse
    after((done) => {
        Warehouse.deleteOne({ _id: testWarehouseId }, (err) => {
            if (err) { done(err); }
            else { done(); }
        });
    });


    let path = "/v1/items";
    let itemObj = {};
    describe("GET " + path, function (done) {
        it("Get All Items", (done) => {
            chai.request(app)
                .get(path)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.equal(0);
                    done();
                });
        });
    });

    describe("POST " + path + "{id}", function (done) {
        it('Create Sample Item', function (done) {
            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    "description": "iPhone 13",
                    "weight": 3.3,
                    "length": 10,
                    "width": 5,
                    "height": 3,
                    "warehouseId": testWarehouseId
                })
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        itemObj = res.body;
                        done();
                    }
                });
        });

        it('Edit Sample Item', function (done) {
            chai.request(app)
                .post(path + "/" + itemObj._id)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    "weight": 20
                })
                .end(function (err, res, body) {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.weight.should.equal(20);
                        res.body.should.have.property("_id");
                        res.body.weight.should.equal(20);
                        done();
                    }
                });
        });

    });



    describe("DELETE " + path + "{id}", function (done) {
        it("Delete Sample Item", (done) => {
            chai.request(app)
                .delete(path + "/" + itemObj._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});