var Repository = require('../model/repository');

module.exports = function (request, response) {
  var repository = new Repository();

  repository
    .append(request.body.url)
    .then(function (data) {
      response.json(data[0]);
    })
    .catch(function (e) {
      response.status(400).json(e);
    });
};
