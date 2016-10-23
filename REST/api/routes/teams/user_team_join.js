var Team = require('../../models/teams');
var https = require('https');
module.exports = function(app,router){
	router.post('/jointeam/:user_email',function(req,res){
		Team.findOne({name:req.body.name},function(err,team){
			if(err) throw err;
			else if(!team){
				res.status(404).json({devMessage:"No Such Team Exists"});			
			} 
			else if(team){
				if(req.body.team_code !== team.team_code ){
					res.status(400).json({devMessage:"Wrong team code."});
				}
				else{
					if(team.members.indexOf(req.params.user_email) == -1){
						var query = {name:req.body.name};
						var update = {$push:{"members":req.params.user_email}};
						var options = {safe: true, upsert: true, new : true};
						Team.update(query,update,options,function(err){
							if(err) throw err;
							else res.status(200).json({devMessage:"Successfully Added to the team"});
						});	
					}
					else{
						res.status(400).json({devMessage:"Member already exist"});
					}	
				}
			}
		});
	});
};