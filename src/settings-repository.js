const OnTextAnswer = require('./models/on-text-answer')
const InlinKey = require('./models/inline-key')

function addOnTextAnswer(answer, callback) {
    let newOnTextAnswer = new OnTextAnswer({
        messageText: answer.messageText,
        answerText: answer.answerText,
        botAccessToken: answer.botAccessToken
    })

    newOnTextAnswer.save((err) => {
        if (err) {
            throw err
        } else {
            callback()
        }
    })
}

function addInlineKey(inlinKey, callback) {
    let newInlineKey = new InlinKey({
        buttonText: inlinKey.buttonText,
        answerText: inlinKey.answerText,
        botAccessToken: inlinKey.botAccessToken
    })

    newInlineKey.save((err) => {
        if (err) {
            throw err
        } else {
            callback()
        }
    })
}

function getOnTextAnswersByBot(botAccessToken, callback) {
    OnTextAnswer.find({ botAccessToken: botAccessToken }, (err, answers) => {
        callback(answers)
    })
}

function getInlineKeysByBot(botAccessToken, callback) {
    InlinKey.find({botAccessToken: botAccessToken}, (err, buttons) => {
        callback(buttons)
    })
}

module.exports.addOnTextAnswer = addOnTextAnswer
module.exports.getOnTextAnswersByBot = getOnTextAnswersByBot
module.exports.addInlineKey = addInlineKey
module.exports.getInlineKeysByBot = getInlineKeysByBot