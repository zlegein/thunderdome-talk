(function () {
  'use strict';

  angular
    .module('yata')
    .constant('SearchURL', 'http://autocomplete.wunderground.com/aq')
    .constant('BaseApiURL', 'http://api.wunderground.com/api/')
    .constant('TideURL', '/tide');
})();


