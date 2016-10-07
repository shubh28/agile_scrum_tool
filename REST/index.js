var express = require('express');
var app= express();
var router = express.Router();
var morgan = require('morgan');
//var cors = require('cors');
var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods',    'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    if (req.method == 'OPTIONS') {
        res.status(200);
        res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
        res.end();
    } else {
        next();
    }
});
require('./api/middlewares')(app,router);
require('./api/routes')(app,router);
// app.get('/',function(req,res){
// 	res.json({message:"Finally it all has started"});
// });
app.use('/api',router);
app.listen(port,function(){
	console.log('Magic Happens at port'+port);	
});
