'use strict';

describe('Controller: DiscoverCtrl', function () {

  // load the controller's module
  beforeEach(module('meshApp'));

  var DiscoverCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscoverCtrl = $controller('DiscoverCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
