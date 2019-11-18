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
var
	env = require('dotenv-extended').load({ overrideProcessEnv: true, path: './config/.env' }),
	express = require('express'),
	app = require('./config/config')(express, env),
	db = require('./database/mongo')(app),
	routers = {
		index: require('./routes/index'),
		topist: require('./routes/topist')
	};

// Routing.
app.use(routers.index);
app.use('/topist', routers.topist);

// Error redirecting.
app.get('*', (req, res) => {

	// Rendering the error.ejs template.
	return res.render('error');
});

module.exports = app;
