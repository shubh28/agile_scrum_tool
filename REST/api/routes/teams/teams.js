var Team = require('../../models/teams');

module.exports = function(app,router){
    router.get('/teams/:user_email',function(req,res){
        Team.find({members :req.params.user_email},function(err,teams){
            if(!teams){
                res.status(404).json({devmessage:"This user isn't member of any team"});
            }
            else{
                res.status(200).json(teams);
            }
        });
    });
    router.get('/members/:teamId',function(req,res){
        Team.findOne({_id:req.params.teamId},function(err,teams){
            if(!teams){
                res.status(404).json({devMessage:"No such team exists"});
            }
            else{
                //console.log(teams.name);
                res.status(200).json(teams.members);
            }
        });
    });
    router.get('/phases/:teamId',function(req,res){
        Team.findOne({_id:req.params.teamId},function(err,teams){
            if(!teams){
                res.status(404).json({devMessage:"No such team exists"});
            }
            else{
                //console.log(teams.name);
                res.status(200).json(teams.phases);
            }
        });
    });
}