var Repository = require('../model/repository');

module.exports = function (request, response) {
  var repository = new Repository();

  repository
    .byShortUrl(request.params.url)
    .then(function (data) {
      response.redirect(data[0].original_url);
    })
    .catch(function (e) {
      response.status(404).send('Page not found.')
    });
};
