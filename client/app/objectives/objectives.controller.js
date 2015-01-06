'use strict';

angular.module('meshApp')
  .controller('ObjectivesCtrl', function ($scope, $stateParams, Auth, Http) {

    Http.getThing($stateParams.objectiveId).then(function(data) {
      $scope.objective = data;
      $scope.contributors = data.contributors;
      $scope.messages = data.messages;
    });


    $scope.message = {
      author: '',
      text: ''
    };

    $scope.addMessage = function(form) {
      $scope.submitted = true;

      $scope.message.author = Auth.getCurrentUser().name;

      if(form.$valid) {
        $scope.invalid = false;

        $scope.messages.push($scope.message);

        Http.updateThing($scope.objective._id, $scope.messages).then(function(data) {
          $scope.message = '';
        });

        //$http.put('api/things/' + $scope.objective._id, {messages: $scope.messages});
      }
      if(form.$invalid) {
        $scope.invalid = true;
      }
    }


  });
