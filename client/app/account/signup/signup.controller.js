'use strict';

angular.module('meshApp')
  .controller('SignupCtrl', function ($scope, $rootScope, Auth, $location, $window) {
    $rootScope.toggleNav = true;

    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          location: {
            city: $scope.user.city,
            country: $scope.user.country
          },
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
