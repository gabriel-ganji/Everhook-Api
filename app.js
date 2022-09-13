const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const cors = require('cors');

app.use(cors());
app.use(xmlparser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({type: ['text/*', '*/*']}));
app.use(express.json());

const rotasApi = require("./routes/routesApi");

const rotaApresentation = require("./routes/routeApresentation");

app.use("/ever/", rotasApi);
app.use("/", rotaApresentation);

module.exports = app;
