const allure = require('allure-commandline');

exports.config = {
    runner: 'local',
    port:4723,
    path:'/wd/hub',
    host: 'localhost',
    logLevel: 'info',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        require: ['@babel/register'],
        timeout: 600000
    },

    waitforTimeout: 10000,
    maxInstances: 10,
    sync: true,
    specs:[
        './src/test_runs/miro-auth-tests.js'
    ],

    capabilities : [{
        "platformName": "Android",
        "automationName": "UiAutomator2",
        "udid": "enter your device UDID",
        "appPackage": "com.realtimeboard",
        "appActivity": ".MainActivity",
        "unicodeKeyboard": true,
        "resetKeyboard": true,
        "noReset": false
    }],

    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotReporting: false,
            disableMochaHooks: true
        }]
    ],

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if(error){
            browser.takeScreenshot()
        }
    }
}

