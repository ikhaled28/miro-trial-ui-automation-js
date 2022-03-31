const ANDROID_PARENT_PANEL = 'id=android:id/parentPanel'
const ANDROID_ALERT_OK_BUTTON = 'id=android:id/button1'
const ALERT_TITLE = 'id=android:id/alertTitle'
const ANDROID_TEXT_FIELDS = 'android.widget.EditText'
const ANDROID_TEXT_VIEWS = 'android.widget.TextView'
const SIGN_UP_BTN = '~sign up'

class CommonElementsPage {

    /**
     * Click on the Sign in button
     * @return Sign up button click
    */
    sign_up_btn_click(){
        return $(SIGN_UP_BTN).click()
    }

    /**
     * Click on the Sign in button
     * @return a boolean for Sign up button displayed or not
    */
    sign_up_btn_displayed(){
        return $(SIGN_UP_BTN).isDisplayed()
    }

    /**
     * Used for getting text fields
     * @return a textfield element
    */
    get_text_field(index){
        return $$(ANDROID_TEXT_FIELDS)[index]
    }

    /**
     * Used for getting text view
     * @return a textview element
    */
    get_text_view(index){
        return $$(ANDROID_TEXT_VIEWS)[index]
    }

    /**
     * Used for getting text view text
     * @return String textview element text
    */
    get_text_view_text(index){
        return $$(ANDROID_TEXT_VIEWS)[index].getText()
    }

    /**
     * Click on the Sign in button
     * @return a boolean for alertview displayed or not
    */
    android_alert_title_displayed(){
        return $(ALERT_TITLE).isDisplayed()
    }

    /**
     * Used for getting alertview title text
     * @return String alertview title text
    */
    android_alert_title(){
        return $(ALERT_TITLE).getText()
    }

    /**
     * Click on the AlertView Ok Button
     * @return button click
    */
    android_alert_ok_button(){
        return $(ANDROID_ALERT_OK_BUTTON).click()
    }
}

export default CommonElementsPage