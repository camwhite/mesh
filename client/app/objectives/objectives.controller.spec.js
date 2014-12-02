'use strict';

describe('Controller: ObjectivesCtrl', function () {

  // load the controller's module
  beforeEach(module('meshApp'));

  var ObjectivesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ObjectivesCtrl = $controller('ObjectivesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
