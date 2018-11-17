//Packages needed
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

//Express server
var app = express();

//Initial port for listener
var PORT = process.env.PORT || 8080;


//Express app parses data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listener to start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});