describe('Service: progressService', function () {
    'use strict';

    beforeEach(module('unfiltered'));

    var progressService;
    beforeEach(inject(function (_progressService_) {
        progressService = _progressService_;
    }));

    it('should be defined', function () {
        expect(progressService).toBeDefined();
    });

    // describe('.progress', function () {
    //     it('should be defined', function () {
    //         expect(progressService.progress).toBeDefined();
    //     });
    //
    //     it('should return a value from 0 to 100', function () {
    //         var progress = progressService.progress();
    //         expect(progress).toEqual(jasmine.any(Number));
    //         expect(progress).not.toBeLessThan(0);
    //         expect(progress).not.toBeGreaterThan(100);
    //     });
    // });
});
