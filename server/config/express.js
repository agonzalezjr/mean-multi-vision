var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');


module.exports = function(app, config) {
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  // middleware stuff

  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  app.use(logger('dev'));

  // to enable parsing url and json encoded bodies
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({
    secret: 'multi vision unicorns',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compile
    }
  ));

  // whenever there is a request that matches a file in public, just go ahead and serve
  // the file (for example favicon.ico)
  app.use(express.static(config.rootPath + '/public'));
};
