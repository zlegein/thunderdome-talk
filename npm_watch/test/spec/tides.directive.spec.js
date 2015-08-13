(function () {
  'use strict';

describe('Directive: Tides', function () {

  // load the directive's module
  beforeEach(module('yata', 'my.templates'));

  var element;
  var scope;
  var $window;
  var $httpBackend;

  beforeEach(inject(function ($rootScope, _$window_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $window = _$window_;

  }));

//  afterEach(function () {
//    $httpBackend.verifyNoOutstandingExpectation();
//    $httpBackend.verifyNoOutstandingRequest()
//  });

  it('should not display the table if no tide-data are set', inject(function ($compile) {

    element = angular.element('<tides tide-data=""></tides>');
    element = $compile(element)(scope);

    scope.$digest();

    expect(element.children().length).toEqual(2);
  }));

  describe('when there are search results', function () {

    beforeEach(inject(function($compile) {

      spyOn($window, 'alert');

      scope.results = {
        tide: {
          "tideInfo": [
            {
              "tideSite": "Newburyport, Merrimack River, Massachusetts",
              "tzname": "America/New_York"
            }
          ],
          "tideSummary": [
            {
              "date": {
                "pretty": "2:12 PM EDT on August 09, 2015",
                "year": "2015",
                "mon": "08",
                "mday": "09",
                "hour": "14",
                "min": "12",
                "tzname": "America/New_York",
                "epoch": "1439143950"
              },
              "data": {
                "height": "0.27 ft",
                "type": "Low Tide"
              }
            }
          ]
        }
      };
      element = angular.element('<tides tide-data="results"></tides>');
      element = $compile(element)(scope);

      scope.$digest();
    }));

    it('should display the table with the data', function () {
      expect(element.find('h3').html()).toBe(scope.results.tide.tideInfo[0].tideSite);
//      expect(element.find('#local_epoch').html()).toBe('a few seconds ago');
//      expect(element.find('#temp_f').html()).toMatch(scope.results.temp_f);
//      expect(element.find('#temp_c').html()).toMatch(scope.results.temp_c);
    });
  });
});
})();
