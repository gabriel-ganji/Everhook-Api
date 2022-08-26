var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const database = require("../database/connection");
const acesses = require("../database/collection");

const getData = async function (tokenUUID, type='uuid') {

    if (type == 'uuid') {
        const dataByToken = await acesses.find({ token: tokenUUID }).toArray();
        console.log(dataByToken);
        if (dataByToken === []) {
            return null;
        } else {
            return dataByToken;
        }
    } else {
        const dataById = await acesses.find({ _id: new mongodb.ObjectID(tokenUUID.toString()) }).toArray();
        return dataById;
    }
};

module.exports = getData;