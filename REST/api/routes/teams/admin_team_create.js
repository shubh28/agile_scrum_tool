var Team = require('../../models/teams');

module.exports = function(app,router){
	router.post('/createteam/:user_email',function(req,res){
		Team.find({name:req.body.name},function(err,team){
			if(err) throw err;
			else if(team.length){
				res.status(400).json({devMessage:"Team with same name exists"});			
			} 
			else if(!team.length){
				// var code = req.body.team_code;
				// var arr = code.split('');
				// //console.log(typeof arr[0]);e
				// for(var i=0;i<arr.length;i++){
				// 	if(arr[i].charCodeAt(0)<=47){
				// 		console.log('special characters');
				// 		break;
				// 	}
				// 	if(arr[i]>47){
				// 		if(arr[i].charCodeAt(0)<65 && arr[i].charCodeAt(0) >=58){
				// 			console.log('special characters');
				// 			break;
				// 		}
				// 		else{
				// 			if(arr[i].charCodeAt(0)>91 && arr[i].charCodeAt(0)<97){
				// 				console.log('special characters');
				// 				break;
				// 			}
				// 			if(arr[i].charCodeAt(0)>=123){
				// 				console.log('special characters');
				// 				break;
				// 			}
				// 		}
				// 	}
				// 	else{
				// 		console.log('no');
				// 	}
				// }
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