const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');

});

afterEach(async () => {
    await page.close();
})


describe('When logged in', async () => {
    beforeEach(async () => {
        await page.login();
        await page.click('a.btn-floating');
    })

    test('can see blog create  form', async () => {


        const label = await page.getContentsOf('form label');

        expect(label).toEqual('Blog Title');

    });

    describe('and using invalid inputs', async () => {
        beforeEach(async () => {

        })

        test('the form shows an error message', async () => {

            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');


        })
    })

})