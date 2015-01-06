'use strict';

angular.module('meshApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Dashboard',
        'link': '/dashboard',
        'icon': 'fa fa-home'
      },
      {
        'title': 'Discover',
        'link': '/discover',
        'icon': 'fa fa-globe'
      }
    ];

    $scope.menuIcon = 'mesh';

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleNav = $rootScope.toggleNav;
    $scope.showHide = function() {
      $scope.toggleNav = !$scope.toggleNav;
    }

    // $scope.toggleRight = function() {
    //   $mdSidenav('left').toggle()
    //   .then(function() {
    //     $log.debug("toggle LEFT is done");
    //   });
    // }
  });
