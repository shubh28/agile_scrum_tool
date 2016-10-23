var jwt = require('jsonwebtoken');
var config = require('../../config/config');

module.exports = function(app,router){
	app.set('superSecret',config.secret);

	router.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
		if(token){
			jwt.verify(token,app.get('superSecret'),function(err,decoded){
				if(err){
					return res.status('401').json({success:false,devMessage:'Failed to authenticate token',err:err})
				}
				else{
					req.decoded = decoded;
					next();
				}
			});
		}
		else{
			return res.status(403).json({
				message : 'No such Tokens',
				sucess : false
			});
		}
	});
};