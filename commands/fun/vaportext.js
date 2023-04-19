const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class VaporText extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('vaportext')
				.setDescription('Convert Normal Text To Vapor Text.')
				.addStringOption(option =>
					option.setName(`text`)
						.setDescription(`Enter Text That You Want To Convert To Vapor Text.`)
						.setRequired(true)),
			usage: 'vaportext',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {   

        await interaction.deferReply();

        const args = interaction.options.getString(`text`);

        let msg = "";
        for (let i = 0; i < args.length; i++) {
            msg += args[i].toUpperCase().split("").join(" ") + " ";
        }

        return await interaction.followUp({ content: `${msg}` })
        
	}
};