'use strict';

angular.module('tideResults', [])
  .directive('tideResults', function ($window) {
    return {
      scope: {
        tideData: '='
      },
      replace: true,
      templateUrl: '/views/tides.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.groupByDate = _.memoize(function(data, field) {
          var days = _.groupBy(data, field);
          var keys = Object.keys(days);
          var groupDataArray = [];
          _.forEach(keys, function(k) {
            groupDataArray.push({day:days[k][0].date.epoch, data: days[k]})
          });
          console.log(groupDataArray);
          return groupDataArray;
        });
      }
    };
  });
