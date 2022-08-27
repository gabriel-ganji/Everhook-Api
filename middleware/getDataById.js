var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const database = require("../database/connection");
const acesses = require("../database/collection");

const getDataById = async function (id){
    
    try {
        const dataById = await acesses.find({ _id: new mongodb.ObjectID(id.toString()) }).toArray();
        return dataById;
    } catch {
        return "Ops";
    }
   

}

module.exports = getDataById;