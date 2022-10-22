
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose'); 

// modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
// database setup 

let db = require('./db');

// point mongoose to the db uri 

mongoose.connect(db.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console,"Connection Error"));
mongoDB.once('open',()=>{
console.log('Connection to MongoDB ...');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contact');



let app = express();


// setting up the view page
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list',contactRouter);

app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));


// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());

app.use(passport.session());


let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//error 
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error',{ title: 'Error' });
});

module.exports = app;
