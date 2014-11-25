'use strict';

angular.module('meshApp')
  .controller('DiscoverCtrl', function ($scope, $http, Auth, Http) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    Http.getAllUsers().then(function(data) {
      $scope.standardUsers = data;
      console.log($scope.standardUsers);
      
    });

    Http.getAllThings().then(function(data) {
      $scope.objectives = data.reverse();
    });

    $scope.addAsContact = function (user) {
      Http.addAsContact(user).then(function (data) {

      });
    }
  });
