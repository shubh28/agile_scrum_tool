var User = require('../models/user');

module.exports = function(app,router){
	router.get('/user',function(req,res){
		User.find(function(err,users){
			if(err) throw err;
			else{
				//console.log(users);
				res.status(200).json(users);				
			} 
		});
	});
};