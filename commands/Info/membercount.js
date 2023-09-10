const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class MemberCount extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('membercount')
				.setDescription('Gives You Server Member Count.')
				.setDMPermission(true),
			usage: 'membercount',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

		let embed = new EmbedBuilder()
  			.setTitle(`Member Count - \`${interaction.guild.name}\``)
  			.setDescription(`**Total Members: **\`${interaction.guild.memberCount}\``)
  			.setColor(`${process.env.ec}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
			})
		return await interaction.followUp({ embeds: [embed] });
	}
};