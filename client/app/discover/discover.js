'use strict';

angular.module('meshApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('discover', {
        url: '/discover',
        templateUrl: 'app/discover/discover.html',
        controller: 'DiscoverCtrl'
      });
  });