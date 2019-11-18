/**
 * MongoDB setup
 * 
 * @param {any} app The Express app object
 */
module.exports = function (app) {

  // Importing the dependencies
  var db = require('mongoose');

  // Connecting to the database.
  db.connect('mongodb://mongo:' + app.get('db_port') + '/' + app.get('db_name'), { useNewUrlParser: true })
    .then(function () {
      console.log('[MongoDB]: Successfully connected to the database.');
    })
    .catch(function (err) {
      console.error(err);
    });
};
