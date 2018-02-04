const mongoose = require('mongoose')

const botSchema = new mongoose.Schema({
    botName: String,
    botAccessToken: String
})

module.exports = mongoose.model('Bot', botSchema)