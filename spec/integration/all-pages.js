describe('All pages', function() {
    'use strict';

    it('should redirect when trying to go to a nonexistent page', function () {
        browser.get('/#/fsdfw');
        expect(browser.getCurrentUrl()).toMatch('/#/');
    });

    describe('/#/', function () {
        it('should have the proper title', function () {
            browser.get('/#/');
            expect(browser.getTitle()).toBe('Discover Unfiltered');
        });

        it('should have an age gate', function () {
            browser.get('/#/');
            var content = $('body').getText();
            expect(content)
                .toMatch(/You could win the Journey of a lifetime/i);
            expect(content)
                .toMatch(/You must be of legal drinking age to enter this site/i);
            expect(content)
                .toMatch(/By submitting I agree to the Official Rules/i);
        });

        it('should have the appropriate legal', function () {
            var content = $('body').getText();
            expect(content)
                .toMatch(/Enjoy Responsibly/i);
            expect(content)
                .toMatch(/©2014 Shock Top Brewing Co\., Shock Top® Beer, St\. Louis, MO/i);
            expect(content)
                .toMatch(/Shock Top® “Discover Unfiltered” Contest\. NO PURCHASE NECESSARY\. Open to US residents, 21\+\. Contest ends 09\/07\/14/i);
            expect(content)
                .toMatch(/See Official Rules at www\.facebook\.com\/shocktop for entry, prize and details\. Void where prohibited/i);
            expect(content).toMatch(/Privacy Policy/i);
            expect(content).toMatch(/Terms and Conditions/i);
        });
    });

    describe('User Journey', function () {
        it('lets you enter and upload a video', function () {
            element(by.model('ageGateForm.month')).sendKeys('1');
            element(by.model('ageGateForm.day')).sendKeys('1');
            element(by.model('ageGateForm.year')).sendKeys('1955');
            element(by.model('ageGateForm.terms')).click();
            element(by.css('#enter')).click();
            expect(browser.getCurrentUrl()).toMatch('/#/journey');

            // TODO: Figure out how to upload the file via protractor
            // var path = require('path');
            // var video = path.resolve(__dirname, '../files/test.mov');
            //
            // element(by.id('upload-btn')).sendKeys(video);

            browser.get('/#/fb-authorize');
            expect(browser.getCurrentUrl()).toMatch('/#/fb-authorize');
            element(by.model('userInfo.name')).sendKeys('Jane Doe');
            element(by.model('userInfo.phone')).sendKeys('5555555555');
            element(by.model('userInfo.email')).sendKeys('jane@example.com');
            element(by.model('userInfo.birthday.month')).sendKeys('1');
            element(by.model('userInfo.birthday.day')).sendKeys('1');
            element(by.model('userInfo.birthday.year')).sendKeys('1955');
            element(by.model('userInfo.addr')).sendKeys('1227 Washington');
            element(by.model('userInfo.zip')).sendKeys('63110');
            element(by.css('#enter')).click();
            browser.get('/#/thanks');
        });
    });
});
