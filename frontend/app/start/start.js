'use strict';

angular.module('ast.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'start/start.html',
    controller: 'StartCtrl'
  });
}])

.controller('StartCtrl', ['$scope','$http','$location','$window',function($scope,$http,$location,$window) {
	// $scope.ast_user = {};
	// $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

	// $scope.panel = 1;
	// $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);
	
	// $http.defaults.headers.common.Authorization = $scope.ast_user.token;

	// $scope.logout = function(){
     //    //console.log($location);
	// 	$location.path('/');
	// 	$window.sessionStorage.ast_user = {};
	// 	$scope.ast_user = {};
	// };
}]);
