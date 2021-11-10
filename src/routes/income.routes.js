const express = require('express')
const incomeController = require('../contollers/income.controller')
const { check } = require('express-validator')
const router = express.Router()

/**
 * @api
 * @apiName
 * @apiGroup
 */

router.post('/', incomeController.add)
router.get('/', incomeController.list)
router.get('/:id', incomeController.find)

module.exports = router
