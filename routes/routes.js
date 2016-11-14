var express = require('express');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;




module.exports = function(app){
	// register route controllers
	var main = require('../routes/main');
	var todo = require('../routes/todo');
	var todoRouter = express.Router();
	app.use('/todos', todoRouter);

	app.get('/', main.index);
	app.get('/auth', passport.authenticate('github'));
	app.get('/auth/error', main.error);
	app.get('/auth/callback',passport.authenticate('github', {failureRedirect: '/auth/error'}),
  main.callback);
	app.get('/logout', main.logout);
	todoRouter.get('/', todo.all);
	todoRouter.get('/:id', todo.viewOne);
	todoRouter.post('/create', todo.create);
	todoRouter.post('/destroy/:id', todo.destroy);
	todoRouter.post('/edit/:id', todo.edit);
	todoRouter.post('/sortdate', todo.sortByDate);
	todoRouter.post('/sortpriority', todo.sortByPriority);
	todoRouter.post('/complete/:id', todo.markCompleted);


};
