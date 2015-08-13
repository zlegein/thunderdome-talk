(function() {
  'use strict';

  angular
    .module('yata')
    .service('tideLookupService', tideLookup);

  /** @ngInject */
  function tideLookup($log, $http, ApiKey, BaseApiURL, TideURL) {

    var service = {};
    service.tide = undefined;
    service.findTides = findTides;

    return service;

    function findTides(city) {

      var key = ApiKey.wu;
      var fetchUrl = [BaseApiURL, key, TideURL, city.l, '.json'].join('');

      var configs = {
        params: {
          callback: 'JSON_CALLBACK'
        },
        headers: {"Content-Type": "application/json"}
      };
      return $http.jsonp(fetchUrl, configs)
        .then(findTidesComplete)
        .catch(findTidesFailed);

      function findTidesComplete(response) {
        service.tide = response.data.tide;
      }

      function findTidesFailed(error) {
        $log.error('XHR Failed for findCityInfo.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();





