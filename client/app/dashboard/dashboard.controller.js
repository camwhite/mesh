'use strict';

angular.module('meshApp')
  .controller('DashboardCtrl', function ($scope, $http, User, Modal) {
    
    var getMe = function() {
      $http.get('api/users/me').success(function(me) {
        $scope.me = me;
      });
    }
    getMe();

    var getObj = function() {
      $http.get('api/things').success(function(data) {
        $scope.objectives = data;
      });
    }
    getObj();

    $scope.contacts = [
      {
        user: 'Irwin Litvak',
        online: true
      },
      {
        user: 'Jennifer Nelson',
        online: true
      },
      {
        user: 'Tyler Ball',
        online: false
      }
    ];

    

    $scope.objAdd = false;

    $scope.toggleAdd = function() {
      $scope.objAdd = !$scope.objAdd
    }

    $scope.objectiveToAdd = '';
    $scope.objDescription = '';

    $scope.addErrors = {}

    $scope.addObjective = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.invalid = false;
        $http.post('api/things', {name: $scope.objectiveToAdd, info: $scope.objDescription, contributors: 1}).
        success(function(data) {
          $scope.objectives.push(data);
        });
        
        $scope.objectiveToAdd = '';
        $scope.objDescription = '';
      }
      if(form.$invalid) {
        $scope.invalid = true;
        $scope.addErrors.objective = 'An objective is required';
        $scope.addErrors.descript = 'A description is required'
      }
    }

  });
