var mysql      = require('mysql');
var pool = '';

ArticleProvider = function() {
	this.pool = mysql.createPool({
        host     : 'localhost',
		database : 'blognodejs',
        user     : 'root',
        password : ''});
};

ArticleProvider.prototype.findAll = function(callback) {
	
	this.pool.getConnection(function(err, connection) {	
		connection.query('SELECT * From articles', function(error, rows) {
		 if( error ) callback(error)
		 else callback(null,  rows);
		});
	});
};


ArticleProvider.prototype.findById = function(id, callback) {
	
	this.pool.getConnection(function(err, connection) {	
		connection.query('SELECT * From articles WHERE id=' + connection.escape(id), function(error, rows) {
		 if( error ) callback(error)
		 else callback(null, rows);
		});
	});
};

ArticleProvider.prototype.save = function(article, callback) {
	this.pool.getConnection(function(error, connection) {
      if( error ) callback(error)
      else {
        connection.query('INSERT INTO articles SET ?', article , function(error, result) {
		if( error ) callback(error)
		else callback(null, result);
		});
      }
    });
};

exports.ArticleProvider = ArticleProvider;