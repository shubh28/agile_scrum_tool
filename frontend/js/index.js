var ast = angular.module('ast',['ngRoute']);
var url = "//localhost:3000";
ast.config(function($routeProvider){
	$routeProvider

		.when('/',{
			templateUrl : '../pages/login.html',
			controller : 'loginController'
		});
});

ast.controller('loginController', ['$scope','$http', function($scope,$http){
	$scope.tab = 2;
	$scope.user = {};
	$scope.login = function(){
		//console.log($scope.user);
		$http({
			method : 'POST',
			url : url+"/login",
			data: $scope.user,
			headers : {'Content-Type': 'application/json'}
		}).success(function(res){
			console.log(res);
			$scope.user = {};
		});
	};

	$scope.register = function(){
		//console.log($scope.user);
		$http({
			method : 'POST',
			url : url+"/signup",
			data: $scope.user,
			headers : {'Content-Type': 'application/json'}
		}).success(function(res){
			console.log(res);
			$scope.user = {};
		}).error(function(res){
			console.log(res);
		});
	};
}]);