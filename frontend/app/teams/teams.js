'use strict';

angular.module('ast.teams', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/teams', {
        templateUrl: 'teams/teams.html',
        controller: 'TeamCtrl'
      })
      .when('/sprints/:teamId',{
          templateUrl : 'teams/sprints.html',
          controller : 'SprintController'
      })
      .when('/addsprint/:teamId',{
      templateUrl : 'teams/addsprint.html',
      controller : 'AddSprintController'
  });
}]).controller('AddSprintController',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams){

    $scope.sprint = {};
    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;

    //$scope.task.sprintId = $routeParams.sprintId;
    $scope.addSprint = function(){
        $http({
            method : 'POST',
            url : url+'/api/sprint/'+$routeParams.teamId,
            data : $scope.sprint
        }).success(function(){
            $scope.sprint = {};
        }).error(function(err){
            console.log(err);
        })
    }

}]).controller('TeamCtrl',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
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
}]).controller('SprintController',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams){

    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;

    $http({
        method: 'GET',
        url : url+'/api/sprint/'+$routeParams.teamId
    }).success(function(res){

        $scope.sprints = res;
    }).error(function(res){
        console.log(res);
    });
}]);