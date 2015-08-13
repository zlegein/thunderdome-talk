
'use strict';

angular.module('cityFinder', ['constants'])
  .service('CitySearchService',['$http', 'SearchURL', function($http, SearchURL) {

    var services = {
      findCityInfo: function (q) {
        return $http.jsonp(SearchURL, {
          params: {
            query: q,
            cb: 'JSON_CALLBACK'
          },
          headers: {"Content-Type": "application/json"}
        }).then(function (response) {
          return response.data.RESULTS;
        });
      }
    };

    return services;
  }

]);





