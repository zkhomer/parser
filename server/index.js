import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/scrape/', async (req, res) => {

    const pageNumber = parseInt(req.params.page);

    try {
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(`https://olinbar.tools/barnyy-inventar`);

        const products = await page.evaluate(() => {
            const productList = [];
            const productNodes = document.querySelectorAll('.js-product');

            productNodes.forEach((productNode) => {
                const name = productNode.querySelector('.js-store-prod-name').textContent.trim();
                const price = productNode.querySelector('.js-product-price').textContent.trim();

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
