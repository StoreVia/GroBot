const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Catsay extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('catsay')
				.setDescription('Make The Cat Say Your Message.')
				.setDMPermission(true)
                .addStringOption(option =>
                    option.setName('string')
                        .setDescription(`Enter Text.`)
                        .setRequired(true)),
			usage: 'catsay',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const string = interaction.options.getString(`string`);

    return await interaction.followUp({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${string}`,
          name: "catsay.png",
        },
      ],
    });
	}
};