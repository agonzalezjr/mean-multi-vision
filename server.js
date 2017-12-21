var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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

let dbConn = 'mongodb://andy:multivision@ds119406.mlab.com:19406/multivision_agjr';
if (env === 'development') {
  dbConn = 'mongodb://localhost/multivision';
}

mongoose.connect(dbConn, {
  useMongoClient: true
}).then(function(db) {
  console.log(`multivision db opened! (${dbConn})`);
}).catch(function(err) {
  console.error(`connection error ... ${err}`);
});

// Should all this happen after the connect promise resolves??
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

var port = process.env.PORT || 3030;
app.listen(port);

console.log(`Listening on port ${port} ...`);