const
    express = require('express'),
    app = express();
    PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('index.html');
});

app.listen(PORT, () => {
    console.log('Topist started successfully!');
});