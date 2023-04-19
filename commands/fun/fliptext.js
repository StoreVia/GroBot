const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const flip = require("flip-text");

module.exports = class FlipText extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('fliptext')
				.setDescription('Flip The Text UpsideDown.')
			    .addStringOption(option =>
                    option.setName('text')
                        .setDescription('Enter Text You Want To Flip.')
                        .setRequired(true)),
			usage: 'fliptext',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		
        const args = interaction.options.getString(`text`);
        const flipped = flip(args);
		const fliptext = flipped.split("").reverse().join("");
		
		await interaction.deferReply();
        await interaction.followUp({ content: `${fliptext}`});

	}
};