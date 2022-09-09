const Acess = require("./database/collection");

const createID = function () {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-yxyxy-yxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}

const save = function (data) {
    
    const array = [];

    let formValue = data.body.hottok;
    formValue = formValue.split("&");
    for (i of formValue) {
        const a = i.split("=");
        array.push(a);
    }
    console.log(array);

    const formValueEnd = {}

    for (let i = 0; i < array.length; i++) {
        
        if (i == 0) {
            formValueEnd["hottok"] = array[i][0];
        } else {
            console.log(array[i]);
            let a = array[i];
            if (a[1] == '') {
                formValueEnd[a[0]] = 'empty';
            } else {
                formValueEnd[a[0]] = a[1];
            }
        }
        
    }

    console.log(formValueEnd);

    const id = createID();
    const token = data.header.uuid;
    const header = data.header;
    const body = data.body;
    const form_value = formValueEnd;
    let created_at = new Date();
    created_at = created_at;

    const acess = { id, token, header, body, form_value, created_at };
    
    try {
        Acess.createIndex({ "created_at": 1 }, { expireAfterSeconds: 259200 });
        Acess.insertOne(acess);
        return { message: "Dados armazenados com sucesso no MongoDBAtlas"}
    } catch (error) {
        return error

    }

}

module.exports = save;