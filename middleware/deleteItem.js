const acesses = require("../database/collection");

const deleteItens = async function (uuid) {
    
    await acesses.deleteOne({ token: uuid });
    
    
};

module.exports = deleteItens;
