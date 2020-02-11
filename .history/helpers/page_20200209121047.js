const puppeteer = require('puppeteer');


class CustomPage {
    static async build() {

        jest.setTimeout(40000);

        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page, browser);

        return new Proxy(customPage, {
            get: function (target, property) {
                return customPage[property] || page[property] || browser[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
        this.browser = browser;

    }
}

module.exports = CustomPage;