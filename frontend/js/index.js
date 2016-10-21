var ast = angular.module('ast',['ngRoute']);
var url = "//localhost:3000";
ast.config(function($routeProvider){
	$routeProvider

		.when('/',{
			templateUrl : '../pages/login.html',
			controller : 'loginController'
		})
		.when('/user',{
			templateUrl : '../pages/users.html',
			controller : 'userController'
		})
		.otherwise({ redirectTo: '/' });
});

ast.controller('loginController', ['$scope','$http','$location','$window', function($scope,$http,$location,$window){
	$scope.tab = 2;
	$scope.flag = 0;
	$scope.user = {};

	$scope.register = function(){
		//console.log($scope.user);
		$http({
			method : 'POST',
			url : url+"/signup",
			data: $scope.user,
			headers : {'Content-Type': 'application/json'}
		}).success(function(res){
			//console.log(res);
			$scope.color="bg-success";
			$scope.flag = 1;
			$scope.error = res.devMessage;
			$scope.user = {};
		}).error(function(res){
			//console.log(res);
			$scope.color="bg-danger";
			$scope.flag = 1;
			$scope.error = res.devMessage;
			$scope.user = {};
		});
	};

	$scope.login = function(){
		//console.log($scope.user);
		$http({
			method : 'POST',
			url : url+"/login",
			data: $scope.user,
			//headers : {'Content-Type': 'application/json'}
		}).success(function(res){
			//console.log(res);
			$scope.color="bg-success";
			$scope.flag = 1;
			$scope.error = res.devMessage;
			$scope.user = {};
			$scope.currentUser = res;
			$window.sessionStorage.ast_user = JSON.stringify($scope.currentUser);
			$http.defaults.headers['x-access-token'] = $scope.currentUser.token;
			$location.path('/user');
		}).error(function(res){
			//console.log(res.devMessage);
			$scope.color="bg-danger";
			$scope.flag = 1;
			$scope.error = "Error:"+res.devMessage;
			$scope.user = {};
		});
	};
}]);

ast.controller('userController', ['$scope','$http','$location','$window', function ($scope,$http,$location,$window){
	$scope.ast_user = {};
	if(typeof $window.sessionStorage.ast_user === "undefined"){
		$location.path('/');
	}
	$scope.ast_user = JSON.parse($window.sessionStorage.ast_user);
	console.log($scope.ast_user.token);
	if($scope.ast_user.token !== 'undefined'){
		console.log($window.sessionStorage.ast_user.length);
		$scope.panel = 1;
		$scope.ast_user = JSON.parse($window.sessionStorage.ast_user);
		//console.log($scope.ast_user);
		//$http.defaults.headers['x-access-token'] = $scope.ast_user.token;
		//console.log($http.defaults.headers['x-access-token']);
		var team = $scope.ast_user.teamName;
		var getUsers = function(team){
			//console.log(team);
			$http({
				method: 'GET',
				url : url+'/api/user/'+team,
				params:{token:$scope.ast_user.token}
			}).success(function(res){
				$scope.users = res;
			}).error(function(err){
				console.log(err);
			});
		};
		$scope.logout = function(){
			$location.path('/');
			$window.sessionStorage.ast_user = {};
			console.log($window.sessionStorage.ast_user.token);
			$scope.ast_user = {};
		};
		getUsers(team);
	}else{
		console.log($window.sessionStorage.ast_user);
		$location.path('/');
	}

}]);