const time = require("./timePost");

const saveOnMongo = require("../middleware/saveOnMongo");

const dataReq = function (uuid, req, typeRequest) {
    console.log(req);
    const fullRequest = req;

    const webhookRequest = {
        header: {},
        body: {},
        form_values: {}
    }
    
    const header = new Object();

    for (let i = 0; i < fullRequest.rawHeaders.length; i += 2) {
        header[fullRequest.rawHeaders[i]] = fullRequest.rawHeaders[i + 1];
    }

    header["uuid"] = uuid;
    header["date"] = time();
    header["Type_Request"] = typeRequest;
    webhookRequest.header = header;
    console.log("req body", Object.keys(req.body).length);

    if (Object.keys(req.body).length == 0) {
        console.log('Estamos em if');
        webhookRequest.body = "";
        webhookRequest.form_values = "";
        
    } else {
        console.log('Estamos em else');
        webhookRequest.body = req.body;
        const array = [];
        
        let formValue = Object.values(req.body)[0];
        formValue = formValue.split("&");
    
        for (i of formValue) {
            const a = i.split("=");
            array.push(a);
        }

        const formValueEnd = {}

        for (let i = 0; i < array.length; i++) {
            
            if (i == 0) {
                formValueEnd["hottok"] = array[i][0];
            } else {
            
                let a = array[i];
                
                if (a[1] == '') {
                    formValueEnd[a[0]] = 'empty';
                } else {
                    formValueEnd[a[0]] = a[1];
                }
            }
        }
        webhookRequest.form_values = formValueEnd;
    }

    const status = saveOnMongo(webhookRequest);
    return status;
}

module.exports = dataReq;