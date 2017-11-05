var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// commonly this uses '/' for home page (index)
// but this '*' means everything that gets to the server gets the index page 
// and the client side figures out the right page/view => No 404 errors though
app.get('*', function(req, res) {

  console.log(`> Got a request for url:${req.url} at ${Date()}`)

  res.render('index');
}); 

var port = 3030;
app.listen(port);

console.log(`Listening on port ${port} ...`);