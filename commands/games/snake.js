const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const { Snake } = require('../../B_Gro_Modules/discord-gamecord')

module.exports = class SnakeGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('snake')
				.setDescription('Play Snake Game.'),
			usage: 'snake',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
        new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: 'Snake',
              color: `${process.env.ec}`,
              OverTitle: 'Game Over',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            emojis: {
              board: '⬛', 
              food: '🍎',
              up: '⬆️', 
              right: '➡️',
              down: '⬇️',
              left: '⬅️',
            },
            foods: ['🍎', '🍇', '🍊', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍏'],
            stopButton: 'Stop',
            othersMessage: 'You are not allowed to use buttons for this message!',
          }).startGame();
	}
};