'use strict';

angular.module('meshApp')
  .controller('DashboardCtrl', function ($scope, $http, User, Modal) {
    
    var getMe = function() {
      $http.get('api/users/me').success(function(me) {
        $scope.me = me;
      });
    }
    getMe();

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

    $scope.objectives = [
      {
        name: 'Grunt', 
        description: 'Learn it',
        contributors: 2
      },
      {
        name: 'Node',
        description: 'In depth study',
        contributors: 4
      },
      {
        name: 'Angular',
        description: 'Study group',
        contributors: 8
      }
    ];

  });
