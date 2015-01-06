'use strict';

angular.module('meshApp')
  .controller('MainCtrl', function ($scope, $rootScope, Auth) {
    $rootScope.toggleNav = false;

    $scope.isLoggedIn = Auth.isLoggedIn;
  });
