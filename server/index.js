const express = require('express');
const mongoose = require('mongoose')
const User = require("./models/user")
const puppeteer =  require('puppeteer');
const cors = require('cors');
const userRoutes = require('./routes/user-routs')


const URL = "mongodb://localhost:27017/usersbox"
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(cors({
    origin: '*'
}));

mongoose.connect(URL).then(()=>{
    console.log('connected to MongoDB')
}).catch((err)=>console.log(err))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
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



