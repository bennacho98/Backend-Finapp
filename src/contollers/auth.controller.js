const User = require('../models/user')
const authService = require('../models/user')
const msg = require('../helpers/messages')
const { validationResult } = require('express-validator')


const authController = {
    login: async function(req, res) {
        try {
            const {email, password} = req.body
            if(!email || !password){
                res.status(400).json(msg.fieldsRequired)
            }
            const token = await authService.login(req.body)
            res.status(token.code).json({"token":token})
        } catch (error) {
            res.send(error)
        }
    },
    register: async function(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        try {
            const user = new User(req.body)
            const token = await authService.register(user)
            res.status(200).json({'token': token})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = authController