const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const url = require('url')

const botRepository = require('./bot-repository')
const settingsRepository = require('./settings-repository')
const config = require('../config')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (request, response) => {
    botRepository.getBots(bots => {
        response.render('index', { bots: bots })
    })

})

app.get('/bot/configure/', (request, response) => {
    let parsedUrl = url.parse(request.url, true);
    let botAccessToken = parsedUrl.query.botAccessToken;

    botRepository.getBotByToken(botAccessToken, (bot) => {
        settingsRepository.getOnTextAnswersByBot(botAccessToken, (answers) => {
            settingsRepository.getInlineKeysByBot(botAccessToken, (inlineKeys) => {
                settingsRepository.getInterviews(botAccessToken, (interviews) => {
                    settingsRepository.getAnswersByBot(botAccessToken, (interviewAnswers) => {
                        response.render('bot', {
                            bot: bot,
                            answers: answers,
                            inlineKeys: inlineKeys,
                            interviews: interviews,
                            interviewAnswers: interviewAnswers
                        })
                    })
                })
            })
        })
    })
})

app.post('/bot/add', (request, response) => {
    botRepository.addBot(request.body, () => {
        response.redirect('/')
    })
})

app.post('/bot/answer', (request, response) => {
    settingsRepository.addOnTextAnswer({
        messageText: request.body.messageText,
        answerText: request.body.answerText,
        botAccessToken: request.body.botAccessToken
    }, () => {
        response.redirect(`/bot/configure/?botAccessToken=${request.body.botAccessToken}`)
    })
})

app.get('/bot/answer/remove', (request, response) => {
    let parsedUrl = url.parse(request.url, true)
    let answerId = parsedUrl.query.id

    settingsRepository.removeOnTextAnswer(answerId, () => {
        response.redirect(`/bot/configure/?botAccessToken=${parsedUrl.query.botAccessToken}`)
    })
})

app.post('/bot/inlinekey', (request, response) => {
    settingsRepository.addInlineKey({
        buttonText: request.body.buttonText,
        answerText: request.body.answerText,
        botAccessToken: request.body.botAccessToken
    }, () => {
        response.redirect(`/bot/configure/?botAccessToken=${request.body.botAccessToken}`)
    })
})

app.get('/bot/inlinekey/remove', (request, response) => {
    let parsedUrl = url.parse(request.url, true)
    let inlineKeyId = parsedUrl.query.id

    settingsRepository.removeInlineKey(inlineKeyId, () => {
        response.redirect(`/bot/configure/?botAccessToken=${parsedUrl.query.botAccessToken}`)
    })
})


app.post('/bot/interview', (request, response) => {
    settingsRepository.addInterview(request.body, () => {
        response.redirect(`/bot/configure/?botAccessToken=${request.body.botAccessToken}`)
    })
})

app.get('/bot/interview/remove', (request, response) => {
    let parsedUrl = url.parse(request.url, true)
    let interviewId = parsedUrl.query.id

    settingsRepository.removeInterview(interviewId, () => {
        response.redirect(`/bot/configure/?botAccessToken=${parsedUrl.query.botAccessToken}`)
    })
})

app.listen(port, () => {
    mongoose.connect(config.connectionString)

    console.log(`Server is listening to ${port}`)
})