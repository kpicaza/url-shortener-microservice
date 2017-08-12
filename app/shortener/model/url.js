
module.exports = function (url, shortUrl) {

  var validUrl;
  var short;

  var construct = function (url, shortUrl) {
    validUrl = url;
    short = shortUrl;
  };

  construct(url, shortUrl);

  this.url = function () {
    return validUrl;
  };

  this.shortUrl = function () {
    return process.env.SITE_URL + 'p/' + short;
  };

  this.shortId = function () {
    return short;
  };

  return this;
};
