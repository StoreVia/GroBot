const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Flood } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class FloodGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('flood')
				.setDescription('Play Flood Game.'),
			usage: 'flood',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        const Game = new Flood({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Flood',
              color: `${process.env.ec}`,
            },
        })
		Game.startGame();
	}
};