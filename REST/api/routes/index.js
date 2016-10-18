module.exports = function(app,router){
	require('./login')(app,router);
	require('./signup')(app,router);
	require('./user')(app,router);
};