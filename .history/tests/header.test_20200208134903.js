const puppeteer = require('puppeteer');

test('Adds two numbers', () => {

    const sum = 1 + 2;
    expect(sum).toEqual(3);
});


test('We can launch a browser', () => {
    const browser = await puppeteer.launch({});
});