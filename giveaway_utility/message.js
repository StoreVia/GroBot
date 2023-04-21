const config = require('./config.json');

module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY ENDED** 🎉",
  drawing:  `Ends: **{timestamp}**`,
  iconURL: `${process.env.iconurl}`,
  inviteToParticipate: `> **React With 🎉 To Participate.**\n`,
  winMessage: "> Congratulations🎉, {winners}. You won **{this.prize}**.",
  embedFooter: `GroBot - ${process.env.year} ©`,
  noWinner: "Giveaway Cancelled Due To No Valid Participations.",
  hostedBy: "Hosted by: {this.hostedBy}",
  winners: "Winner's",
  endedAt: `GroBot - ${process.env.year} ©`
}
