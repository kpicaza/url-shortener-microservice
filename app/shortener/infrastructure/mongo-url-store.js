var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      var store = new Store(db);

      // Returns Promise.
      var callable = store[method];

      callable(data).then(function (data) {
        resolve(data);
      });
    });
  });
};

function Store(db) {

  var vm = this;
  var collection;

  var construct = function (db) {
    collection = db.collection('urls');
  };

  var find = function (criteria) {
    return new Promise(function (resolve, reject) {
      collection
        .find(criteria)
        .toArray(function (err, documents) {
          if (err) {
            reject(err);
          }

          resolve(documents);

          db.close();
        });
    });
  };

  construct(db);

  this.findByShortUrl = function(shortUrl) {
    return find({
      shortUrl: shortUrl
    });
  };

  this.findByUrl = function(url) {
    return find({
      url: url
    });
  };

  this.insert = function (urlData) {
    return new Promise(function (resolve, reject) {
      collection.insert({
        url: urlData.url,
        shortUrl: urlData.shortUrl
      }, function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(vm.findByShortUrl(urlData.shortUrl));
      });
    });
  };

  return this;
}
