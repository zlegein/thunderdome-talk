'use strict';
(function () {
  'use strict';

  describe('Controller: SearchCtrl', function () {

    // load the controller's module
    beforeEach(module('yata'));

    var SearchCtrl;
    var rootScope;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($rootScope, $controller) {
      rootScope = $rootScope;
      SearchCtrl = $controller('TideSearchController');
    }));

    describe('calling search with a query', function () {

      var citySearchService;
      beforeEach(inject(function (_citySearchService_) {
        citySearchService = _citySearchService_;
        spyOn(citySearchService, 'findCityInfo');
      }));

      it('should call through to the citySearchService', function () {
        SearchCtrl.search('San Francisco');
        expect(citySearchService.findCityInfo).toHaveBeenCalledWith('San Francisco')
      });
    });


    describe('calling fetchCityWeather with a selectedCity', function () {

      var tideLookupService;

      beforeEach(inject(function (_tideLookupService_) {
        tideLookupService = _tideLookupService_;
        spyOn(tideLookupService, 'findTides')
      }));

      it('should call to the tideLookupService when the selectedCity is set', function () {
        SearchCtrl.selectedCity = {l: '/q/zwt:9999'};
        SearchCtrl.getTideInformation();
        expect(tideLookupService.findTides).toHaveBeenCalledWith(SearchCtrl.selectedCity)
      });
    });
  })
})();
