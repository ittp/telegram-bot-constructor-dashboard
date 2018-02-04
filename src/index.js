const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const botRepository = require('./bot-repository')
const config = require('../config')

const app = express()
const port = 3000 || env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));


app.get('/', (request, response) => {
    botRepository.getBots(bots => {
        response.render('index', { bots: bots })
    })

})

app.post('/bot/add', (request, response) => {
    botRepository.addBot(request.body, () => {
        response.redirect('/')
    })
})

app.listen(port, () => {
    mongoose.connect(config.connectionString)

    console.log(`Server is listening to ${port}`)

})