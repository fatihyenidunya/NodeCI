const puppeteer = require('puppeteer');

beforeEach(() => {

    jest.setTimeout(40000);
    const browser = await puppeteer.launch({

        headless: false
    }); // always async so you must use await keyword 

    const page = await browser.newPage();
    await page.goto('localhost:3000');

})

test('We can launch a browser', async () => {

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');

});