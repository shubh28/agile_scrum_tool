var Team = require('../../models/teams');

module.exports = function(app,router){
	router.post('/createteam/:user_email',function(req,res){
		Team.find({name:req.body.name},function(err,team){
			if(err) throw err;
			else if(team.length){
				res.status(400).json({devMessage:"Team with same name exists"});			
			} 
			else if(!team.length){
				var team = new Team({
					name : req.body.name,
					admin : req.params.user_email,
					team_code : req.body.team_code,
					phases : req.body.phases,
					members : req.params.user_email
				});
				team.save(function(err){

					if(err) throw err;
					else res.status(201).json({devMessage:"Team Successfully created"});
				})
			}
		});
	});
};