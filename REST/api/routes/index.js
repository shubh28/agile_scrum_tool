module.exports = function(app,router){
	require('./login-signup/login')(app,router);
	require('./login-signup/signup')(app,router);
	require('./users/user')(app,router);
	require('./teams/admin_team_create')(app,router);
	require('./teams/user_team_join')(app,router);
	require('./teams/teams')(app,router);
	require('./tasks/sprint')(app,router);
	require('./tasks/task')(app,router);
    require('./tasks/comments')(app,router);
};