describe('All pages', function() {
    'use strict';

    it('should redirect when trying to go to a nonexistent page', function () {
        browser.get('/#/fsdfw');
        expect(browser.getCurrentUrl()).toMatch('/#/');
    });

    it('should have an age gate on the home page', function() {
        browser.get('/#/');
        expect(browser.getTitle()).toBe('Discover Unfiltered');
        expect(element(by.css('body')).getText())
            .toMatch(/You could win the Journey of a lifetime/i);
        expect(element(by.css('body')).getText())
            .toMatch(/You must be of legal drinking age to enter this site/i);
        expect(element(by.css('body')).getText())
            .toMatch(/By submitting I agree to the Official Rules/i);

    });
});
