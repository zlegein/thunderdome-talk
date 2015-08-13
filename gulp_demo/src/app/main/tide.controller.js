(function () {
  'use strict';

  angular
    .module('yata')
    .controller('TideSearchController', TideSearchController);

  /** @ngInject */
  function TideSearchController(tideLookupService, citySearchService) {
    var self = this;
    self.selectedCity = undefined;
    self.data = tideLookupService;
    self.search = function (q) {
      return citySearchService.findCityInfo(q);
    };

    self.getTideInformation = function () {
      tideLookupService.findTides(self.selectedCity);
    };

    return self;
  }
})();
