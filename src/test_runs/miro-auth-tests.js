import allureReporter from '@wdio/allure-reporter'
import LoginAuthChecks from "../test_flows/LoginAuthChecks"
import RegistrationAuthChecks from "../test_flows/RegistrationAuthChecks"

import {
    DUMMY_PASSWORD,
    VALID_EMAIL, 
    VALID_EMAIL_PASS,
    SHORT_PASS,
    EMAIL_DOMAIN,
    USER_NAME,
    UNVERIFIED_EMAIL,
    DUPLICATE_EMAIL,
    SEVERITY_LEVEL_CRITICAL,
    SIGNUP_EMAIL_FIELD,
    LOGIN_EMAIL_FIELD,
    LOGIN_PASS_FIELD,
    SIGNUP_PAGE_SIGN_UP_BTN,
    SIGNUP_PAGE_ACCEPT_PRIVACY,
    DELAY_FIVE_SEC
} from "../../globalData.js";

let firstStart = true

describe('Authentication Test Suite', () => {

    function email_random_chars(length = 0) {
        let result = "";
        let chars = "1234567890abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result+EMAIL_DOMAIN;
    }

    beforeEach(async () => {
        // Restart the app before each test
        if(!firstStart){
            console.log("Not First App Start")
            await driver.reset();
            await browser.pause(DELAY_FIVE_SEC)
        }
        firstStart = false;
      });

    it('Registration - Long Email address', async() => {
        allureReporter.addTestId("Test-1")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //Checking whether the textfield can handle 256 character long address
        let registrationAuthChecks = new RegistrationAuthChecks(USER_NAME, email_random_chars(256), DUMMY_PASSWORD)
        await registrationAuthChecks.complete_registration_form()
        await registrationAuthChecks.login_errorTypes()
    });

    it('Registration - Email Address Verfication Wrong Formats', async() => {
        allureReporter.addTestId("Test-2")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)
        let emailWithOutDomain = "email"

        //only the first part is given, no domain
        let registrationAuthChecks = new RegistrationAuthChecks(USER_NAME, emailWithOutDomain, DUMMY_PASSWORD)
        await registrationAuthChecks.complete_registration_form()
        await registrationAuthChecks.login_errorTypes()

        // only domain is given
        await registrationAuthChecks.write_name_click_sig_up(SIGNUP_EMAIL_FIELD, EMAIL_DOMAIN)
        await registrationAuthChecks.login_errorTypes()
        //checking for restricted domains
        await registrationAuthChecks.write_name_click_sig_up(SIGNUP_EMAIL_FIELD, emailWithOutDomain + "@yopmail.com")

        await registrationAuthChecks.login_errorTypes()
        //not a valid format .com is missing
        await registrationAuthChecks.write_name_click_sig_up(SIGNUP_EMAIL_FIELD, emailWithOutDomain + "@gmail")
        await registrationAuthChecks.login_errorTypes()
    });

    it('Registration - Check password validation less than 8 characters', async() => {
        allureReporter.addTestId("Test-3")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //password is less than 8 characters
        let registrationAuthChecks = new RegistrationAuthChecks(USER_NAME, email_random_chars(10), SHORT_PASS)
        await registrationAuthChecks.complete_registration_form()
        await registrationAuthChecks.login_errorTypes()
    });

    it('Registration - Check duplicate email address', async() => {
        allureReporter.addTestId("Test-4")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //start registaring duplicate email address
        let registrationAuthChecks = new RegistrationAuthChecks(USER_NAME, DUPLICATE_EMAIL, DUMMY_PASSWORD)
        await registrationAuthChecks.complete_registration_form()
        await registrationAuthChecks.login_errorTypes()
    });

    it('Registration - Empty Text Fields Verification', async() => {
        allureReporter.addTestId("Test-5")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)
        let registrationAuthChecks = new RegistrationAuthChecks()

        // Name is not given
        await registrationAuthChecks.write_credentials_data("", email_random_chars(10), DUMMY_PASSWORD)
        await registrationAuthChecks.click_textView(SIGNUP_PAGE_ACCEPT_PRIVACY)
        await registrationAuthChecks.sig_up_text_btn()

        await registrationAuthChecks.error_not_displayed()
        // Email is not given
        await registrationAuthChecks.write_credentials_data(USER_NAME, "", DUMMY_PASSWORD)
        await registrationAuthChecks.sig_up_text_btn()

        await registrationAuthChecks.error_not_displayed()
        // Password is not given
        await registrationAuthChecks.write_credentials_data(USER_NAME, email_random_chars(10), "")
        await registrationAuthChecks.sig_up_text_btn()

        await registrationAuthChecks.error_not_displayed()
    });

    it('Registration - Do not accept Privacy policy', async() => {
        allureReporter.addTestId("Test-6")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        let registrationAuthChecks = new RegistrationAuthChecks()
        // registering all credential infos and not clicking on Privacy Policy
        await registrationAuthChecks.write_credentials_data(USER_NAME, email_random_chars(10), DUMMY_PASSWORD)
        await registrationAuthChecks.click_textView(SIGNUP_PAGE_SIGN_UP_BTN)

        await registrationAuthChecks.login_errorTypes()
    });

    it('Registration - Create an complete account', async() => {
        allureReporter.addTestId("Test-7")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        // All valid credentials are given
        let registrationAuthChecks = new RegistrationAuthChecks(USER_NAME, email_random_chars(10), DUMMY_PASSWORD)
        await registrationAuthChecks.complete_registration_form()
        await registrationAuthChecks.sign_up_confirmation()
    });

    it('Login - Not Verfied Email', async() => {
        allureReporter.addTestId("Test-8")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        // Trying to login with an unverfied email which is already registered
        let loginAuthChecks = new LoginAuthChecks(UNVERIFIED_EMAIL, DUMMY_PASSWORD)
        await loginAuthChecks.enter_login_data()
        await loginAuthChecks.login_unverified_confirmation()
    });

    it('Login - Long Email address / trying to break the flow', async() => {
        allureReporter.addTestId("Test-9")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //Checking whether the textfield can handle 256 character long address
        let loginAuthChecks = new LoginAuthChecks(email_random_chars(256), DUMMY_PASSWORD)
        await loginAuthChecks.enter_login_data()
        await loginAuthChecks.login_errorTypes()
    });

    it('Login - Short password validation', async() => {
        allureReporter.addTestId("Test-10")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //password is less than 8 characters
        let loginAuthChecks = new LoginAuthChecks(email_random_chars(10), SHORT_PASS)
        await loginAuthChecks.enter_login_data()
        await loginAuthChecks.login_errorTypes()
    });

    it('Login - Login View empty text fields check', async() => {
        allureReporter.addTestId("Test-11")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        let loginAuthChecks = new LoginAuthChecks()
        //both fields are empty
        await loginAuthChecks.click_sign_in()
        await loginAuthChecks.error_not_displayed()

        await loginAuthChecks.enter_data(LOGIN_EMAIL_FIELD, email_random_chars(10))
        //password field is empty
        await loginAuthChecks.click_sign_in()
        await loginAuthChecks.error_not_displayed()

        await loginAuthChecks.enter_data(LOGIN_EMAIL_FIELD, "")
        await loginAuthChecks.enter_data(LOGIN_PASS_FIELD, DUMMY_PASSWORD)
        //email field is empty
        await loginAuthChecks.click_sign_in()

        await loginAuthChecks.error_not_displayed()
    });

    it('Login - Login unsuccessful wrong password', async() => {
        allureReporter.addTestId("Test-12")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)

        //Wrong password for a valid user
        let loginAuthChecks = new LoginAuthChecks(VALID_EMAIL, DUMMY_PASSWORD)
        await loginAuthChecks.enter_login_data()
        await loginAuthChecks.login_errorTypes()
    });

    it('Login - Login successful', async() => {
        allureReporter.addTestId("Test-13")
        allureReporter.addSeverity(SEVERITY_LEVEL_CRITICAL)
        await browser.pause(5000)    

        //Valid id and password are given, successful login
        let loginAuthChecks = new LoginAuthChecks(VALID_EMAIL, VALID_EMAIL_PASS)
        await loginAuthChecks.enter_login_data()
        await loginAuthChecks.error_not_displayed()
    });
    
    afterEach(async () => {
        // Wait before restarting again
        await browser.pause(DELAY_FIVE_SEC)
      });

});