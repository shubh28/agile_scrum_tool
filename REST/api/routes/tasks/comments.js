var Task = require('../../models/tasks');
var User = require('../../models/user');

module.exports = function(app,router){
    router.get('/comments/:taskId',function(req,res){
        Task.find({_id:req.params.taskId},{comments:1,_id:0},function(err,comments){
            if(err) throw err;
            else if(!comments.length) res.status(400).json({devMessage:"No such tasks"});
            else{
                res.status(200).json(comments);
            }
        })
    });
    router.post('/comments/:userId/task/:taskId',function(req,res){
        User.findOne({_id:req.params.userId},function(err,user){
            if(err) throw err;
            else if(!user) res.status(400).json({devMessage:"No such user"});
            else{
                var query = {_id:req.params.taskId};
                var update = {$push:{"comments":{
                    text : req.body.text,
                    user_id : req.params.userId
                }}};
                var options = {safe: true, upsert: true, new : true};
                Task.update(query,update,options,function(err){
                    if(err) throw err;
                    else res.status(200).json({devMessage:"Successfully Commented"});
                });
            }
        });
    });
};