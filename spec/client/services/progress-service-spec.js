describe('Service: progressService', function () {
    'use strict';

    beforeEach(module('unfiltered'));

    var progressService, $rootScope;
    beforeEach(inject(function (_progressService_, _$rootScope_) {
        progressService = _progressService_;
        $rootScope = _$rootScope_;
    }));

    it('should be defined', function () {
        expect(progressService).toBeDefined();
    });

    describe('.set', function () {
        it('should be defined', function () {
            expect(progressService.set).toBeDefined();
        });

        it('should take the value given', function () {
            spyOn($rootScope, '$broadcast');
            progressService.set(10);
            expect($rootScope.$broadcast).toHaveBeenCalledWith('progress-updated', 10);
        });
    });

    describe('.advance', function () {
        it('should be defined', function () {
            expect(progressService.advance).toBeDefined();
        });

        it('should advance the value a bit', function () {
            spyOn($rootScope, '$broadcast');
            progressService.advance();
            progressService.advance();
            var progression = $rootScope.$broadcast.calls.allArgs();
            expect(progression[0]).toBeLessThan(progression[1]);
        });

        it('should not exceed the 0–100 bounds', function () {
            spyOn($rootScope, '$broadcast');
            for (var i = 0; i < 20; i++) {
                progressService.advance();
            }
            var progression = $rootScope.$broadcast.calls.allArgs();
            progression.forEach(function (progress) {
                expect(progress[1]).toBeGreaterThan(0);
                expect(progress[1]).toBeLessThan(100);
            });
        });
    });

    describe('.complete', function () {
        it('should be defined', function () {
            expect(progressService.complete).toBeDefined();
        });

        it('should set the value to 100', function () {
            spyOn($rootScope, '$broadcast');
            progressService.complete();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('progress-updated', 100);
        });

        it('should $broacast a progress-complete event', function () {
            spyOn($rootScope, '$broadcast');
            progressService.complete();
            expect($rootScope.$broadcast).toHaveBeenCalledWith('progress-complete');
        });

        it('should not allow further .advance() calls to broadcast', function() {
            progressService.complete();
            spyOn($rootScope, '$broadcast');
            progressService.advance();
            var progression = $rootScope.$broadcast.calls.allArgs();
            expect(progression[0]).not.toBeDefined();
        });
    });
});
