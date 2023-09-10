const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { TwoZeroFourEight } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class TwoZeroFourEightGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('2048')
				.setDescription('Play 2048 Game.'),
			usage: '2048',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new TwoZeroFourEight({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: '2048',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};