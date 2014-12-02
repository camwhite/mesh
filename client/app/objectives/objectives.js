'use strict';

angular.module('meshApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('objectives', {
        url: '/objectives/:objectiveId',
        templateUrl: 'app/objectives/objectives.html',
        controller: 'ObjectivesCtrl'
      });
  });
