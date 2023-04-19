const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { MatchPairs } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class MatchPairsGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('matchpairs')
				.setDescription('Play MatchPairs Game.'),
			usage: 'matchpairs',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new MatchPairs({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Match Pairs',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};