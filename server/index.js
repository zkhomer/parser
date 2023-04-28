import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/scrape/:page', async (req, res) => {

    const pageNumber = parseInt(req.params.page);

    try {
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: "new"
        });
        const page = await browser.newPage();
        await page.goto(`https://hard.rozetka.com.ua/ua/computers/c80095/page=${pageNumber}`);

        await page.waitForSelector('.catalog-grid__cell', {timeout:240000});

        const products = await page.evaluate(() => {
            const productList = [];

            const productNodes = document.querySelectorAll('.catalog-grid__cell');

            productNodes.forEach((productNode) => {
                console.log('it for loop')
                const name = productNode.querySelector('.goods-tile__title').textContent.trim();
                const price = productNode.querySelector('.goods-tile__price-value').textContent.trim();

                productList.push({name, price});
            });

            return {productList};
        });

        await browser.close();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the page');
    }
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
