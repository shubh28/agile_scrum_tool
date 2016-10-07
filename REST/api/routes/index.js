module.exports = function(app,router){
	require('./login')(app,router);
	require('./signup')(app,router);
};