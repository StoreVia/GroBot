Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Minesweeper } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class MinesSweeperGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('minesweeper')
				.setDescription('Play MineWeeper Game.'),
			usage: 'minesweeper',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        const opponent = interaction.options.getUser('user');
        new Minesweeper({
            message : interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
              title: 'MinesWeeper',
              color: `${process.env.ec}`,
            },
          }).startGame();
	}
};