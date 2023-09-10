const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Updates extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('updates')
				.setDescription('Get Latest Updates Everyday.')
				.setDMPermission(true),
			usage: 'updates',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const update = db.fetch(`update`) || "Null";

		await interaction.deferReply();
		let embed = new EmbedBuilder()
            .setTitle(`Updates`)
            .setDescription(`\`\`\`${update}\`\`\``)
			.setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`,
                iconURL: process.env.iconurl
            });
		interaction.followUp({ embeds: [embed] })
	}
};