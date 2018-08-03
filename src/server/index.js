const express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/index'); // Imports routes for the products
const app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/mongodb';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', product);
app.use(express.static('dist'));

var port = 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});


//app.get('/api/getUsername', (req, res) => res.send({ username: 'sumit' }));
//app.listen(8080, () => console.log('Listening on port 8080!'));
