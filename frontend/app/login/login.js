'use strict';
var url = "//localhost:3000";
angular.module('ast.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$http','$location','$window',function($scope,$http,$location,$window) {
	$scope.tab = 2;
	$scope.flag = 0;
	$scope.user = {};
	console.log($scope);
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
			data: $scope.user
		}).success(function(res){
			$scope.color="bg-success"; $scope.flag = 1; $scope.error = res.devMessage; $scope.user = {};
			$scope.currentUser = res;
			
			$window.sessionStorage.ast_user = JSON.stringify($scope.currentUser);
			
			$http.defaults.headers.common.Authorization = $scope.currentUser.token;
			
			$location.path('/start');

		}).error(function(res){
			$scope.color="bg-danger";$scope.flag = 1;$scope.error = "Error:"+res.devMessage;$scope.user = {};
		});
	};
}]);
