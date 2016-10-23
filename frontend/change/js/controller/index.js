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
			$scope.color="bg-success"; $scope.flag = 1; $scope.error = res.devMessage; $scope.user = {};
		}).error(function(res){
			$scope.color="bg-danger"; $scope.flag = 1; $scope.error = res.devMessage; $scope.user = {};
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
			$scope.color="bg-success"; $scope.flag = 1; $scope.error = res.devMessage; $scope.user = {};
			$scope.currentUser = res;
			
			$window.sessionStorage.ast_user = JSON.stringify($scope.currentUser);
			//console.log($window.sessionStorage.ast_user);
			$http.defaults.headers.Authorization = $scope.currentUser.token;
			//console.log($http.defaults.headers.Authorization);
			$location.path('/user');

		}).error(function(res){
			$scope.color="bg-danger";$scope.flag = 1;$scope.error = "Error:"+res.devMessage;$scope.user = {};
		});
	};
}]);

ast.controller('userController', ['$scope','$http','$location','$window', function ($scope,$http,$location,$window){
	$scope.ast_user = {};
	$scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

	$scope.panel = 1;
	$scope.ast_user = JSON.parse($window.sessionStorage.ast_user);
	
	$http.defaults.headers.common.Authorization = $scope.ast_user.token;
	var team = $scope.ast_user.teamName;
	var getUsers = function(team){
		$http({
			method: 'GET',
			url : url+'/api/user/'
		}).success(function(res){
			$scope.users = res;
		}).error(function(err){
			console.log(err);
		});
	};
	$scope.logout = function(){
		$location.path('/');
		$window.sessionStorage.ast_user = {};
		$scope.ast_user = {};
	};
	getUsers(team);

}]);