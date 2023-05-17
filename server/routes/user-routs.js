const express = require('express');
const mongoose = require('mongoose')
const User = require("../models/user")
const {getAllUsers, loginController, categoryDataController, addStoreController } = require('../controllers/user-conroller')
const cors = require('cors');

const router = express.Router()

router.use(cors({
    origin: '*'
}));

router.get('/allUsers',getAllUsers);
router.post('/user-login', loginController);
router.post('/api', categoryDataController);
router.post('/add-store', addStoreController)

module.exports = router;
