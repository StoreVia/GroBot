const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Slots } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class SlotsGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('slots')
				.setDescription('Play Slots Game.'),
			usage: 'slots',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new Slots({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Slots',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};