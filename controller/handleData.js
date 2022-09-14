const time = require("./timePost");

const saveOnMongo = require("../middleware/saveOnMongo");

const dataReq = function (uuid, req, typeRequest) {
    
    const fullRequest = req;
    console.log(req);
    console.log(req.body);

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

        if (Object.keys(req.body).length > 1) {
            webhookRequest.body = req.body;
            const array = [];
            let formValue = req.body;
            /*formValue = formValue.replaceAll("g%40", "@");
            formValue = formValue.replaceAll("%20", " ");
            formValue = formValue.replaceAll("%3A", ":");
            formValue = formValue.replaceAll('%C3%87%C3%83', 'ÇÃ');
            formValue = formValue.replaceAll('%C3%81', 'Á');
            formValue = formValue.split("&");*/
    
            for (i of formValue) {
                const a = i.split("=");
                array.push(a);
            }

            const formValueEnd = {}

            for (let i = 0; i < array.length; i++) {
            
                let a = array[i];
            
                if (a[1] == '') {
                    formValueEnd[a[0]] = 'empty';
                } else {
                    formValueEnd[a[0]] = a[1];
                }
        
            }
            webhookRequest.form_values = formValueEnd;
        
        } else {
       
            webhookRequest.body = req.body;
            const array = [];
        
            let formValue = Object.values(req.body)[0];
            /*formValue = formValue.replaceAll("g%40", "@");
            formValue = formValue.replaceAll("%20", " ");
            formValue = formValue.replaceAll("%3A", ":");
            formValue = formValue.replaceAll('%C3%87%C3%83', 'ÇÃ');
            formValue = formValue.replaceAll('%C3%81', 'Á');
            formValue = formValue.split("&");*/
    
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
    }
    console.log(webhookRequest.form_values);
    const status = saveOnMongo(webhookRequest);
    return status;
}

module.exports = dataReq;