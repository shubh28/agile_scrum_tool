'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('ast')
	.directive('sidebar',function(){
		var controller = ['$scope','$http','$window',function($scope,$http,$window){
            $scope.ast_user = {};
            $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

            $http.defaults.headers.common.Authorization = $scope.ast_user.token;
            $scope.name = $scope.ast_user.name;
		}];
		return {
        templateUrl:'directives/sidebar/sidebar.html',
        restrict: 'AE',
        replace: true,
        controller:controller
    	}
	});
