const express = require('express')
const router = express.Router()
const msg = require('../helpers/messages')
const User = require('../models/user')
const authService = require('../services/auth.service')


/**
 * @api {post} /resgister Registro de usuarios
 * @apiName Registro
 * @apiGroup AUTH
 * @apiDescription registr de usuarios usando los campos nombre, email, password
 * @apiParam {string} name Nombre del usuario que se registra
 * @apiParam {string} email E-mail del usuario que se registra
 * @apiParam {string} password Contraseña del ususario
 * @apiParamExample {json} Request-Example:
 *          {
 *              "name": "Juan"
 *              "email": "jg@email.com"
 *              "password": "123456"
 *          }
 * @apiPermission none
 * @apiSuccess {string} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 ok
 *            {
 *                "token": {
 *                    "userData": {
 *                        "name": "Juan",
 *                        "email": "jg@email.com",
 *                        "password": "$2b$10$323qwuIJMh6w1zkU8aOzfOWQ.8Y95Qw6c27xX3Jy2psb9zwYS/Fym",
 *                        "_id": "6179becd9d68f8b618716a00",
 *                        "__v": 0
 *                    },
 *                    "code": 200,
 *                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTc5YmVjZDlkNjhmOGI2MTg3MTZhMDAiLCJpYXQiOjE2MzUzNjg2NTMsImV4cCI6MTY2NjkwNDY1M30.-abuDK-8yqHXzTK7NHjyUYyA0TqD3BM5crrEnTwf8Gs"
 *                }
 *            }
 * @apiError (200) Example El email debe ser único
 * @apiErrorExample {json} Error-Response
 *  HTTP/1.1 200 ok
 *    {
 *       "token": {
 *           "index": 0,
 *           "code": 11000,
 *           "keyPattern": {
 *               "email": 1
 *           },
 *           "keyValue": {
 *               "email": "email@email.com"
 *           }
 *       }
 *   }
 * @apiError (200) Error El email es requerido
 * @apiErrorExample {json} Error-Response-Example
 * {
 *   "token": {
 *       "errors": {
 *           "email": {
 *               "name": "ValidatorError",
 *               "message": "Path `email` is required.",
 *               "properties": {
 *                   "message": "Path `email` is required.",
 *                   "type": "required",
 *                   "path": "email"
 *               },
 *               "kind": "required",
 *               "path": "email"
 *           }
 *       },
 *       "_message": "user validation failed",
 *       "name": "ValidationError",
 *       "message": "user validation failed: email: Path `email` is required."
 *   }
 * }
 */

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await authService.register(user)
        res.status(200).json({'token': token})
    } catch (error) {
        res.send(error)
    }
})

/**
 * @api {post} /login Ingreso de usuarios
 * @apiName Login
 * @apiGroup AUTH
 * @apiDescription ingreso de usuarios usando los campos nombre, email y password
 * @apiParam {string} name Nombre del usuario que ingresa
 * @apiParam {string} email E-mail del usuario que ingresa
 * @apiParam {string} password Contraseña del ususario
 * @apiSampleRequest localhost:3000/auth/login
 */

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json(msg.fieldsRequired)
        }
        let token = await authService.login(req.body)
        res.status(token.code).json(token)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router