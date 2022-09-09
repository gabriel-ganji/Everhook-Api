const mongoose = require("mongoose");
let created_at = new Date();
    created_at = created_at;
//old way
const Acess = mongoose.model('Acess', {
    token: {type:string, required:true},
    header: {},
    body: {},
    form_value: {},
    created_at: {type:Date, required:true, default: new Date()}
});

module.exports = Acess;