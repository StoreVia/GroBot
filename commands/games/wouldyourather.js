const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { WouldYouRather } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class WouldYouRatherGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('wouldyourather')
				.setDescription('Play Would You Rather Game.'),
			usage: 'wouldyourather',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        new WouldYouRather({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Would You Rather',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};