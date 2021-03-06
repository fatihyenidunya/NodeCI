
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('../helpers/page');


let  page;

beforeEach(async () => {

    
// always async so you must use await keyword 

page = await Page.build();
  
    await page.goto('localhost:3000');

})

afterEach(async () => {
    await page.close();
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


    await this.setCookie({ name: 'session', value: session });
    await this.setCookie({ name: 'session.sig', value: sig });
    await this.goto('localhost:3000');
    await this.waitFor('a[href="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');


})