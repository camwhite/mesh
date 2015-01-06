'use strict';

angular.module('meshApp')
  .controller('LoginCtrl', function ($scope, $rootScope, Auth, $location, $window) {
    $rootScope.toggleNav = true;

    $scope.user = {};
    $scope.errors = {};

    $scope.submitted = false;

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
