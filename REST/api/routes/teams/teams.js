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
}