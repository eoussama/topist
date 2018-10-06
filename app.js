const
    express = require('express'),
    app = express(),
    faker = require('faker'),
    PORT = process.env.PORT || 3000;

// Configuration ----------------------------------------------

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

var data = [];

for(let i = 0; i<20; i++) {
    let
        _rand = Math.floor(Math.random() * 50) + 3,
        obj = {
            _id: faker.random.uuid(),
            title: `TOP ${_rand} ${faker.lorem.word()}`,
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
            title: faker.lorem.words(),
            picture: faker.internet.avatar(),
            description: faker.lorem.paragraph()
        });
    }

    data.push(obj);
}

// Routes -----------------------------------------------------

app.get('/', (req, res) => {
    res.render('index', {data: data});
});

app.get('/topist/new', (req, res) => {
    res.render('topist/new');
});

app.get('/topist/:id', (req, res) => {
    res.render('topist/index');
});

app.listen(PORT, () => console.log('Topist started successfully!'));