describe('All pages', function() {
    'use strict';

    beforeEach(function () {
        browser.ignoreSynchronization = true;
    });

    it('should redirect when trying to go to a nonexistent page', function () {
        browser.get('/#/fsdfw');
        expect(browser.getCurrentUrl()).toMatch('/#/');
    });

    it('should load the homepage', function() {
        browser.get('/#/entry');
        // #getTitle() is a promise, so we need to run #then() on it.
        browser.getTitle().then(function (title) {
            expect(title).toBe('Discover Unfiltered');
        });
    });
});
