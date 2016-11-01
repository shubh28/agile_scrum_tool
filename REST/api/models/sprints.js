var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = require('../../config/config');
var connection  = require('./user');
//var connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);

var sprintSchema = new Schema({
    name: {type:String,required:true},
    team_id: {type:Number,required:true},
    tasks : {
        name:{type:String,required:true},
        description:{type:String,required:true},
        assignedTo:{type:String,required:true},
        time:{type:Number,required:true},
        status:{type:String,required:true},
        comments:{
            text:{type:String,required:true},
            user_id:{type:Number,required:true},
        }
    }
});
sprintSchema.plugin(autoIncrement.plugin,{
    model : 'Sprint',
    startAt: 1
});

module.exports = mongoose.model('Sprint',sprintSchema);
