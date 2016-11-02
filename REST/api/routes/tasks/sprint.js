var Sprint = require('../../models/sprints');
var Team = require('../../models/teams');
module.exports = function(app,router){
    router.get('/sprintset',function(req,res){
        var sprint = new Sprint({
            name:'start sprint',
            teamId : 4
        });
        sprint.save(function(err){
            if(err) throw err;
            else res.status(200).json({message:'Sprint successfully created'});
        });
    });
    router.get('/sprint/:teamId',function(req,res){
        Team.find({_id:req.params.teamId},function(err,team){
            if(err) throw err;
            else if(!team.length) res.status(400).json({devMessage:"No such Teams"});
            else{
                Sprint.find({teamId:req.params.teamId},function(err,sprints){
                    if(err) throw err;
                    else if(!sprints.length) res.status(400).json({devMessage:"No Sprints"});
                    else{
                        res.status(400).json(sprints);
                    }
                });
            }
        });
    });
    router.post('/sprint/:teamId',function(req,res){
        Team.findOne({_id:req.params.teamId},function(err,team){
            if(err) throw err;
            else if(!team) {
                res.status(404).json({devMessage: "No such team exist"});
            }
            else {
                Sprint.findOne({name:req.body.name},function(err,sprint){
                   if(err) throw err;
                   else if(sprint) res.status(400).json({devMessage: "Sprint with same name exists"});
                   else{
                        var sprint = new Sprint({
                            name: req.body.name,
                            teamId: req.params.teamId
                        });
                        sprint.save(function (err) {
                            if (err) throw err;
                            else res.status(200).json({devMessage: "Sprint sucessfully started"});
                        });
                   }
                });
            }
        });
    });
};