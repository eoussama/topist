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
	path = require('path'),
	express = require('express'),
	app = express(),
	routers = {
		index: require('./routes/index')
	};


// Setting up the app.
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '127.0.0.1');
app.set("view engine", "ejs");


// Static assets.
app.use('/assets', express.static(path.join(__dirname + '/public')));
app.use('/assets', express.static(path.join(__dirname + '/bower_components')));


// Routing.
app.use(routers.index);


// Error redirecting.
app.get('*', (req, res) => {

	// Rendering the error.ejs template.
	return res.render('error');
});


// Listening.
app.listen(app.get('port'), app.get('ip'), () => {

	// Logging.
	console.log(`Topist has successfully started on port ${app.get('port')}`);
});
