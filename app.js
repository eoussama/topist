const
    express = require('express'),
    app = express();
    PORT = process.env.PORT || 3000;

// Configuration ----------------------------------------------

app.set("view engine", "ejs");


// Routes -----------------------------------------------------

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log('Topist started successfully!');
});