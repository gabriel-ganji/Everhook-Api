const acesses = require("../database/collection");

const deleteItem = async function (iid) {
    try {
        await acesses.deleteOne({ id: iid });
        return 200;

      } catch (error) {
        return 400;
      }
};

module.exports = deleteItem;
