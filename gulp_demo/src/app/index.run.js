(function() {
  'use strict';

  angular
    .module('yata')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
