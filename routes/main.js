var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose'),
    User = mongoose.model('User');

    passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._i);
    done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
    	console.log(user);
    		if(!err) done(null, user);
    		else done(err, null);
    	});
    });

passport.use(new GithubStrategy({
clientID: 'cb9fdbd2a04546f32122',
clientSecret: '0c9bf53b7d0000cfeace77307f2351e4eed41b69',
callbackURL: 'http://localhost:3000/auth/callback'
},
function(accessToken, refreshToken, profile, done) {
	User.findOne({ oauthID: profile.id }, function(err, user) {
		if(err) {
			console.log(err);  // handle errors!
		}
		if (!err && user !== null) {
			done(null, user);
		} else {
			user = new User({
				oauthID: profile.id,
				name: profile.displayName,
				created: Date.now()
			});
			user.save(function(err) {
				if(err) {
					console.log(err);  // handle errors!
				} else {
					console.log("saving user ... " + user.name);

					done(null, user);
				}
			});
		}
	});
}
));




module.exports = {

	index: function(req, res) {
		res.render('main', { title: 'My Basic TodoApp', name:User.name });
	},

  logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

	callback : function(req, res){

	  // In the real application you might need to check
	  // whether the user exits and if exists redirect
	  // or if not you many need to create user.


		res.redirect('/');



	},

	error : function(req, res){
	  res.send('Login Failed');
	}


};
