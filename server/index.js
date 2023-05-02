import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/api', async (req, res) => {

    try {
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(`https://olinbar.tools/barnyy-inventar`);

        // Скроллинг до конца страницы
        const scrollPageToBottom = async (page) => {
            const distance = '1000'; // расстояние для скроллинга
            while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
                await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
                await page.waitForTimeout(300);
            }
        };
        await scrollPageToBottom(page);

        const products = await page.evaluate(() => {
            const productList = [];
            const productNodes = document.querySelectorAll('.js-product');

            productNodes.forEach((productNode) => {
                const name = productNode.querySelector('.js-store-prod-name').textContent.trim();
                const price = productNode.querySelector('.js-product-price').textContent.trim();
                const img = productNode.querySelector('.js-product-img');
                const imgSrc = img ? img.dataset.original.trim() : '';

                productList.push({name, price, img: imgSrc});
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
