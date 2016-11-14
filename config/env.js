var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

module.exports = {
	development: {
		rootPath: rootPath,
		database: 'mongodb://ashley:M.o.m.p.9@ds149557.mlab.com:49557/todosash',
		port: process.env.PORT || 3000
	},

};
