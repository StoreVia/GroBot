const { registerFont } = require('canvas')

registerFont(`${__dirname}/src/fonts/aAkhirTahun.ttf`, { family: "DEFAULT" })
registerFont(`${__dirname}/src/fonts/Yellow Candy.otf`, { family: "ANIMATION" })
registerFont(`${__dirname}/src/fonts/go3v2.ttf`, { family: "CHINESE" })

module.exports = {
    WelcomeCard : require('./src/WelcomeCard'),
    version: require('./package.json').version
}

