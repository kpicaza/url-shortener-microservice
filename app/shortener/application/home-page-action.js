var path = require('path');
var pug = require('pug');

module.exports = function (request, response) {
  var view = pug.compileFile(path.resolve('views/index.pug'));

  response.send(view({
    siteUrl: process.env.SITE_URL
  }));
};
