const puppeteer = require('puppeteer');

test('Adds two numbers', () => {

    const sum = 1 + 2;
    expect(sum).toEqual(3);
});


test('We can launch a browser',async () => {
    const browser = await puppeteer.launch({

        headless: false
    }); // always async so you must use await keyword 

    const page = await browser.newPage();

});