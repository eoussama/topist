/**
 * The configuration process
 * 
 * @param {any} app The Express app object 
 * @param {any} env The loaded environment variables 
 */
module.exports = function (app, env) {

  console.log('[Topist]: Setting up the app');

  // Setting up the port.
  app.set('ws_port', 3000);

  // Setting up the database's name
  app.set('db_name', env.DB_NAME || 'topistdb');

  // Setting up the database's port
  app.set('db_port', env.DB_PORT || 27017);

  // Setting up the view engine
  app.set("view engine", "ejs");
};
