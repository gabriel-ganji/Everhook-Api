const time = require("./timePost");

const saveOnMongo = require("../middleware/saveOnMongo");

const dataReq = function (uuid, req) {
    
    const fullRequest = req;

    const webhookRequest = {
        header: {},
        body: {}
    }
    
    const header = new Object();

    for (let i = 0; i < fullRequest.rawHeaders.length; i += 2) {
        header[fullRequest.rawHeaders[i]] = fullRequest.rawHeaders[i + 1];
    }

    header["uuid"] = uuid;
    header["date"] = time();

    webhookRequest.header = header;
    
    const hottok = {
        "hottok": ""
    }

    if (req.body.hottok == undefined) {
        console.log('Estamos em if');
        webhookRequest.body = hottok;
    } else {
        console.log('Estamos em else');
        webhookRequest.body = req.body;
    }
    
    console.log(req.body);

    const status = saveOnMongo(webhookRequest);
    return status;
}

module.exports = dataReq;