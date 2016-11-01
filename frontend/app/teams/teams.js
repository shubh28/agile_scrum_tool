'use strict';

angular.module('ast.teams', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teams', {
    templateUrl: 'teams/teams.html',
    controller: 'TeamCtrl'
  });
}])
.controller('TeamCtrl',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    $scope.ast_user = {};
    //console.log($window.sessionStorage.ast_user)
    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;
    var email = $scope.ast_user.email;
    var getTeams = function(){
        $http({
            method: 'GET',
            url : url+'/api/teams/'+email
        }).success(function(res){

            $scope.teams = res;
        }).error(function(res){
            console.log(res);
        });
    };
    getTeams();
}]);