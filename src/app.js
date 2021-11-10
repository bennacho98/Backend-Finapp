const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
require('dotenv').config()
const app = express()
const authService = require('./routes/auth.routes')
const incomeRoutes = require('./routes/income.routes')
const outcomeRoutes = require('./routes/outcome.routes')

//Configuraciones
app.set('port', process.env.PORT || 3000)
mongoose.connect(process.env.DB_STRING)
.then(db => console.log('Connected to Mongo'))
.catch(err => console.log(err))
app.use('/documentation', express.static(path.join(__dirname, '../doc/')))

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))

//Rutas
app.use('/auth', authService)
app.use('/incomes', incomeRoutes)
app.use('/aoutcomes', outcomeRoutes)

//Inicio del servidor
app.listen(app.get('port'), () => {
    console.log('Server Running')
})