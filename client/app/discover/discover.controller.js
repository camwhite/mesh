'use strict';

angular.module('meshApp')
  .controller('DiscoverCtrl', function ($scope, $rootScope, $http, $mdToast, $animate, Auth, Http) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $rootScope.toggleNav = true;

    Http.getAllUsers().then(function(data) {
      $scope.standardUsers = data;
    });

    $scope.addAsContact = function(user) {
      var me = $scope.getCurrentUser();
      Http.addAsContact(user).then(function (data) {
        me.contacts.push(user);
        $rootScope.myContacts = me.contacts;
      });
      $mdToast.show(
        $mdToast.simple()
        .content('Added ' + user.name)
        .position('bottom right')
        .hideDelay(1500)
      );
    }

    $scope.knownContacts = function(user) {
      var me = $scope.getCurrentUser(),
          notKnown = true;

      if(user.name == me.name) {
        notKnown = false;
      }
      else {
        for(var i = 0; i < me.contacts.length; i++) {
          var contact = me.contacts[i];
          if(contact.name == user.name) {
            notKnown = false;
          }
        }
      }
      return notKnown;
    }

    Http.getAllThings().then(function(data) {
      $scope.objectives = data.reverse();
    });

  });
