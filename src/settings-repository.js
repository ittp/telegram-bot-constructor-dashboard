const OnTextAnswer = require('./models/on-text-answer')
const InlinKey = require('./models/inline-key')
const Interview = require('./models/interview')
const Answer = require('./models/answer')

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

function addInterview(interview, callback) {
    let newInterview = new Interview({
        interviewName: interview.interviewName,
        question: interview.question,
        answerA: interview.answerA,
        answerB: interview.answerB,
        botAccessToken: interview.botAccessToken
    })

    newInterview.save((err) => {
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
    InlinKey.find({ botAccessToken: botAccessToken }, (err, buttons) => {
        callback(buttons)
    })
}

function getInterviews(botAccessToken, callback) {
    Interview.find({ botAccessToken: botAccessToken }, (err, interviews) => {
        callback(interviews)
    })
}

function getAnswersByBot(botAccessToken, callback) {
    Answer.find((err, answers) => callback(answers))
}

function removeOnTextAnswer(id, callback) {
    OnTextAnswer.findByIdAndRemove(id, err => callback())
}

function removeInlineKey(id, callback) {
    InlinKey.findByIdAndRemove(id, err => callback())
}

module.exports.addOnTextAnswer = addOnTextAnswer
module.exports.getOnTextAnswersByBot = getOnTextAnswersByBot
module.exports.addInlineKey = addInlineKey
module.exports.getInlineKeysByBot = getInlineKeysByBot
module.exports.addInterview = addInterview
module.exports.getInterviews = getInterviews
module.exports.getAnswersByBot = getAnswersByBot
module.exports.removeOnTextAnswer = removeOnTextAnswer
module.exports.removeInlineKey = removeInlineKey