(function() {
  'use strict';

  angular
    .module('yata')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/search.html',
        controller: 'TideSearchController',
        controllerAs: 'search'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
