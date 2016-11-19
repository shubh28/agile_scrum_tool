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
    router.get('/teamOne/:teamId',function(req,res){
        Team.findOne({_id :req.params.teamId},function(err,team){
            if(err) throw err;
            if(!team){
                res.status(404).json({devmessage:"No Such Team"});
            }
            else{
                res.status(200).json(team);
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