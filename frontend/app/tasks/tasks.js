'use strict';

angular.module('ast.tasks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/tasks', {
        templateUrl: 'tasks/tasks.html',
        controller: 'TaskCtrl'
  })
      .when('/fulltask/:id',{
        templateUrl : 'tasks/task-des.html',
        controller : 'FullCtrl'
  })
      .when('/viewtasks/:sprintId',{
          templateUrl : 'tasks/viewtasks.html',
          controller : 'ViewTasksCtrl'
      })
      .when('/addtasks/:sprintId',{
          templateUrl : 'tasks/addtasks.html',
          controller : 'AddTasksCtrl'
      })
      .when('/changestatus/:taskId',{
          templateUrl : 'tasks/changestatus.html',
          controller : 'ChangeStatusCtrl'
      });
}]).controller('ChangeStatusCtrl',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams){

    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;

    $scope.changeStatus = function(){
        $http({
            method : 'PUT',
            url : url+'/api/task/changestatus/'+$routeParams.taskId,
            data : {status:$scope.status}
        }).success(function(){
            $scope.status=null;
        }).error(function(err){
            console.log(err);
        })
    }


}]).controller('ViewTasksCtrl',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams){

    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;

    var viewTasks = function(){
        $http({
            method: 'GET',
            url : url+'/api/task/sprint/'+$routeParams.sprintId
        }).success(function(res){
            $scope.viewtasks = res;
        }).error(function(res){
            console.log(res);
        });
    };
    viewTasks();

}]).controller('AddTasksCtrl',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams){
    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;

    $scope.task = {};
    $scope.task.sprintId = $routeParams.sprintId;
    $scope.addTask = function(){
        $http({
            method : 'POST',
            url : url+'/api/task/'+$routeParams.sprintId,
            data : $scope.task
        }).success(function(){
            $scope.task = {};
        }).error(function(err){
            console.log(err);
        })
    }
}]).controller('TaskCtrl',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    $scope.ast_user = {};
    //console.log($window.sessionStorage.ast_user)
    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);

    $http.defaults.headers.common.Authorization = $scope.ast_user.token;
    var id = $scope.ast_user.id;
    var getTasks = function(){
        $http({
            method: 'GET',
            url : url+'/api/task/user/'+id
        }).success(function(res){
            $scope.tasks = res;
            //console.log($scope.tasks);
            res.forEach(function(key){
                //console.log(key.sprintId);
                $http({
                    method : 'GET',
                    url : url+'/api/sprintOne/'+key.sprintId
                }).success(function(data){
                    //console.log(data);
                    key.sprintName = data.name;
                    $http({
                        method : 'GET',
                        url : url+'/api/teamOne/'+data.teamId
                    }).success(function(team){
                        key.teamName = team.name;
                        //console.log();
                    })

                })
            })
        }).error(function(res){
            console.log(res);
        });
    };
    getTasks();
}]).controller('FullCtrl',['$scope','$http','$location','$window','$routeParams','$route',function($scope,$http,$location,$window,$routeParams,$route){

    $scope.ast_user = JSON.parse($window.sessionStorage.ast_user);
    $http.defaults.headers.common.Authorization = $scope.ast_user.token;
    var id = $scope.ast_user.id;
    var getTask = function(){
        $http({
            method: 'GET',
            url : url+'/api/task/'+$routeParams.id
        }).success(function(data){
            //$scope.task = res;

            //console.log(data);
            $http({
                method : 'GET',
                url : url + '/api/user/'+data.assignedTo
            }).success(function(res){
                //console.log(res);
                data.user_name = res.name;
                //console.log(data);
                $scope.task = data;
            })
        }).error(function(res){
            console.log(res);
        });
    };
    $scope.postComment = function(){
        var comment = $scope.comment;
        $http({
            method : 'POST',
            url : url+'/api/comments/'+id+'/task/'+$routeParams.id,
            data : {text: comment}
        }).success(function(){
           $scope.comment = null;
            $route.reload();
        }).error(function(err){
          console.log(err);
        })
    }
    var getComments = function(){
        $http({
            method: 'GET',
            url : url+'/api/comments/'+$routeParams.id
        }).success(function(res){
            $scope.comments = res.comments;
            res.comments.forEach(function(key){
                $http({
                    method:'GET',
                    url : url + '/api/user/'+key.user_id
                }).success(function(res){
                    key.user_name = res.name;
                }).error(function(err){
                    console.log(err);
                });
            });
        }).error(function(res){
            console.log(res);
        });
    }
    getComments();
    getTask();

}]);