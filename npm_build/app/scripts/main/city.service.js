(function () {
  'use strict';

  angular
    .module('yata')
    .service('citySearchService', citySearch);

  /** @ngInject */
  function citySearch($log, $http, SearchURL) {

    var service = {
      findCityInfo: findCityInfo
    }

    return service;

    function findCityInfo(q) {
      var configs = {
        params: {
          query: q,
          cb: 'JSON_CALLBACK'
        },
        headers: {"Content-Type": "application/json"}
      }
      return $http.jsonp(SearchURL, configs)
        .then(findCityInfoComplete)
        .catch(findCityInfoFailed);

      function findCityInfoComplete(response) {
        $log.info(response.data);
        return response.data.RESULTS;
      }

      function findCityInfoFailed(error) {
        $log.error('XHR Failed for findCityInfo.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();




