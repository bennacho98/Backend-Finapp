const express = require('express')
const router = express.Router()
const authController = require('../contollers/auth.controller')
const { check } = require('express-validator')
const Auth = require('../middlewares/authentication')
const Rol = require('../middlewares/rol.middlewares')


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
 *              "name": "Joel",
 *              "lastname": "Miller",
 *              "role": 2,
 *              "email": "email@email.on",
 *              "password": "$2b$10$ecfvbWrDO9.
 *          }
 * @apiPermission none
 * @apiSuccess {string} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 ok
 *            {
 *                "token": {
 *                    "userData": {
 *                        "name": "Joel",
 *                        "lastname": "Miller",
 *                        "role": 2,
 *                        "email": "email@email.on",
 *                        "password": "$2b$10$ecfvbWrDO9.vj38k3E6U5uD4hf6uryfVs9df9YOBHZVxHiRwAO3Ju",
 *                        "_id": "61afb829f8b849e534380a39",
 *                        "__v": 0
 *                    },
 *                    "code": 200,
 *                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWZiODI5ZjhiODQ5ZTUzNDM4MGEzOSIsImlhdCI6MTYzODkwNTg5NywiZXhwIjoxNjM5NTEwNjk3fQ.yFYJvVzXqJcLdNjQrrqkCdbDUcaoBhzC6uSGsMyoRDw"
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
 * @apiError (200) Error el email es requerido
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
 * @apiError (422) (Data Error) error en la validación de los datos
 * @apiErrorExample {json} Data-Error-Example
 * HTTP/1.1 422 unprocesable entry
 * {
 *       "errors": [
 *           {
 *               "value": "J",
 *               "msg": "Nombre inválido, mínimo 2 carácteres, máximo 40 carácteres",
 *               "param": "name",
 *               "location": "body"
 *           },
 *           {
 *               "value": "ema",
 *               "msg": "Email no válido",
 *               "param": "email",
 *               "location": "body"
 *           },
 *           {
 *               "value": "as",
 *               "msg": "Contraseña débil",
 *               "param": "password",
 *               "location": "body"
 *           }
 *       ]
 *   }
 */

router.post('/register', Auth, Rol.Medium, [
        check('name', 'Nombre inválido, mínimo 2 carácteres, máximo 40 carácteres').isLength({min: 2, max: 40}),
        check('lastname', 'Nombre inválido, mínimo 2 carácteres, máximo 40 carácteres').isLength({min: 2, max: 40}),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Contraseña débil').isStrongPassword()
    ],
    //va la función
    authController.register
  )

/**
 * @api {post} /login Ingreso de usuarios
 * @apiName Login
 * @apiGroup AUTH
 * @apiDescription ingreso de usuarios usando los campos email y password
  * @apiPermission none
 * @apiSuccess {string} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 ok
 *            {
 *                 "token": {
 *                     "user": {
 *                         "_id": "61afb829f8b849e534380a39",
 *                         "name": "Joel",
 *                         "lastname": "Miller",
 *                         "role": 2,
 *                         "email": "email@email.on",
 *                         "password": "$2b$10$ecfvbWrDO9.vj38k3E6U5uD4hf6uryfVs9df9YOBHZVxHiRwAO3Ju"
 *                     },
 *                     "code": 200,
 *                     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWZiODI5ZjhiODQ5ZTUzNDM4MGEzOSIsImlhdCI6MTYzODkwOTI4NSwiZXhwIjoxNjM5NTE0MDg1fQ.7yI8tasH4sc0ZGX_qGiR0VamLN9by6yGujgMD3OpQkk"
 *                 }
 *             }
 * @apiParam {string} email E-mail del usuario que ingresa
 * @apiError (200) Error el email es requerido
 * @apiErrorExample {json} Error-Response-Example
 *        {
 *            "errors": [
 *                 {
 *                     "value": "ema",
 *                     "msg": "Email no válido",
 *                     "param": "email",
 *                     "location": "body"
 *                 }
 *             ]
 *         }
 * @apiParam {string} password Contraseña del ususario
 * @apiSampleRequest localhost:3000/auth/login
 */

router.post('/login', [
  check('email', 'Email no válido').isEmail(),
], authController.login)

module.exports = router