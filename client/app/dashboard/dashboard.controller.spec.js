'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('meshApp'));

  var DashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should remove an invitee from the list', function () {
    scope.invitees = [
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

    scope.removeInvitee(scope.invitees[0])

    expect(scope.invitees.length).toEqual(2);
  });

  it('should toggle objective to add', function() {
    var current = scope.objAdd;
    
    scope.toggleAdd();
    
    expect(current).toNotEqual(scope.objAdd);
  });

  it('should add an objective if valid', function() {

  });

  it('should delete an objective', function() {
    scope.objectives = [
      {
        _id: "54667e9365545374216e4b3d",
        name: "sadafd",
        info: "sadadssa",
        contributors: 2,
        user: "545bc8f48a0f269a41c4822e",
        __v: 0
      },
      {
       _id: "54667e9365545374216e4b3d",
        name: "sadafd",
        info: "sadadssa",
        contributors: 2,
        user: "545bc8f48a0f269a41c4822e",
        __v: 0 
      }
    ];

    var objective = scope.objectives[0];

    scope.deleteObjective(objective);

    expect(scope.objectives.length).toEqual(1);
  });

});
