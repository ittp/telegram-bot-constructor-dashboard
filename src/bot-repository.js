const Bot = require('./models/telegram-bot')

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

function getBotById(id, callback) {
    Bot.findOne({ _id: id }, (err, bot) => {
        callback(bot)
    })

}

module.exports.addBot = addBot
module.exports.getBots = getBots
module.exports.getBotById = getBotById

