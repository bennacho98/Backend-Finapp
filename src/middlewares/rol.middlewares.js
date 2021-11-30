const User = require("../models/user")
const roles = require('../helpers/roles')


const High = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if(user.role == roles.Administrador.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

const HighMedium = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if (user.role == roles.Entrenador.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}
const Medium = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if (user.role == roles.Deportista.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

const Low = async (req, res, next) => {
    let user = await User.findById(req.body.user)
    if (user.role == roles.regular.levelAccess){
        next()
    }else{
        res.status(402).json("user not allowed")
    }
}

module.exports = {High, HighMedium, Medium, Low}