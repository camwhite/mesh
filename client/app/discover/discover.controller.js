'use strict';

angular.module('meshApp')
  .controller('DiscoverCtrl', function ($scope, $rootScope, $http, $mdToast, $animate, Auth, Http) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $rootScope.toggleNav = true;

    $scope.featuredUsers = [];

    var myContacts = $scope.getCurrentUser().contacts.length;

    Http.getAllUsers().then(function(data) {
      $scope.standardUsers = data;
      fillFeatured();
    });

    var fillFeatured = function() {
      var currentContacts = $scope.getCurrentUser().contacts;
      var featuredUsers = $scope.standardUsers;
      for (var i = 0; i < featuredUsers.length; i++) {
        for (var j = 0; j < currentContacts.length; j++) {
          if (featuredUsers[i]._id === currentContacts[j]._id) {
            featuredUsers.splice(i,1);
          }
        }
      }
      $scope.featuredUsers = featuredUsers;
    };

    $scope.addAsContact = function(user) {
      var me = $scope.getCurrentUser();
      Http.addAsContact(user).then(function(data) {
        me.contacts.push(user);
        $rootScope.myContacts = me.contacts;
      });
      $mdToast.show(
        $mdToast.simple()
        .content('Added ' + user.name)
        .position('bottom right')
        .hideDelay(1500)
      );
      removeFeatured(user);
      fillFeatured();
    }

    var removeFeatured = function(user) {
      for(var i = 0; i < $scope.featuredUsers.length; i++) {
        if($scope.featuredUsers[i]._id === user._id) {
          $scope.featuredUsers.splice(i, 1);
          console.log($scope.featuredUsers);
        }
      }
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
