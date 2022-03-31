import CommonElementsPage from "./CommonElementsPage"
const SIGN_IN_BTN = '~sign in'

class LoginPage extends CommonElementsPage {

    /**
     * Click on the Sign in button
     * @return Sign in button click
    */
    sign_in_btn_click(){
        return $(SIGN_IN_BTN).click()
    }  

    /**
     * Click on the Sign in button
     * @return a boolean for Sign in button displayed or not
    */
    sign_in_btn_isDisplayed(){
        return $(SIGN_IN_BTN).isDisplayed()
    }  
}

module.exports = new LoginPage()