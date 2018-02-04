const Bot = require('./models/bot')

function addBot(bot, callback) {
    let newBot = new Bot({
        botName: bot.botName,
        botAccessToken: bot.botAccessToken
    })

    newBot.save(function (err) {
        if (err) {
            throw err
        } else {
            callback()
        }
    })

}

function getBots(callback) {
    Bot.find((err, bots) => {
        callback(bots)
    })
}

function getBotByToken(token, callback) {
    Bot.findOne({ botAccessToken: token }, (err, bot) => {
        callback(bot)
    })

}

module.exports.addBot = addBot
module.exports.getBots = getBots
module.exports.getBotByToken = getBotByToken

