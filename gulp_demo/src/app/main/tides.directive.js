(function () {
  'use strict';

  angular
    .module('yata')
    .directive('tides', tides);

  /** @ngInject */
  function tides() {
    return {
      scope: {
        tideData: '='
      },
      replace: true,
      templateUrl: 'app/main/tide.template.html',
      restrict: 'E',
      link: postLink
    };
  }

  function postLink(scope) {
    scope.groupByDate = _.memoize(function (data, field) {
      var days = _.groupBy(data, field);
      var keys = Object.keys(days);
      var groupDataArray = [];
      _.forEach(keys, function (k) {
        groupDataArray.push({day: days[k][0].date.epoch, data: days[k]});
      });
      return groupDataArray;
    });
  }
})();
