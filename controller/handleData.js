const time = require("./timePost");

const saveOnMongo = require("../middleware/saveOnMongo");

const dataReq = function (uuid, req, typeRequest) {
    
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

    if (Object.keys(req.body).length == 0) {
       
        webhookRequest.body = "";
        webhookRequest.form_values = "";
        
    } else {
       
        webhookRequest.body = req.body;
        const array = [];
        
        let formValue = Object.values(req.body)[0];
        formValue = formValue.replaceAll("g%40", "@");
        formValue = formValue.replaceAll("%20", " ");
        formValue = formValue.replaceAll("%3A", ":");
        formValue = formValue.replaceAll("%C3%8", "");
        formValue = formValue.split("&");
    
        for (i of formValue) {
            const a = i.split("=");
            array.push(a);
        }

        const formValueEnd = {}

        for (let i = 0; i < array.length; i++) {
            
            if (i == 0) {
                formValueEnd[Object.keys(req.body)] = array[i][0];
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