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

afterEach(async () => {
   // await browser.close();
});

test('the header has the correct text', async () => {

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');

});

test('Clicking login starts oauth flow', async () => {

    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);

})

test.only('When signed in, shows logout button', async () => {

    const id = '5e3d2510e9857e28306cee1a';
    const Buffer = require('safe-buffer').Buffer;

    const sessionObject = {
        passport: {
            user: id
        }
    };

    const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

    const Keygrip = require('keygrip');
    const keys = require('../config/keys');
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);


    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');

})