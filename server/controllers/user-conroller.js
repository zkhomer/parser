const User = require('../models/user')
const cors = require('cors');
const express = require('express');
const { ObjectId } = require('mongoose').Types;
const puppeteer = require('puppeteer');
const app = express();

app.use(cors());

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}



const loginController = async (req, res) => {
    try {
        const user = await User.findOne({login: req.body.login, password: req.body.password});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const addStoreController = async (req, res) => {
    try {
        const { _id, newStore } = req.body;

        const user = await User.findOne({ _id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.storeBox.push(newStore);

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


const categoryDataController = async (req, res) => {
    try {
        const {cardSelector, customSelectors, pageUrl} = req.body;
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
                await page.evaluate((y) => {
                    document.scrollingElement.scrollBy(0, y);
                }, distance);
                await page.waitForTimeout(300);
            }
        };
        await scrollPageToBottom(page);

        const products = await page.evaluate(({cardSelector, customSelectors}) => {
            const productList = [];
            const productNodes = document.querySelectorAll(cardSelector);


            productNodes.forEach((productNode) => {
                const product = {};

                for (const field of customSelectors) {
                    const [key, value] = Object.entries(field)[0];
                    let fieldValue = '';

                    if (key === 'imgUrl') {
                        const img = productNode.querySelector(value);
                        fieldValue = img && img.dataset.original ? img.dataset.original.trim() : '';
                    } else {
                        const element = productNode.querySelector(`.${value}`);
                        fieldValue = element ? element.textContent.trim() : '';
                    }

                    product[key] = fieldValue;
                }

                productList.push(product);
            });

            return {productList};
        }, {cardSelector, customSelectors});

        await browser.close();
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while scraping the page');
    }
}

module.exports = {
    getAllUsers,
    loginController,
    categoryDataController,
    addStoreController
}
