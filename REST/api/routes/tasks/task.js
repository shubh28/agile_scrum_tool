var Sprint = require('../../models/sprints');
var Team = require('../../models/teams');
var Task = require('../../models/tasks');
var User = require('../../models/user');

module.exports = function(app,router){
    router.get('/task/user/:userId',function(req,res){
        User.find({_id:req.params.userId},function(err,user){
            if(err) throw err;
            else if(!user.length) res.status(400).json({devMessage:"No such User"});
            else{
                Task.find({assignedTo:req.params.userId},function(err,tasks){
                    if(err) throw err;
                    else if(!tasks.length) res.status(400).json({devMessage:"No tasks"});
                    else{
                        res.status(200).json(tasks);
                    }
                });
            }
        });
    });

    router.get('/task/:taskId',function(req,res){
        Task.findOne({_id:req.params.taskId},function(err,task){
            if(err) throw err;
            else{
                        res.status(200).json(task);
            }
        });
    });

    router.get('/task/sprint/:sprintId',function(req,res){
        Sprint.find({_id:req.params.sprintId},function(err,sprint){
            if(err) throw err;
            else if(!sprint.length) res.status(400).json({devMessage:"No such sprints"});
            else{
                Task.find({sprintId:req.params.sprintId},function(err,tasks){
                    if(err) throw err;
                    else if(!tasks.length) res.status(200).json({devMessage:"No tasks"});
                    else{
                        res.status(200).json(tasks);
                    }
                });
            }
        });
    });

    router.post('/task/:sprintId',function(req,res){
        Sprint.findOne({_id:req.params.sprintId},function(err,sprint){
            if(err) throw err;
            else if(!sprint) res.status(400).json({devMessage:"No such sprint exists."});
            else{
                //var query = {_id:req.params.sprintId};
                var task = new Task({
                    sprintId: req.params.sprintId,
                    name: req.body.name,
                    description: req.body.description,
                    assignedTo: req.body.assignedTo,
                    time: req.body.time,
                    status: req.body.status
                });
                task.save(function(err){
                    if(err) throw err;
                    else res.status(200).json({devMessage:"Task Successfully Added!"});
                });
            }
        });
    });
    router.put('/task/changestatus/:taskId',function(req,res){
        var query = {_id:req.params.taskId};
        var data = {status : req.body.status};
        var options = {safe: true, upsert: true, new : true};
        Task.findOneAndUpdate(query,data,options,function(err){
            if(err) throw err;
            else res.status(200).json({devMessage:"status successfully updated"})
        });
    })
};