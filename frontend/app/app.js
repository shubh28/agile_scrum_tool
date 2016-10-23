'use strict';

// Declare app level module which depends on views, and components
angular.module('ast', [
  'ngRoute',
  'ast.login',
  'ast.start'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
