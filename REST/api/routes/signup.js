var bodyParser = require('body-parser');
var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports = function(app,router){
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	router.get('/',function(req,res){
		res.json({message:"Now we are starting"});
	});

	app.get('/setup',function(req,res){
		var user = new User({
			name:'shubham jain',
			email:'shubham@gmail.com',
			password :'shubham',
			admin:true,
			teamName : 'myteam',
			teamCode : 'yolo'
		});
		user.save(function(err){
			if(err) throw err;
			else res.status(200).json({message:'User successfully created'});
		});
	});

	app.post('/signup',function(req,res){
		var salt_work_factor = 10;
		var hash = bcrypt.hashSync(req.body.password,salt_work_factor);
		if(typeof req.body.admin == "string"){
			if(req.body.admin === 'true'){
				req.body.admin = true;
			}
			else{
				req.body.admin = false;
			}
		}
		if(req.body.admin === true){
			User.find({
				teamName : req.body.teamName,
				admin : true
			},function(err,person){
				//console.log(person);
				if(err) throw err;
				if(person.length){
					res.status(400).json({success:false,devMessage:'admin of the team mentioned by you already exist. Create new team or join as normal member'});
				}
				else if(!person.length){
					var user = new User({
						name : req.body.name,
						email : req.body.email,
						password : hash,
						admin : req.body.admin,
						teamName : req.body.teamName,
						teamCode : req.body.teamCode
					});
					user.save(function(err){
						if(err) res.json(err);
						else res.status(200).json({message:'User successfully created'});
					});
				}
			});
		}
		else{
			User.find({
				teamName : req.body.teamName,
				admin : true
			},function(err,person){
				if(err) throw err;
				else if(person.length){
					if(req.body.teamCode === person[0].teamCode){
						var user = new User({
							name : req.body.name,
							email : req.body.email,
							password : hash,
							admin : req.body.admin,
							teamName : req.body.teamName,
							teamCode : req.body.teamCode
						});
						user.save(function(err){
							if(err) res.json(err);
							else res.status(200).json({message:'User successfully created'});
						});
					}
					//console.log(person);
					else{
						res.status(401).json({message:'Wrong Team Code'});
					}
				}
				else if(!person.length){
					res.status(400).json({success:false,devMessage:'No such team exists'});
				}
			});
		}
	});
};