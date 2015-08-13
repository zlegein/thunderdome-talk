'use strict';

angular.module('tideLookup', ['apiKey.value', 'constants'])
  .service('TideLookupService', ['$http', '$window','$log', 'ApiKey', 'BaseApiURL', 'TideURL',
          function ($http, $window, $log, ApiKey, BaseApiURL, TideURL) {
          var services = {};
          services.tide = undefined;
          services.findTides = function(city) {
            var key = ApiKey.wu;
            var fetchUrl = [BaseApiURL, key, TideURL, city.l, '.json'].join('');
            return $http.jsonp(fetchUrl, {params: {callback: 'JSON_CALLBACK'}, headers: {"Content-Type": "application/json"}})
              .then(
                function (response) {
                  $log.debug('findTides', response.data);
                  services.tide = response.data.tide;
                },
                function (response) {
                  $window.alert('There was and issue fetching the tides');
                }
              )
          };

           return services;
          }
  ]);
