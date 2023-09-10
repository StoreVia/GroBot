const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { RockPaperScissors } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class RockPaperScissorsGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('rockpapersissors')
				.setDescription('Play Rps Game.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`With Which User You Want To Play.`)
                        .setRequired(true)),
			usage: 'rockpapersissors',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        const opponent = interaction.options.getUser('user');
        new RockPaperScissors({
            message : interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'Rock Paper Sissors',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};