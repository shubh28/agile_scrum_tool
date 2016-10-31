'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('ast')
	.directive('header',function(){
		var controller = ['$scope','$location','$window',function($scope,$location,$window){
			$scope.logout = function(){
				//console.log($location);
				$location.path('/');
				$window.sessionStorage.ast_user = {};
				$scope.ast_user = {};
			};
		}];
		return {
            templateUrl:'directives/header/header.html',
            controller:controller,
			restrict: 'AE',
            replace: true
        };
});
