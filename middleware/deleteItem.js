const acesses = require("../database/collection");

const deleteItens = async function (uuid) {
    
    //await acesses.deleteOne({ token: uuid });

    acesses('posts', function(err, collection) {
    collection.deleteOne({_id: new mongodb.ObjectID('4d512b45cc9374271b00000f')});
});
    
};

module.exports = deleteItens;
