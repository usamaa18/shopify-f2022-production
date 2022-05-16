const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require("../app")
const Warehouse = require("../src/models/warehouse")
chai.use(chaiHttp)
chai.should()

const sampleWarehouses = [{
    "name": "Edmonton",
    "latitude": 53.631611,
    "longitude": -113.323975
}, {
    "name": "Vancouver",
    "latitude": 49.2827,
    "longitude": -123.116226
}, {
    "name": "Toronto",
    "latitude": 43.651070,
    "longitude": -79.347015
}];

describe("Warehouses", () => {
    // Before all the tests we empty the warehouse database
    before((done) => { 

        Warehouse.deleteMany({}, (err) => {
            if (err) { done(err); }
            else { done(); }
        });
    });
    let path = "/v1/warehouses";
    describe("POST " + path, () => {
        sampleWarehouses.forEach(function (warehouse, i) {
            it('Create ' + warehouse.name + ' Warehouse', function (done) {
                chai.request(app)
                    .post(path)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(warehouse)
                    .end(function (err, res, body) {
                        if (err) {
                            done(err);
                        } else {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property("_id");
                            warehouse._id = res.body._id;
                            done();
                        }
                    });
            });
        });

    })

});

module.exports = sampleWarehouses;