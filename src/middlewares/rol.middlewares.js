const User = require("../models/user")
const roles = require('../helpers/roles')


const High = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if(user.role == roles.superAdmin.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

const Medium = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if (user.role == roles.admin.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

const Low = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if (user.role == roles.admin.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

module.exports = {High, Medium, Low}