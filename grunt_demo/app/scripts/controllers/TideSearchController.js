'use strict';

angular.module('search.controller', ['mgcrea.ngStrap', 'tideLookup', 'cityFinder'])
  .controller('TideSearchController', ['$location', '$http', 'TideLookupService', 'CitySearchService',
         function ($location, $http, TideLookupService, CitySearchService) {
           var self = this;
           self.selectedCity = undefined;
           self.data = TideLookupService;
           this.search = function (q) {
             return CitySearchService.findCityInfo(q);
           };

           this.getTideInformation = function () {
             TideLookupService.findTides(self.selectedCity);
           }
         }
  ]);
