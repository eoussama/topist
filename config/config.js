/**
 * The configuration process
 * 
 * @param {any} express The Express instance
 * @param {any} env The loaded environment variables 
 */
module.exports = function (express, env) {

  // Setting up the app's configurations
  console.log('[Topist]: Setting up the app\'s configurations...');

  // Importing the path utility
  var path = require('path');

  // Instantiating an Express app
  var app = express();

  // Setting up the port.
  app.set('ws_port', 3000);

  // Setting up the database's name
  app.set('db_name', env.DB_NAME || 'topistdb');

  // Setting up the database's port
  app.set('db_port', env.DB_PORT || 27017);

  // Setting up the view engine
  app.set("view engine", "ejs");

  // Setting up the asset middlewares
  console.log('[Topist]: Setting up the app\'s asset middlewares...');

  app.use('/assets', express.static(path.join(__dirname + './../public')));
  app.use('/assets/bulma', express.static(path.join(__dirname + './../node_modules/bulma/css')));
  app.use('/assets/fontawesome', express.static(path.join(__dirname + './../node_modules/@fortawesome/fontawesome-free/css')));
  app.use('/assets/webfonts', express.static(path.join(__dirname + './../node_modules/@fortawesome/fontawesome-free/webfonts')));

  // Returning the Express app object
  return app;
};
