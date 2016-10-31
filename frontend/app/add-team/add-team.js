'use strict';

angular.module('ast.add', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {
    templateUrl: 'add-team/add-team.html',
    controller: 'AddCtrl'
  });
}])
.controller('AddCtrl',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    $scope.ast_user = {};
    //console.log($window.sessionStorage.ast_user)
    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;
    var email = $scope.ast_user.email;
    //console.log(email);
    $scope.createTeam = function(){
        var team = {};
        var team = $scope.team;
        //console.log(team);
        //$http.post(url+'/api/createteam/email',team)
        $http({
            method: 'POST',
            url : url+'/api/jointeam/'+email,
            data:team
        }).success(function(res){
            $scope.color="bg-success"; $scope.flag = 1; $scope.error = res.devMessage; $scope.team = {};
        }).error(function(res){
            $scope.color="bg-danger"; $scope.flag = 1; $scope.error = res.devMessage; $scope.team = {}
        });
    };
}]);