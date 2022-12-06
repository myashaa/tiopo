import { Browser } from '../browser.js';
import { Element } from '../element.js';
import { By, until } from 'selenium-webdriver';

import watchData from '../data/watchData.js'
import constants from '../constants.js'

export class WatchInfoPage {
    constructor(browser) {
        this._browser = browser;
    }

    async addWatchInCart()
    {
        const addToCartButton = new Element(this._browser, By.xpath(constants.addToCartButtonXpath));

        await addToCartButton.click();

        const driver = await this._browser.driver();
        await driver.sleep(constants.sleepTime);

        const modal = new Element(this._browser, By.xpath(constants.modal));
        const watchAdded = await modal.findElement(By.partialLinkText(watchData.name));
    }

    async placeOrder() {
        const placeOrderButton = new Element(this._browser, By.xpath(constants.placeOrderButtonXpath));

        await placeOrderButton.click();

        const driver = await this._browser.driver();
        await driver.sleep(constants.sleepTime);

        const placeButton = new Element(this._browser, By.xpath(constants.placeButtonXpath));

        await placeButton.click();

        await driver.sleep(constants.sleepTime);
    }

    async CheckOrderPlacedSuccessfully()
    {
        try {
            const successBlock = new Element(this._browser, By.xpath(constants.successBlockXpath));
            return true;
        }
        catch {
            return false;
        }
    }
}