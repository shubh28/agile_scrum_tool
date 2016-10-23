var bodyParser = require('body-parser');
var User = require('../../models/user');
var bcrypt = require('bcrypt');

module.exports = function(app,router){
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	router.get('/',function(req,res){
		res.json({message:"Now we are starting"});
	});

	app.get('/setup',function(req,res){
		var salt_work_factor = 10;
		var hash = bcrypt.hashSync('shubham',salt_work_factor);
		var user = new User({
			name:'shubham jain',
			email:'shubham@gmail.com',
			password :hash
		});
		user.save(function(err){
			if(err) throw err;
			else res.status(200).json({message:'User successfully created'});
		});
	});

	app.post('/signup',function(req,res){
		var salt_work_factor = 10;
		console.log(req.body);
		var hash = bcrypt.hashSync(req.body.password,salt_work_factor);
		User.find({
			email : req.body.email
		},function(err,person){
			if(err) throw err;
			if(person.length){
				res.status(400).json({devMessage:"User Already exist. Please Signin."})
			}
			else if(!person.length){
				var user = new User({
					name : req.body.name,
					email : req.body.email,
					password : hash
				});
				user.save(function(err){
					if(err) res.json(err);
					else res.status(200).json({devMessage:'User successfully created.Login to continue'});
				});
			}
		})
			
		});
};