//Packages needed
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//Express server
var app = express();

//Initial port for listener
var PORT = process.env.PORT || 8080;

var jsonParser = bodyParser.json();

var urlEncodedParser = bodyParser.urlencoded({ extended: false})

app.use(bodyParser.json({type: "application/*+json"}))

app.use(bodyParser.raw({ type: "application/vnd.custom-type"}))

app.use(bodyParser.text({type: "text/html" }))

require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);
//Listener to start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});