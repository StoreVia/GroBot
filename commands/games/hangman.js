const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Hangman } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class HangeManGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('hangman')
				.setDescription('Play Hangman Game.'),
			usage: 'hangman',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new Hangman({
            message : interaction,
            isSlashGame: true,
            embed: {
              title: 'Hangman',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};