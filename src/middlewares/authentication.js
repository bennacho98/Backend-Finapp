const jwt = require('jsonwebtoken')
const user = require('../models/user')

const Authorized = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        res.status(403).json('unauthorized')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.user = decoded.id
        next()
    } catch (error) {
        res.status(405).json({msg: 'Invalid token'})
    }
}

module.exports = Authorized

// const u = await User.findById(decoded)
// u.rol == 1 ? 'admin' : 'no admin'