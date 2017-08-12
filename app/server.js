var env = require('node-env-file');
var express = require('express');
var bodyParser = require('body-parser');
var createAnUrlAction = require('./shortener/application/create-an-url-action');
var homePageAction = require('./shortener/application/home-page-action');
var obtainAnUrlAction = require('./shortener/application/obtain-an-url-action');

env(__dirname + '/../.env');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", homePageAction);
app.get("/p/:url", obtainAnUrlAction);
app.post("/api/short-urls", createAnUrlAction);

var listener = app.listen(process.env.PORT || 4200, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
