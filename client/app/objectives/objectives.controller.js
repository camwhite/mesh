'use strict';

angular.module('meshApp')
  .controller('ObjectivesCtrl', function ($scope, $stateParams, Http) {

    Http.getThing($stateParams.objectiveId).then(function(data) {
      $scope.objective = data;
    });
  });
