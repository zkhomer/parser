const express = require('express');
const puppeteer =  require('puppeteer');
const cors = require('cors');
const { connectToDb, getDb } = require('./db');

const app = express();

const PORT = 3000;

let db

app.use(cors({
    origin: '*'
}));

connectToDb((err)=>{
    if (!err){
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
        db = getDb()
    }else {
        console.log(`db connection error:${err}`)
    }
})

app.get('/allUsers', async (req, res) => {
    try {
        const users = [];
        const cursor = db.collection('users').find();
        for await (const user of cursor) {
            users.push(user);
        }
        res.setHeader('Content-Type', 'application/json'); // Устанавливаем заголовок Content-Type
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


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



