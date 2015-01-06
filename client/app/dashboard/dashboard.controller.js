'use strict';

angular.module('meshApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, $http, $mdToast, $animate, Auth, Http) {
    $rootScope.toggleNav = true;

    $scope.getCurrentUser = Auth.getCurrentUser;

    Http.getUsersThings().then(function(data) {
      if(data.length < 1) {
        $scope.objectives = [
          {
            info: 'Add an objective to get started.'
          }
        ];
      }
      if(data.length >= 1) {
        $scope.objectives = data.reverse();
      }
    });

    $rootScope.myContacts = $scope.getCurrentUser().contacts;
    $scope.contacts = $rootScope.myContacts;

    $scope.deleteContact = function (contact) {
      Http.deleteContact(contact).then(function(data) {
        var index = $rootScope.myContacts.indexOf(contact);
        $rootScope.myContacts.splice(index, 1);
      });
      $mdToast.show(
        $mdToast.simple()
        .content('Removed ' + contact.name)
        .position('bottom right')
        .hideDelay(1500)
      );
    }


    $scope.invitees = [];

    $scope.removeInvitee = function(user) {
      var index = $scope.invitees.indexOf(user);
      $scope.invitees.splice(index, 1);
      console.log($scope.invitees);
    }

    $scope.objAdd = false;

    $scope.toggleAdd = function() {
      $scope.objAdd = !$scope.objAdd
    }

    $scope.objectiveToAdd = '';
    $scope.objDescription = '';

    $scope.charCount = 60;
    var originalCount = 60;

    $scope.$watch('objDescription', function(newVal, oldVal) {
      if(newVal === undefined) {
        $scope.charCount = originalCount;
      } else {
        if($scope.charCount >= 0) {
          $scope.charCount = originalCount - newVal.length;
        }
      }
    });

    $scope.addErrors = {};

    $scope.addObjective = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.invalid = false;
        $http.post('api/things', {
            name: $scope.objectiveToAdd,
            info: $scope.objDescription,
            contributors: $scope.invitees,
            username: Auth.getCurrentUser().name
          }).success(function(data) {
            $scope.objectives.unshift(data);
        });

        $scope.objAdd = !$scope.objAdd

        $scope.invitees = [];

        $scope.objectiveToAdd = '';
        $scope.objDescription = '';
      }
      if(form.$invalid) {
        $scope.invalid = true;
        $scope.addErrors.objective = 'An objective is required';
        $scope.addErrors.descript = 'A description is required'
      }
    }



    $scope.toggleEdit = function(index) {
      //obj.active = !obj.active
      $scope.indexEditing === index ? $scope.indexEditing = -1 : $scope.indexEditing = index;
    }

    $scope.editObjective = function(objective) {
      var id = objective._id;
      $http.put('api/things/' + id, objective).success(function() {
        $http.get('api/users/' + Auth.getCurrentUser()._id + '/things').success(function(data) {
          $scope.objectives = data.reverse();
          $scope.indexEditing = -1;
        });
      }).error(function(status) {
        console.log(status);
      });
    }

    $scope.deleteObjective = function(objective) {
      var id = objective._id;
      $http.delete('api/things/' + id).success(function() {
        $http.get('api/users/' + Auth.getCurrentUser()._id + '/things').success(function(data) {
          $scope.objectives = data.reverse();
        });
      }).error(function(status) {
        console.log(status);
      });
    }

  });
