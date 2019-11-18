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
	db = require('./database/mongo')(app);

module.exports = app;
