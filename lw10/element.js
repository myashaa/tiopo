import { Browser } from './browser.js';
import { By } from 'selenium-webdriver';

export class Element {
    constructor(browser, locator) {
        this._browser = browser;
        this._locator = locator;
    }

    async init() {
        let driver = await this._browser.driver();
        this._element = await driver.findElement(this._locator);
    }

    async click() {
        if (!this._element)
        {
            await this.init();
        }

        this._element.click();
    }

    async sendKeys(...args) {
        if (!this._element)
        {
            await this.init();
        }

        await this._element.sendKeys(...args)
    }

    async findElement(locator)
    {
        return new Element(this._browser, locator)
    }
}