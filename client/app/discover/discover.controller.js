'use strict';

angular.module('meshApp')
  .controller('DiscoverCtrl', function ($scope, $http, Auth, Http) {
    Http.getAllThings().then(function(data) {
      $scope.objectives = data.reverse();
    });

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
  });
