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

module.exports.addBot = addBot
module.exports.getBots = getBots

