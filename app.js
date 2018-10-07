const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    faker = require('faker'),
    topist = require('./models/topist'),
    entrie = require('./models/entry'),
    PORT = process.env.PORT || 3000;


// Configuration ----------------------------------------------

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/topistDB', { useNewUrlParser: true });


// Routes -----------------------------------------------------

app.get('/', (req, res) => {
    res.render('index', {data: data});
});

app.post('/topist', (req, res) => {
    const topist = JSON.parse(req.body.topist);
    
    topist.date = new Date(topist.date);
    data.push(topist);
});

app.get('/topist/new', (req, res) => {
    res.render('topist/new');
});

app.get('/topist/:id', (req, res) => {
    let dataList = getList(req.params.id);

    if(dataList === null)
        res.send('Page not found');
    else 
        res.render('topist/index', {data: dataList});
});

app.get('*', (req, res) => {
    res.send('Page not found');
});

app.listen(PORT, () => console.log('Topist started successfully!'));