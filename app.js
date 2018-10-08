const
    express                 = require('express'),
    bodyParser              = require('body-parser'),
    expressSanitizer        = require('express-sanitizer'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    localStrategy           = require('passport-local'),
    app                     = express(),
    Topist                  = require('./models/topist'),
    Entry                   = require('./models/entry'),
    User                    = require('./models/user'),
    faker                   = require('faker');


// Configuration ----------------------------------------------

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
	secret: "027e67fa-cafe-11e8-a8d5-f2801f1b9fd1",
	resave: false,
	saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/topistDB', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes -----------------------------------------------------

app.get('/', (req, res) => {
    Topist.find({}, (err, topists) => {
        if(!err)
            res.render('index', {data: topists});
    });
});

app.post('/topist', (req, res) => {
    const _topist = JSON.parse(req.sanitize(req.body.topist));
    
    _topist.date = new Date(_topist.date);

    Topist.create(
        {
            topic: _topist.topic,
            description: _topist.description,
            user: _topist.use
        },
        (err, topist) => {
            if(!err) {
                _topist.entries.forEach(__entry => {
                    const _entry = new Entry({
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
    const __id = req.params.id;

    Topist.findOne({ _id: __id }).populate('entries').exec((err, _topist) => {
        if(err)
            res.render('error');
        else {
            Topist.findOneAndUpdate({_id: __id}, {$inc : {'views' : 1}}).exec();
            res.render('topist/index', { data: _topist });
        }
    });
});

app.get('*', (req, res) => {
    res.render('error');
});

app.listen(app.get('port'), () => console.log('Topist started successfully!'));