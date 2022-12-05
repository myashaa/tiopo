import { Browser } from '../browser.js';
import { HomePage } from '../pages/homePage.js';
import { AuthorizationPage } from "../pages/authorizationPage.js";
import { WatchInfoPage } from "../pages/watchInfoPage.js";
import assert from 'assert';

describe('Магазин', () => {
    it('Авторизация', async () => {
        const browser = new Browser();
        
        try {
            const homePage = new HomePage(browser);
            await homePage.open();
            await homePage.goToLoginPage();

            const authorizationPage = new AuthorizationPage(browser);
            await authorizationPage.EnterLoginAndPassword();
            await authorizationPage.LogIn();

            assert(await authorizationPage.CheckLoginSuccessful());
        } finally {
            await browser.close();
        }
    });
    
    it('Поиск товара в каталоге', async () => {
        const browser = new Browser();
        
        try {
            const homePage = new HomePage(browser);
            await homePage.open();
            await homePage.findWatch();
            await homePage.goToWatchInfoPage();
        } finally {
            await browser.close();
        }
    });

    it('Добавление товара в корзину ', async () => {
        const browser = new Browser();

        try {
            const homePage = new HomePage(browser);
            await homePage.open();
            await homePage.openWatch();
            await homePage.goToWatchInfoPage();

            const watchInfoPage = new WatchInfoPage(browser);
            await watchInfoPage.addWatchInCart();
        } finally {
            await browser.close();
        }
    });

    it('Оформление заказа ', async () => {
        const browser = new Browser();

        try {
            const homePage = new HomePage(browser);
            await homePage.open();
            await homePage.goToLoginPage();

            const authorizationPage = new AuthorizationPage(browser);
            await authorizationPage.EnterLoginAndPassword();
            await authorizationPage.LogIn();
            await authorizationPage.goToHomePage();

            await homePage.openWatch();
            await homePage.goToWatchInfoPage();

            const watchInfoPage = new WatchInfoPage(browser);
            await watchInfoPage.addWatchInCart();
            await watchInfoPage.placeOrder();

            assert(await watchInfoPage.CheckOrderPlacedSuccessfully());
        } finally {
            await browser.close();
        }
    });
});