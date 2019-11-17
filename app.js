/**
 * 
 * @name:       Topist
 * @version:    1.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/topist
 * 
 * Topist is an open platform for creating all sorts of TOP X lists, 
 * you know, the same crappy lists that WatchMojo is famous for, 
 * it doesn't matter what genre a list is about, Topist is there to house it, 
 * hopefully there is no excessive controversy out of this one, one can only wish.
 * 
 */



// Importing the dependancies.
const
	env = require('dotenv-extended').load({ overrideProcessEnv: true, path: './config/.env' }),
	path = require('path'),
	express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	routers = {
		index: require('./routes/index'),
		topist: require('./routes/topist')
	};

// Setting up the app.
app.set('ws_port', 3000);
app.set('db_host', env.DB_HOST || 'localhost');
app.set('db_name', env.DB_NAME || 'topistdb');
app.set('db_port', env.DB_PORT || 27017);
app.set("view engine", "ejs");

// Connecting to the database.
mongoose.connect(`mongodb://mongo:${app.get('db_port')}/${app.get('db_name')}`, { useNewUrlParser: true });

// Static assets.
app.use('/assets', express.static(path.join(__dirname + '/public')));
app.use('/assets/bulma', express.static(path.join(__dirname + '/node_modules/bulma/css')));
app.use('/assets/fontawesome', express.static(path.join(__dirname + '/node_modules/@fortawesome/fontawesome-free/css')));


// Routing.
app.use(routers.index);
app.use('/topist', routers.topist);


// Error redirecting.
app.get('*', (req, res) => {

	// Rendering the error.ejs template.
	return res.render('error');
});

module.exports = app;
