var validator = require('valid-url');
var urlExists = require('url-exists');
var Promise = require('rsvp').Promise;

module.exports = function (url) {

  return new Promise(function (resolve, reject) {
    if (!validator.isWebUri(url)) {
      reject({
        error: 'Invalid url format given.'
      });
    }

    return urlExists(url, function (err, exists) {
      if (false === exists) {
        reject({
          error: 'Given url does not exist.'
        });
      }

      resolve(exists);
    });
  });
};
