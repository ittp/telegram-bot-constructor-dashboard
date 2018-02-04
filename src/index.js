const express = require('express')
const path = require('path')

const app = express()
const port = 3000 || env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (request, response) => {
    response.render('index')
})

app.listen(port, () => {
    console.log(`Server is listening to ${port}`)
})