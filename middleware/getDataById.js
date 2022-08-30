const acesses = require("./database/collection");

const getDataById = async function (id){
    
    try {
        const dataById = await acesses.find({ id: id }).toArray();
        return dataById;
    } catch {
        return 400;
    }
   
}

module.exports = getDataById;