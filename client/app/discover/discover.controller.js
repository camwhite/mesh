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
      while($scope.featuredUsers.length <= Math.min($scope.standardUsers.length - myContacts, 14)) {
        var userIndex = Math.floor(Math.random() * ($scope.standardUsers.length - 1));
        var found = false;
        if($scope.knownContacts($scope.standardUsers[userIndex])) {
          for(var i = 0; i < $scope.featuredUsers.length; i++) {
            if($scope.featuredUsers[i]._id === $scope.standardUsers[userIndex]._id) {
              found = true;
            }
          }
        }
        if(!found) {
          $scope.featuredUsers.push($scope.standardUsers[userIndex]);
          console.log($scope.featuredUsers)
        }
      }
    }

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
