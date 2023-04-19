const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Update extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('update')
				.setDescription('DEVELOPER ONLY COMMNAD.')
                .addStringOption(option =>
					option.setName(`text`)
						.setDescription(`DEVELOPER ONLY COMMNAD.`)
						.setRequired(true)),
			usage: 'update',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const text = interaction.options.getString(`text`);

		db.set(`update`, text)
        interaction.reply(`Announcement Updated To Database.`)
        
		
	}
};