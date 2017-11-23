var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', paht);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// middleware stuff

// to turn on logging
app.use(logger('dev'));

// to enable parsing url and json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));

// whenever there is a request that matches a file in public, just go ahead and serve
// the file (for example favicon.ico)
app.use(express.static(__dirname + '/public'));

// To start mongo:
// cd ~ && mongod -f data/mongod.conf
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error ... '));
db.once('open', () => {
  console.log('multivision db opened!');
});

var messageSchema = mongoose.Schema({
  message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  if (err) {
    console.error(err);
    return;
  }
  if (messageDoc) {
    mongoMessage = messageDoc.message;
  } else {
    mongoMessage = 'Nada!';
  }
});

app.get('/partials/:partialPath', function(req, res) {
  console.log(`> Got a request for partial at url:${req.url} at ${Date()}`)
  res.render('partials/' + req.params.partialPath);
});

// commonly this uses '/' for home page (index)
// but this '*' means everything that gets to the server gets the index page 
// and the client side figures out the right page/view => No 404 errors though
app.get('*', function(req, res) {
  console.log(`> Got a request for url:${req.url} at ${Date()}`)
  res.render('index', {
    mongoMessage: mongoMessage
  });
}); 

var port = 3030;
app.listen(port);

console.log(`Listening on port ${port} ...`);