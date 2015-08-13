(function () {
  'use strict';

  describe('Service: tideLookupService', function () {

    // load the service's module
    beforeEach(module('yata', 'tideLookupMocks'));

    // instantiate service
    var tideLookupService;
    var $httpBackend;
    var ApiKey;
    var $log;
    var $window;

    beforeEach(inject(function (_$httpBackend_, _$log_, _$window_, _tideLookupService_, _ApiKey_) {
      $httpBackend = _$httpBackend_;
      $log = _$log_;
      $window = _$window_;

      tideLookupService = _tideLookupService_;
      ApiKey = _ApiKey_;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest()
    });

    describe('when service is first created', function () {
      it('the service should be defined after injection', function () {
        expect(tideLookupService).toBeDefined();
      });

      it('should have undefined conditions', function () {
        expect(tideLookupService.conditions).toBeUndefined();
        expect($httpBackend).toBeDefined()
      });
    });

    describe('when the findTides function is successfully called with a selected city', function () {

      var mockResponseData;

      beforeEach(inject(function (JSONPCallService) {

        var selectedCity = JSONPCallService.selectedCity;
        var expectedJSONPCall = JSONPCallService.expectedCall;
        mockResponseData = JSONPCallService.mockResponse;

        $httpBackend.expect('JSONP', expectedJSONPCall).respond(function () {
          return [200, mockResponseData]
        });

        tideLookupService.findTides(selectedCity);

        $httpBackend.flush();
      }));

      it('should set the tides on the service  ', function () {
        expect(tideLookupService.tide).toEqual({"foo": 2})
      });

    });

    describe('when the findTides functions fails warn the user', function () {
      beforeEach(inject(function (JSONPCallService) {
        spyOn($log, 'error');

        $httpBackend.whenJSONP(JSONPCallService.expectedCall).respond(404);

        tideLookupService.findTides(JSONPCallService.selectedCity);

        $httpBackend.flush()

      }));

      it('should throw an alert', function () {
        expect($log.error).toHaveBeenCalledWith('XHR Failed for findCityInfo.\n' + undefined);
      });
    });
  })
})();
