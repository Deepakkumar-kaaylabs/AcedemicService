const mongoose = require('mongoose')
const User = require('../schema/user')
const bcrypt = require('bcrypt')

const controller = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            const isTrue = user && await bcrypt.compare(password, user.password)
            isTrue ? res.status(200).json("Login Successfull") : res.status(404).json(user ? "Incorrect Password" : "No User Found")

        } catch (err) {
            next(err)

        }

    },
    rigister: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hash = await bcrypt.hash(password, 10)
            req.body.password = hash;
            const createUser = await User.create(req.body);
            createUser && res.status(200).json({ user: createUser, success: true })
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    forgot: async (req, res, next) => {
        try {
            const { email, confirmPassword } = req.body;
            const hash = await bcrypt.hash(confirmPassword, 10)
            const Update = await User.findOneAndUpdate({ email }, { password: hash }, { new: true })
            Update && res.status(200).json({ user: Update, success: true })

        } catch (error) {
            res.status(500).json({ error })
        }
    },
}

module.exports = controller;