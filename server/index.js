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
            // executablePath: '/usr/bin/google-chrome',
            // headless: "new",
            // args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(`https://hard.rozetka.com.ua/ua/computers/c80095/page=${pageNumber}`);

        const products = await page.evaluate(() => {
            const productList = [];
            const productNodes = document.querySelectorAll('.catalog-grid__cell');

            productNodes.forEach((productNode) => {
                const name = productNode.querySelector('.goods-tile__title').textContent.trim();
                const price = productNode.querySelector('.goods-tile__price-value').textContent.trim();

                productList.push({name, price});
            });

            return {productList};
        });

        await browser.close();
       setTimeout(() => {
           res.send(products);
       }, 30000)

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the page');
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
