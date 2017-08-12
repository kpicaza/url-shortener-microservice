
var Promise = require('rsvp').Promise;
var shortid = require('shortid');
var store = require('../infrastructure/mongo-url-store');
var checkUrl = require('./url-validator');
var Url = require('./url');

/**
 * Javascript implementation of repository pattern.
 */
module.exports = function () {

  var getCompleteUrl = function (data) {
    var url = new Url(data[0].url, data[0].shortUrl);

    return new Promise(function (resolve, reject) {
      resolve([{
        original_url: url.url(),
        short_url: url.shortUrl()
      }]);
    });
  };

  var nextIdentity = function(url) {

    return store(url, 'findByUrl')
      .then(function (data) {
        if (0 < data.length) {
          return getCompleteUrl(data);
        }

        return shortid.generate();
      });
  };

  this.append = function (url) {

    return checkUrl(url).then(function () {
      return nextIdentity(url).then(function (data) {
        if ('object' === typeof data) {
          return data;
        }

        var anUrl = new Url(url, data);

        return store({
          url: anUrl.url(),
          shortUrl: anUrl.shortId()
        }, 'insert')
          .then(getCompleteUrl);
      });
    });
  };

  this.byShortUrl = function (shortUrl) {

    return store(shortUrl, 'findByShortUrl')
      .then(getCompleteUrl);
  };

};
