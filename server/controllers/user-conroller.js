const User = require('../models/user')

const handleError =  (res, error) =>{
    res.status(500).json({error})
}

const getAllUsers = async (req, res)=> {
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
        const user = await User.findOne({ login: req.body.login, password: req.body.password});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllUsers,
    loginController
}
