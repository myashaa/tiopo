import { Browser } from '../browser.js';
import { Element } from '../element.js';
import { By, until } from 'selenium-webdriver';

import authorizationData from '../data/authorizationData.js'
import constants from '../constants.js'

export class AuthorizationPage {
    constructor(browser) {
        this._browser = browser;
    }

    async EnterLoginAndPassword() {
        const loginInput = new Element(this._browser, By.xpath(constants.loginInputXpath));
        const passwordInput = new Element(this._browser, By.xpath(constants.passwordInputXpath));

        await loginInput.sendKeys(authorizationData.login);
        await passwordInput.sendKeys(authorizationData.password);
    }

    async LogIn()
    {
        const enterButton = new Element(this._browser, By.xpath(constants.enterButtonXpath));

        await enterButton.click();

        let driver = await this._browser.driver();
        await driver.sleep(constants.sleepTime);
    }

    async CheckLoginSuccessful()
    {
        try {
            const successBlock = new Element(this._browser, By.xpath(constants.successBlockXpath));
            return true;
        }
        catch {
            return false;
        }
    }

    async goToHomePage()
    {
        const homeButton = new Element(this._browser, By.css(constants.homeButtonCss));
        
        await homeButton.click();

        let driver = await this._browser.driver();
        await driver.sleep(constants.sleepTime);
    }

}