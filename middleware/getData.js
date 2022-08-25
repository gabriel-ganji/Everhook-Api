const database = require("../database/connection");
const acesses = require("../database/collection");

const getData = async function (tokenUUID) {

    const dataByToken = await acesses.find({ token: tokenUUID }).toArray();
    console.log(dataByToken);
    if (dataByToken === []) {
        return null;
    } else {
        return dataByToken;
    }

};

module.exports = getData;