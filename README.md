# Shopify Fall 2022 Backend Challenge (INCOMPLETE)

A simple inventory tracking web application for a logistics company. Requirements can be found [here](https://docs.google.com/document/d/1PoxpoaJymXmFB3iCMhGL6js-ibht7GO_DkCF2elCySU/edit).  A live demo hosted on Repl.it and MondoDB Atlas can be found [here](https://shopify-f2022-backend.usamaa18.repl.co).

### Features
- Create a warehouse
- Create new item
- Edit existing item
- Delete existing item
- Get a list of all items

### Built with
- **Node/Express** backend
- **MongoDB/Mongoose** database
- **Mocha/Chai** for testing

### [API Reference](https://github.com/usamaa18/shopify-f2022-backend#rest-api)




## Instructions

First, set up a MongoDB database ([online](https://www.mongodb.com/docs/manual/installation/#std-label-tutorial-installation) or [local](https://www.mongodb.com/docs/atlas/getting-started/))

Then, clone and change directory:

    git clone https://github.com/usamaa18/shopify-f2022-backend.git
    cd shopify-f2022-backend

Create a .env file and add this line, replacing as neeeded

    MONGODB_URI=<connection uri from your database>

Finally install dependencies and start

    npm install
    npm start

Then you can access the webpage and API on localhost:3000. Note that the sample warehouses on the webpage are only applicable to the project I've hosted on Replit.

## Testing

Automated testing is performed using Mocha/Chai. To run these tests, simply run:

    npm run test

Following test performed on my local machine, with a remote Atlas Database

![Tests screenshot](./tests.PNG)

## Database Schema

### Item

- ID
- desc
- weight
- length
- width
- height
- warehouseId -- (links to Warehouse)

### Warehouse

- ID
- name
- location -- (datatype: [GeoJSON](https://mongoosejs.com/docs/geojson.html))


# REST API

The REST API to the app is described below.

## Get list of items

### Request

`GET /items`

    curl --location --request GET 'http://localhost:3000/v1/items'

### Response

    Status: 200 OK
    Content-Type: application/json

    [{item1}, {item2}, ...]


## Get list of items when no items in inventory

### Request

`GET /items`

    curl --location --request GET 'http://localhost:3000/v1/items'

### Response

    Status: 200 OK
    Content-Type: application/json

    []


## Create new item

### Request

`POST /items`

    curl --location --request POST 'http://localhost:3000/v1/items' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'description=iPhone 13' \
        --data-urlencode 'weight=3.3' \
        --data-urlencode 'length=10' \
        --data-urlencode 'width=5' \
        --data-urlencode 'height=3' \
        --data-urlencode 'warehouseId=6281cff83d222c6c47382462'

### Response

    Status: 200 OK
    Content-Type: application/json

    {
    "desc": "iPhone 13",
    "weight": 3.3,
    "length": 10,
    "width": 5,
    "height": 3,
    "warehouseId": "6281cff83d222c6c47382462",
    "_id": "62826bf6b3f9087a71667a46",
    "__v": 0
    }


## Edit an item

### Request

`POST /items/{id}`

    curl --location --request POST 'http://localhost:3000/v1/items/62826bf6b3f9087a71667a46' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'weight=20'

### Response

    Status: 200 OK
    Content-Type: application/json

    {
    "_id": "62826bf6b3f9087a71667a46",
    "desc": "iPhone 13",
    "weight": 20,
    "length": 10,
    "width": 5,
    "height": 3,
    "warehouseId": "6281cff83d222c6c47382462",
    "__v": 0
    }


## Delete an item

### Request

`DELETE /items/{id}`

    curl --location --request DELETE 'http://localhost:3000/v1/items/62826bf6b3f9087a71667a46'

### Response

    Status: 200 OK
    Content-Type: text/html

    Deleted item successfully


## Delete same item again

### Request

`DELETE /items/{id}`

    curl --location --request DELETE 'http://localhost:3000/v1/items/62826bf6b3f9087a71667a46'

### Response

    Status: 400 BAD REQUEST
    Content-Type: text/html

    Invalid item (itemId not found in DB)


## Edit deleted item

### Request

`POST /items/{id}`

    curl --location --request POST 'http://localhost:3000/v1/items/62826bf6b3f9087a71667a46' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'weight=20'

### Response

    Status: 404 NOT FOUND
    Content-Type: text/html

    Invalid item (itemId not found in DB)


## Create new warehouse

### Request

`POST /warehouses`

    curl --location --request POST 'http://localhost:3000/v1/warehouses' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'name=Montreal' \
        --data-urlencode 'longitude=73.5673' \
        --data-urlencode 'latitude=45.5017'

### Response

    Status: 200 OK
    Content-Type: application/json

    {
    "name": "Montreal",
    "location": {
        "type": "Point",
        "coordinates": [
            73.5673,
            45.5017
        ]
    },
    "_id": "62826ed0b3f9087a71667a50",
    "__v": 0
    }


# References

- Used [express-generator](https://expressjs.com/en/starter/generator.html).
- Used [mongoose-id-validator](https://www.npmjs.com/package/mongoose-id-validator).
- Used Shopify's logo as favicon.ico. No trademark infringement intended.