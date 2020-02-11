const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {

    jest.setTimeout(40000);

    browser = await puppeteer.launch({

        headless: false
    }); // always async so you must use await keyword 

    page = await browser.newPage();
    await page.goto('localhost:3000');

})

test('We can launch a browser', async () => {

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');

});