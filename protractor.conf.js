exports.config = {
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
    seleniumPort: null,
    chromeDriver: './node_modules/protractor/selenium/chromedriver',
    seleniumArgs: [],
    baseUrl: 'http://localhost:5000',
    capabilities: {
        browserName: 'chrome'
    },
    specs: ['spec/integration/**/*.js'],
    jasmineNodeOpts: {
        showColors: true
    }
};
