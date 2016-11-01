'use strict';

// Declare app level module which depends on views, and components
angular.module('ast', [
  'ngRoute',
  'ast.login',
  'ast.start',
  'ast.add',
  'ast.create',
  'ast.teams',
  'ast.tasks'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
