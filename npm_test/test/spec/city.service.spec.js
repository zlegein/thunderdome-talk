(function () {
  'use strict';

  describe('Service: citySearchService', function () {

    // load the service's module
    beforeEach(module('yata'));

    var citySearchService;
    var $httpBackend;
    var SearchURL;

    describe('using with out setting', function () {

      beforeEach(inject(function (_$httpBackend_, _citySearchService_, _SearchURL_) {
        $httpBackend = _$httpBackend_;
        SearchURL = _SearchURL_;
        citySearchService = _citySearchService_;

      }));

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should successfully call the url with a query string via JSONP', function () {

        var queryString = 'Newburyport';
        var expectedCall = SearchURL + "?cb=JSON_CALLBACK&query=" + queryString;
        var expectedResults = {'RESULTS': {'foo': 2}};

        $httpBackend.expectJSONP(expectedCall).respond(function () {
          return [200, expectedResults];
        });

        citySearchService.findCityInfo(queryString).then(function (results) {
          expect(results).toEqual(expectedResults.RESULTS);
        });

        $httpBackend.flush()

      });
    });
  })
})();
