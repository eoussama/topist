const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    faker = require('faker'),
    PORT = process.env.PORT || 3000;

// Configuration ----------------------------------------------

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/topistDB', { useNewUrlParser: true });

var data = [];

for(let i = 0; i<20; i++) {
    let
        _rand = Math.floor(Math.random() * 50) + 3,
        obj = {
            _id: faker.random.uuid(),
            topic: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            date: faker.date.past(),
            user: faker.internet.userName(),
            upvotes: faker.random.number(),
            downvotes: faker.random.number(),
            views: faker.random.number(),
            entries: []
        };

    for(let j = 0; j<_rand; j++) {
        obj.entries.push({
            position: j + 1,
            title: faker.lorem.words(),
            subtitle: faker.lorem.words(),
            picture: faker.internet.avatar(),
            description: faker.lorem.paragraph()
        });
    }

    data.push(obj);
}

function getList(_id) {
    let temp = null;

    data.forEach(dt => {
        if(dt._id == _id)
            temp = dt;
    });

    return temp;
}

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