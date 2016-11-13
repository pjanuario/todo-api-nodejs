var express = require('express');
var session = require('express-session')
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressValidator=require('express-validator');

var favicon = require('serve-favicon');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
console.log('serializeUser: ' + user._id);
done(null, user._id);
});
passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user){
	console.log(user);
		if(!err) done(null, user);
		else done(err, null);
	});
});








module.exports = function(app, envConfig){
	// view engine setup

	app.set('views', path.join(envConfig.rootPath, 'views'));
	app.set('view engine', 'jade');

	//app.use(favicon(envConfig.rootPath + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
	app.use(cookieParser());


	app.use(passport.initialize());
	app.use(passport.session());

// 	app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;
//
//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));
//
// app.use(flash());

app.use(function(req,res,next){
	res.locals.success_msg=req.flash("success_msg");
	next();
})





	// telling Express to serve static objects from the /public/ dir, but make it seem like the top level
	app.use(express.static(path.join(envConfig.rootPath, 'public')));
};
