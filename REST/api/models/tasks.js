var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');
var connection  = require('./user');
autoIncrement.initialize(connection);

var taskSchema = new Schema({
        sprintId :{type:Number},
        name:{type:String},
        description:{type:String},
        assignedTo:{type:Number},
        time:{type:Number},
        status:{type:String},
        comments:[{
            text:{type:String},
            user_id:{type:Number},
        }]
});

taskSchema.plugin(autoIncrement.plugin, {
    model: 'Task',
    startAt: 1
});

module.exports = mongoose.model('Task',taskSchema);