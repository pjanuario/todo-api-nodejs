var moment = require('moment');


var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');




  	User = mongoose.model('User');




module.exports = {

    all: function(req, res){
      // if(req.user.name!==null){
        console.log('we are in todo.all')
        Todo.find({name:req.user.name}, function(err, todos){
            if(err) res.render('error', { error: 'Could not fetch items from database :('});
            console.log('in the callback')
            res.render('todos', { todos: todos, moment: moment,name:req.user.name });
        });
      // }
      // else{
      //   console.log("not logged in")
      //   res.redirect("/");
      // }
    },
