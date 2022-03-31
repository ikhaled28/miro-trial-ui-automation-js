# miro-trial-ui-automation-js
This project is part of my trial task work at "miro". I tried to automate both Login and Registration Authentication flow for miro's Android app. Tests are developed in JavaScript by using Appium and WebdriverIO. I used Allure for reporting. The biggest challanged I faced is with the Split APK file.

# Environment setup
 - NodeJS
 - Install appium globally
 - Download Android SDK and installed
 - Set ANDROID_HOME and JAVA_HOME

# Installation
 - npm install

# Run test
 - As I mentioned earlier I faced an issue with the split SDK, so instead of using the APK, I had to pre-install the APK file into the test device. So please before running the test suite please install the app in to the targeted test device. Also please add the device UDID at test-config.js -> Capabilities -> UDID

 - Running the Authentication test suite:
    - npm test run ./test-config.js

 - Generate test report
    - npm run report
