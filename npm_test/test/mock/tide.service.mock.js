(function () {
  'use strict';

  function JSONPCallService (ApiKey) {
    var service = {};

    service.selectedCity = {l: "/q/zmw:94101.1.99999"};

    service.expectedCall = [
      'http://api.wunderground.com/api/',
      ApiKey.wu,
      '/tide',
      service.selectedCity.l,
      '.json?callback=JSON_CALLBACK'
    ].join('');

    service.mockResponse = {"tide":{"foo": 2} };
    return service
  }

  angular
    .module('tideLookupMocks', [])
    .value('ApiKey', {'wu': '1234'})
    .factory('JSONPCallService', JSONPCallService)

})();
