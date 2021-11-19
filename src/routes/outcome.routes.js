const express = require('express')
const outcomeController = require('../contollers/outcome.controller')
const { check } = require('express-validator')
const router = express.Router()
const Auth = require('../middlewares/authentication')

router.post('/', Auth, outcomeController.add)
router.get('/', Auth, outcomeController.list)
router.get('/:id', outcomeController.find)

module.exports = router