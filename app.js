const
    express                 = require('express'),
    bodyParser              = require('body-parser'),
    expressSanitizer        = require('express-sanitizer'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    passportLocal           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    app                     = express(),
    topist                  = require('./models/topist'),
    entry                   = require('./models/entry'),
    faker                   = require('faker');


// Configuration ----------------------------------------------

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

mongoose.connect('mongodb://localhost:27017/topistDB', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

var count = 0;
// Routes -----------------------------------------------------

app.get('/', (req, res) => {
    topist.find({}, (err, topists) => {
        if(!err)
            res.render('index', {data: topists});
    });
});

app.post('/topist', (req, res) => {
    const _topist = JSON.parse(req.sanitize(req.body.topist));
    
    _topist.date = new Date(_topist.date);

    topist.create(
        {
            topic: _topist.topic,
            description: _topist.description,
            user: _topist.use
        },
        (err, topist) => {
            if(!err) {
                _topist.entries.forEach(__entry => {
                    const _entry = new entry({
                        position: __entry.position,
                        title: __entry.title,
                        subtitle: __entry.subtitle,
                        picture: __entry.picture,
                        description: __entry.description
                    });

                    topist.entries.push(_entry);
                    _entry.save();
                });

                topist.save();
            }
        });
});

app.get('/topist/new', (req, res) => {
    res.render('topist/new');
});

app.get('/topist/:id', (req, res) => {
    const __id = req.params.id; ++count;

    topist.findOne({ _id: __id }).populate('entries').exec((err, _topist) => {
        if(err)
            res.render('error');
        else {
            topist.findOneAndUpdate({_id: __id}, {$inc : {'views' : 1}}).exec();
            res.render('topist/index', { data: _topist });
        }
    });
});

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(app.get('port'), () => console.log('Topist started successfully!'));