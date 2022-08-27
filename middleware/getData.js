var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const database = require("../database/connection");
const acesses = require("../database/collection");

const getData = async function (tokenUUID) {

    try {
        const dataByToken = await acesses.find({ token: tokenUUID }).toArray();
        return dataByToken;
    } catch (error) {
        return 'Ops';   
    }
};

module.exports = getData;