import { Builder } from 'selenium-webdriver';
import chrome from 'chromedriver';

export class Browser {
    async init() {
        this._driver = await new Builder().forBrowser('chrome').build();
    }

    async driver() {
        if(!this._driver) {
            await this.init()
        }

        return this._driver;
    }

    async get(url) {
        if(!this._driver) {
            await this.init()
        }

        await this._driver.get(url)
    }

    async wait(...args) {
        if(!this._driver) {
            await this.init()
        }

        await this._driver.wait(...args)
    }

    async close() {
        if (this._driver) {
            await this._driver.quit()
        }
    }
}