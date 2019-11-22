/**
 * The configuration process
 * 
 * @param {any} express The Express instance
 * @param {any} env The loaded environment variables 
 */
module.exports = function (express, env) {

  // Setting up the app's configurations
  console.log('[Topist]: Setting up the app\'s configurations...');

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

  // Importing the body-parser utility
  var bodyParser = require('body-parser');

  // Configuring body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Importing the path utility
  var path = require('path');

  app.use('/assets', express.static(path.join(__dirname + './../public')));
  app.use('/assets/bulma', express.static(path.join(__dirname + './../node_modules/bulma/css')));
  app.use('/assets/fontawesome', express.static(path.join(__dirname + './../node_modules/@fortawesome/fontawesome-free/css')));
  app.use('/assets/webfonts', express.static(path.join(__dirname + './../node_modules/@fortawesome/fontawesome-free/webfonts')));

  // Setting up the routes
  console.log('[Topist]: Setting up the app\'s routes...');

  // Scaffolding a route object
  var routers = {
    index: require('./../routes/index'),
    topist: require('./../routes/topist')
  };

  // Routing the app
  app.use(routers.index);
  app.use('/topist', routers.topist);

  // Setting up missing pages fallback
  app.get('*', (req, res) => {

    // Rendering the error template
    return res.render('error');
  });

  // Returning the Express app object
  return app;
};
