const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { TicTacToe } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class TicTacToeGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('tictactoe')
				.setDescription('Play TicTacToe Game.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`With Which User You Want To Play.`)
                        .setRequired(true)),
			usage: 'tictactoe',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        const opponent = interaction.options.getUser('user');
        new TicTacToe({
            message : interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'Tic Tac Toe',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};