const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Wordle } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class WordleGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('wordle')
				.setDescription('Play Wordle Game.'),
			usage: 'wordle',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        new Wordle({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Wordle',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};