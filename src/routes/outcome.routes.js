const express = require('express')
const outcomeController = require('../contollers/outcome.controller')
const { check } = require('express-validator')
const router = express.Router()

router.post('/', outcomeController.add)
router.get('/', outcomeController.list)
router.get('/:id', outcomeController.find)

module.exports = router