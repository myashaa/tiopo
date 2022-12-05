import { Browser } from '../browser.js';
import { Element } from '../element.js';
import { By, until } from 'selenium-webdriver';

import authorizationData from '../data/authorizationData.js'

export class AuthorizationPage {
    constructor(browser) {
        this._browser = browser;
    }

    async EnterLoginAndPassword() {
        const loginInput = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/div[1]/input'));
        const passwordInput = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/div[2]/input'));

        await loginInput.sendKeys(authorizationData.login);
        await passwordInput.sendKeys(authorizationData.password);
    }

    async LogIn()
    {
        const enterButton = new Element(this._browser, By.xpath('/html/body/div[4]/div[3]/div/div/div/div/div[2]/div/form/button'));

        await enterButton.click();

        let driver = await this._browser.driver();
        await driver.sleep(5000);
    }

    async CheckLoginSuccessful()
    {
        try {
            const successBlock = new Element(this._browser, By.xpath('/html/body/div[4]/div[1]/div/div/div'));
            return true;
        }
        catch {
            return false;
        }
    }

    async goToHomePage()
    {
        const homeButton = new Element(this._browser, By.xpath('/html/body/div[2]/a'));
        
        await homeButton.click();

        let driver = await this._browser.driver();
        await driver.sleep(5000);
    }

}