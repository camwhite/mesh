'use strict';

angular.module('meshApp')
  .service('Http', function ($http, $q, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      return {
        getUsersThings: function() {
          var deferred = $q.defer();
          $http.get('api/users/' + Auth.getCurrentUser()._id + '/things')
          .success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        getAllThings: function() {
          var deferred = $q.defer();
          $http.get('api/things').success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        getThing: function(id) {
          var deferred = $q.defer();
          $http.get('api/things/'+id).success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        getAllUsers: function() {
          var deferred = $q.defer();
          $http.get('api/users/standard').success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        getMe: function() {
          var deferred = $q.defer();
          $http.get('api/users/me').success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        addAsContact: function(user) {
          var deferred = $q.defer();
          $http.post('api/users/contacts', user).success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        },
        deleteContact: function(user) {
          var deferred = $q.defer();
          $http.delete('api/users/contacts/' + user._id).success(deferred.resolve).error(deferred.reject);

          return deferred.promise;
        }
      }
    });
