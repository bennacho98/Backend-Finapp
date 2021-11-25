const express = require('express')
const incomeController = require('../contollers/income.controller')
const { check } = require('express-validator')
const router = express.Router()
const Auth = require('../middlewares/authentication')
const mail = require('../services/mail.service')
const Rol = require('../middlewares/rol.middlewares')

/**
 * @api
 * @apiName
 * @apiGroup
 */

router.post('/', Auth, incomeController.add)
router.get('/', Auth, Rol.Medium, incomeController.list)
router.get('/:id', incomeController.find)
router.get('/send/mail', async (req, res)=>{
    const data = await mail.send(
        'joelmiller@yopmail.com', '💰🤑 gana dinero con este truco', 
        'Gran truco para ganar dinero')
    res.send(data)
})

module.exports = router
