const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');


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
    await browser.close();
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

test('When signed in, shows logout button', async () => {


    const user = await userFactory();

    const { session, sig } = sessionFactory(user);


    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');
    await page.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');


})