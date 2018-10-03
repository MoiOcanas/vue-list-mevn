const express = require('express')
const app = express()

const mongoose = require('mongoose')
const morgan = require('morgan')

//DB connection
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected.'))
    .catch(err => console.log(err))

//Settings
app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/tasks',require('./routes/tasks'))

//Static files
app.use(express.static(__dirname + '/public'))

//Server listening
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})