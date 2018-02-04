const OnTextAnswer = require('./models/on-text-answer')

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

function getOnTextAnswersByBot(botAccessToken, callback) {
    OnTextAnswer.find({ botAccessToken: botAccessToken }, (err, answers) => {
        callback(answers)
    })
}

module.exports.addOnTextAnswer = addOnTextAnswer
module.exports.getOnTextAnswersByBot = getOnTextAnswersByBot