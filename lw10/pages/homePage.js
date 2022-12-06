import { Browser } from '../browser.js';
import { Element } from '../element.js';
import { By, until } from 'selenium-webdriver';

import watchData from '../data/watchData.js'
import urls from '../config.js'
import constants from '../constants.js'

export class HomePage {
    constructor(browser) {
        this._browser = browser;
    }

    async open() {
        await this._browser.get(urls.baseUrl);
    }

    async goToLoginPage()
    {
        const accountButton = new Element(this._browser, By.xpath(constants.accountButtonXpath));

        await accountButton.click();

        const entryButton = new Element(this._browser, By.css(constants.entryButtonCss));
        
        await entryButton.click();
        await this._browser.wait(until.titleIs(constants.logInTitle), constants.waitTime);
    }

    async findWatch()
    {
        const searchInput = new Element(this._browser, By.xpath(constants.searchInputXpath));

        await searchInput.sendKeys(watchData.name);
        
        const searchButton = new Element(this._browser, By.css(constants.searchButtonCss));
        
        await searchButton.click();

        this._watch = new Element(this._browser, By.partialLinkText(watchData.name)); 
    }

    async openWatch()
    {
        this._watch = new Element(this._browser, By.css(constants.watchCss)); 
    }

    async goToWatchInfoPage()
    {
        await this._watch.click();
        await this._browser.wait(until.titleIs(watchData.name), constants.waitTime);

        let driver = await this._browser.driver();
        await driver.sleep(constants.sleepTime);
    }

}