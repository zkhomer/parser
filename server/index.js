const express = require('express');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');

const URL = "mongodb://localhost:27017/usersbox";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(cors({
    origin: '*'
}));

mongoose.connect(URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.post('/api', async (req, res) => {
    try {
        const { cardSelector, customSelectors, pageUrl } = req.body;

        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(pageUrl);

        const scrollPageToBottom = async (page) => {
            const distance = '1000';
            while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
                await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
                await page.waitForTimeout(300);
            }
        };
        await scrollPageToBottom(page);

        const parsedData = await page.evaluate(({ customSelectors }) => {
            const result = {};

            customSelectors.forEach((field) => {
                const { key, selector } = field;
                const element = document.querySelector(selector);
                const value = element ? element.textContent.trim() : '';
                result[key] = value;
            });

            return result;
        }, { customSelectors });

        await browser.close();
        res.send(parsedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the page');
    }
});
