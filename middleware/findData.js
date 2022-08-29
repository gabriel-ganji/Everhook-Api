const acess = require("../database/collection");
const mongodb =  require('mongodb');


const searchAcess = async (search) => {

    try {

      var _results = [];
      var _result = await acess.find({
        "_id": { $regex: search, $options: "i" },
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        token: { $regex: search, $options: "i" },
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Host": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Connection": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Accept": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Accept-Encoding": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Origin": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.User-Agent": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.Referer": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.uuid": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "header.date": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      var _result = await acess.find({
        "body": {$regex: search, $options: "i"},
      }).toArray();
      _results = _results.concat(_result);

      _result = await acess.find({
        created_at: { $regex: search, $options: "i" },
      }).toArray();
      _results = _results.concat(_result);

  
      var _unique = [];

      for (let x = 0; x < _results.length; x++) {
        const elementX = JSON.parse(JSON.stringify(_results[x]));
        var _contain = false;
        for (let y = 0; y < _unique.length; y++) {
          const elementY = JSON.parse(JSON.stringify(_unique[y]));
          if (elementX._id === elementY._id) {
            _contain = true;
            break;
          }
        }
        if (!_contain) {
          _unique.push(elementX);
        }
      }
      return _unique;
    } catch (error) {
      return { error: true, message: error, status: 400 };
    }
};
  
module.exports = searchAcess;