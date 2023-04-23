const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = class Update extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('update')
				.setDescription('DEVELOPER ONLY COMMNAD.'),
			usage: 'update',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const text = interaction.options.getString(`text`);

		const update = new ModalBuilder()
			.setCustomId('myUpdate')
			.setTitle('Welcome Private Update[DEVELOPER ONLY].');
		const update1 = new TextInputBuilder()
			.setCustomId('text')
			.setLabel("Update This Text To Database.")
			.setStyle(TextInputStyle.Paragraph);
		const update0 = new ActionRowBuilder().addComponents(update1);
		update.addComponents(update0);

		interaction.showModal(update)
        
	}
};