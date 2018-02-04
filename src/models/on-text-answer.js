const mongoose = require('mongoose')

const onTextAnswer = new mongoose.Schema({
    messageText: { type: String, unique: true },
    answerText: String,
    botAccessToken: String
})

module.exports = mongoose.model('OnTextAnswer', onTextAnswer)