import LoginPage from '../page_objects/LoginPage'
import SignUpPage from '../page_objects/SignUpPage'
const assert = require('chai').assert
import allureReporter from '@wdio/allure-reporter'

import {
    SIGNUP_NAME_FIELD,
    SIGNUP_EMAIL_FIELD,
    SIGNUP_PASS_FIELD,
    SIGNUP_PAGE_SIGN_UP_BTN,
    SIGNUP_PAGE_ACCEPT_PRIVACY,
    DELAY_FIVE_SEC,
    DELAY_TWO_SEC,
    DELAY_ONE_SEC
} from "../../globalData.js";


class RegistrationAuthChecks {

    /**
     * Sign Up page Constructor
     * @param {String} name     user name.
     * @param {String} email    user email address.
     * @param {String} password user password.
    */
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    /**
     * method for writing name, email and password without any click action
     * @param {String} name    user name.
     * @param {String} email    user email address.
     * @param {String} password  user password.
    */
    async write_credentials_data(name, email, password) {
        LoginPage.sign_up_btn_click()
        allureReporter.addStep(`LoginPage: Clicked on Sign Up Button`)
        await browser.pause(DELAY_FIVE_SEC)

        this.write_name(SIGNUP_NAME_FIELD, name)
        allureReporter.addStep(`SignUpPage: Write name in Name Textfield as ${name}`)
        await browser.pause(DELAY_TWO_SEC)

        this.write_name(SIGNUP_EMAIL_FIELD, email)
        allureReporter.addStep(`SignUpPage: Write email in Email Textfield as ${email}`)
        await browser.pause(DELAY_TWO_SEC)

        this.write_name(SIGNUP_PASS_FIELD, password)
        allureReporter.addStep(`SignUpPage: Write password in Password Textfield as ${password}`)
        await browser.pause(DELAY_TWO_SEC)
    }

    /**
     * use when values can be set via constructor initialization
    */
    async complete_registration_form() {
        LoginPage.sign_up_btn_click()
        allureReporter.addStep(`LoginPage: Clicked on Sign Up Button`)
        await browser.pause(DELAY_FIVE_SEC)

        this.write_name(SIGNUP_NAME_FIELD, this.name)
        allureReporter.addStep(`SignUpPage: Write name in Name Textfield as ${this.name}`)
        await browser.pause(DELAY_TWO_SEC)

        this.write_name(SIGNUP_EMAIL_FIELD, this.email)
        allureReporter.addStep(`SignUpPage: Write email in Email Textfield as ${this.name}`)
        await browser.pause(DELAY_TWO_SEC)

        this.write_name(SIGNUP_PASS_FIELD, this.password)
        allureReporter.addStep(`SignUpPage: Write password in Password Textfield as ${this.name}`)
        await browser.pause(DELAY_TWO_SEC)

        this.click_textView(SIGNUP_PAGE_ACCEPT_PRIVACY)
        allureReporter.addStep(`SignUpPage: Clicked on Accept Privacy Button`)
        await browser.pause(DELAY_TWO_SEC)

        this.click_textView(SIGNUP_PAGE_SIGN_UP_BTN)
        allureReporter.addStep(`SignUpPage: Clicked on Sign Up Button`)
        await browser.pause(DELAY_TWO_SEC)
    }

    /**
     * This method is used for writing in a single text field
     * @param {int} index    gets element based on index when multiple elements of same class are available.
     * @param {String} textData  text you want to enter
    */
    async write_name(index, textData) {
        SignUpPage.get_text_field(index).setValue(textData)
        allureReporter.addStep(`SignUpPage: Write in textfield as ${textData}`)
        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * Single action click on text view
    */
    async click_textView(index) {
        SignUpPage.get_text_view(index).click()
        allureReporter.addStep(`SignUpPage: Clicked on textview ${index}`)
        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * This method is used for writing in a single text field and clicking on the sign up button
     * @param {int} index    gets element based on index when multiple elements of same class are available.
     * @param {String} textData  text you want to enter
    */
    async write_name_click_sig_up(index, textData) {
        SignUpPage.get_text_field(index).setValue(textData)
        allureReporter.addStep(`SignUpPage: Write in textfield as ${textData}`)
        await browser.pause(DELAY_ONE_SEC)

        this.click_textView(SIGNUP_PAGE_SIGN_UP_BTN)
        allureReporter.addStep(`SignUpPage: Clicked on Sign Up Button`)
        await browser.pause(DELAY_TWO_SEC)
    }

    /**
     * Single action click sign up button
    */
    async sig_up_text_btn() {
        this.click_textView(SIGNUP_PAGE_SIGN_UP_BTN)
        allureReporter.addStep(`SignUpPage: Clicked on Sign Up Button`)
        await browser.pause(DELAY_TWO_SEC)
    }

    /**
     * This function is checking all the alert view erros which are needed for validating test cases.
    */
    async login_errorTypes() {
        let isDisplayed = await SignUpPage.android_alert_title_displayed()
        let alertTitleText = await SignUpPage.android_alert_title()
        allureReporter.addStep(`SignUpPage: ` + alertTitleText)

        assert.isTrue(isDisplayed, "SignUpPage: Alert View Didn't loaded")
        await browser.pause(DELAY_ONE_SEC)
        SignUpPage.android_alert_ok_button()

        allureReporter.addStep(`SignUpPage: Alert Ok Button Clicked`)
        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * When no alertview is shown, specially used for checking empty textfields
    */
    async error_not_displayed() {
        let isDisplayed = await SignUpPage.android_alert_title_displayed()
        allureReporter.addStep(`SignUpPage: Alert will not Display`)
        assert.isTrue(!isDisplayed, "SignUpPage: Page loaded")

        await browser.pause(DELAY_ONE_SEC)
    }

    /**
     * Checks when user move to get SIX digits page for checking confirmation.
    */
    async sign_up_confirmation() {
        await browser.pause(DELAY_ONE_SEC)
        let textData = await SignUpPage.get_text_view_text(0)
        allureReporter.addStep(`SignUpPage: Confirmation textview showing Text ${textData}`)

        assert.strictEqual(textData, "Confirmation")
        await browser.pause(DELAY_ONE_SEC)
    }

}

export default RegistrationAuthChecks