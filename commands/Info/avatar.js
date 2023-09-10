const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Avatar extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('avatar')
				.setDescription(`Get Any User's Avatar.`)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Avatar.`)
                        .setRequired(false)),
			usage: 'avatar',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

		const UserOption = interaction.options.getUser('user') || interaction.user;
        let mentionedMember = UserOption;

    	const userEmbed = new EmbedBuilder()
    		.setTitle(`${mentionedMember.username}'s Avatar`)
        	.setDescription(`> Click One Of The Formats You Like.\n> PNG(Recommended)`)
        	.setImage(mentionedMember.displayAvatarURL({ size: 4096, dynamic: true, extension: "png" }))
			.addFields(
				{ name: `PNG`, value: `[ClickHere](${mentionedMember.displayAvatarURL({ dynamic: true, extension: "png" })})`, inline: true},
				{ name: `JPG`, value: `[ClickHere](${mentionedMember.displayAvatarURL({ dynamic: true, extension: "jpg" })})`, inline: true},
				{ name: `WEBP`, value: `[ClickHere](${mentionedMember.displayAvatarURL({ dynamic: true, extension: "webp" })})`, inline: true},
			)
        	.setColor(`${process.env.ec}`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
			});
   	    return await interaction.followUp({ embeds: [userEmbed] })
	}
};