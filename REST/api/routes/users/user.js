var User = require('../../models/user');

module.exports = function(app,router){
	router.get('/user/:id',function(req,res){
		User.findOne({_id:req.params.id},function(err,users){
			if(err) throw err;
			else if(!users) res.status(404).json({devMessage:"No Such user."})
			else{
				//console.log(users);
				res.status(200).json({
					id:users._id,
					name:users.name,
					email:users.email
					});
			} 
		});
	});
};