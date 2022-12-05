import { Browser } from '../browser.js';
import { Element } from '../element.js';
import { By, until } from 'selenium-webdriver';

import watchData from '../data/watchData.js'
import urls from '../config.js'

export class HomePage {
    constructor(browser) {
        this._browser = browser;
    }

    async open() {
        await this._browser.get(urls.baseUrl);
    }

    async goToLoginPage()
    {
        const accountButton = new Element(this._browser, By.xpath('/html/body/div[1]/div/div/div[1]/div/div[2]/a'));

        await accountButton.click();

        const entryButton = new Element(this._browser, By.xpath('/html/body/div[1]/div/div/div[1]/div/div[2]/ul/li[1]/a'));
        
        await entryButton.click();
        await this._browser.wait(until.titleIs('Вход'), 5000)
    }

    async findWatch()
    {
        const searchInput = new Element(this._browser, By.xpath('//*[@id="typeahead"]'));

        await searchInput.sendKeys(watchData.name);
        
        const searchBuuton = new Element(this._browser, By.xpath('/html/body/div[3]/div/div/div[2]/div/form/input'));
        
        await searchBuuton.click();

        this._watch = new Element(this._browser, By.partialLinkText(watchData.name)); 
    }

    async openWatch()
    {
        this._watch = new Element(this._browser, By.xpath('/html/body/div[4]/div[4]/div/div/div/div[2]/div/a')); 
    }

    async goToWatchInfoPage()
    {
        await this._watch.click();
        await this._browser.wait(until.titleIs(watchData.name), 5000);

        let driver = await this._browser.driver();
        await driver.sleep(5000);
    }

}