var bodyParser = require('body-parser');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
module.exports = function(app,router){
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	app.get('/',function(req,res){
		res.json({devMessage:"Finally it all has started"});
	});

	app.post('/login',function(req,res){
		var salt_work_factor = 10;
		var hash = bcrypt.hashSync(req.body.password,salt_work_factor);
		User.findOne({
			email : req.body.email
		},function(err,user){
			if(err) throw err;
			if(!user){
				res.status(404).json({success:false , devMessage: 'Authentication failed. No such user'});
			}else if(user){
				//console.log(user[0].password);
				if(bcrypt.compareSync(req.body.password,user.password)){
					var token = jwt.sign(user,app.get('superSecret'),{
						expiresIn : 24*60*60
					});

					res.status(200).json({
						success : true,
						devMessage : 'Enjoy the token',
						token : token,
						email : user.email,
						name: user.name
					});
				}
				else{
					res.status(401).json({success:false,devMessage: 'Authentication failed.Wrong Password'});
				}
			}
		});
	});

};