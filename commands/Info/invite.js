const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Invite extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('invite')
				.setDescription('Gives You Invite Link Of Bot.')
				.setDMPermission(true),
			usage: 'invite',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		await interaction.deferReply();

		const embed = new EmbedBuilder()
        	.setTitle("Invite Me")
        	.setThumbnail(`${process.env.iconurl}`)
        	.setColor(`${process.env.ec}`)
        	.setDescription(`Invite \`${client.user.username}\` Bot Now - [inviteMe](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`)
        	.setFooter({
        		text: `${client.user.username} - ${process.env.year} ©`, 
        		iconURL: process.env.iconurl
      		});
		return await interaction.followUp({ embeds: [embed] });
	}
};