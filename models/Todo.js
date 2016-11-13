var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	Schema1=mongoose.Schema

	var userSchema = new Schema1( {
	  oauthID: Number,
	  name: String,
	  created: Date,

	});

	User=mongoose.model('User', userSchema);
	module.exports = mongoose.model('User', userSchema);



// todo model
var todoSchema = new Schema({
		name:String,
    content: {type:String, required:true},
		priority: { type: Number, required:true},
    completed: { type: Boolean, default: false, required:true },
		due_date: {type: Date, required:true},
    updated_at: { type: Date, default: Date.now }
});
 Todo=mongoose.model('Todo', todoSchema);
