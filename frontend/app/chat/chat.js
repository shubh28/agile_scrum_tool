'use strict';

angular.module('ast.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat/:name', {
    templateUrl: 'chat/chat.html',
    controller: 'ChatCtrl'
  });
}])

.controller('ChatCtrl', ['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location,$window,$routeParams) {
    console.log('yes');
    console.log($routeParams.name);
    var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remotesVideos',
        // immediately ask for camera access
        autoRequestMedia: true
    });

    webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom($routeParams.name);
    });
}]);
