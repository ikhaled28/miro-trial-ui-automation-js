import LoginPage from '../page_objects/LoginPage'
const assert = require('chai').assert
import allureReporter from '@wdio/allure-reporter'

import {
    LOGIN_EMAIL_FIELD,
    LOGIN_PASS_FIELD,
    DELAY_FIVE_SEC,
    DELAY_TWO_SEC,
    DELAY_ONE_SEC
} from "../../globalData.js";

class LoginAuthChecks {

    /**
     * Login page Constructor
     * @param {String} email    user email address.
     * @param {String} password user password.
    */
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    /**
     * use when values can be set via constructor initialization
    */
    async enter_login_data() {
        LoginPage.get_text_field(LOGIN_EMAIL_FIELD).setValue(this.email)
        allureReporter.addStep(`LoginPage: Write email in Email Textfield as ${this.email}`)
        await browser.pause(DELAY_TWO_SEC)

        LoginPage.get_text_field(LOGIN_PASS_FIELD).setValue(this.password)
        allureReporter.addStep(`LoginPage: Write password in Password Textfield as ${this.password}`)
        await browser.pause(DELAY_TWO_SEC)

        LoginPage.sign_in_btn_click()
        allureReporter.addStep(`LoginPage: Sign In Button Clicked`)
        await browser.pause(DELAY_FIVE_SEC)
    }

    /**
     * function for writing and updating textfield data 
     * @param {int} index    gets element based on index when multiple elements of same class are available.
     * @param {String} data  text you want to enter
    */
    async enter_data(index, data) {
        LoginPage.get_text_field(index).setValue(data)
        allureReporter.addStep(`LoginPage: Input data as ${data}`)
        await browser.pause(DELAY_FIVE_SEC)
    }

    /**
     * Single action click sign in button
    */
    async click_sign_in() {
        LoginPage.sign_in_btn_click()
        allureReporter.addStep(`LoginPage: Sign In Button Clicked`)
        await browser.pause(DELAY_FIVE_SEC)
    }

    /**
     * This function is checking all the alert view erros which are needed for validating test cases.
    */
    async login_errorTypes() {
        let isDisplayed = await LoginPage.android_alert_title_displayed()
        let alertTitleText = await LoginPage.android_alert_title()
        allureReporter.addStep(`LoginPage: ` + alertTitleText)        

        assert.isTrue(isDisplayed, "LoginPage: Alert View Didn't loaded")
        await browser.pause(DELAY_ONE_SEC)
        LoginPage.android_alert_ok_button()

        allureReporter.addStep(`LoginPage: Alert Ok Button Clicked`)
        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * When no alertview is shown, specially used for checking empty textfields
    */
    async error_not_displayed() {
        let isDisplayed = await LoginPage.android_alert_title_displayed()
        allureReporter.addStep(`LoginPage: Alert will not Display`)
        assert.isTrue(!isDisplayed, "Successful Action")

        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * Checks when user move to get SIX digits page for checking confirmation.
    */
    async login_unverified_confirmation() {
        await browser.pause(DELAY_ONE_SEC)
        let textData = await LoginPage.get_text_view_text(0)
        allureReporter.addStep(`LoginPage: Confirmation textview showing Text ${textData}`)
        
        assert.strictEqual(textData, "Confirmation")
        await browser.pause(DELAY_ONE_SEC)
    }

}

export default LoginAuthChecks
