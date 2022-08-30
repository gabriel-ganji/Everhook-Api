var mongodb = require("mongodb");
const database = require("./database/connection");
const acesses = require("./database/collection");

const getDataByToken = async function (tokenUUID) {

    try {
        const dataByToken = await acesses.find({ token: tokenUUID }).toArray();
        return dataByToken;
    } catch (error) {
        return 'Ops';   
    }
};

module.exports = getDataByToken;