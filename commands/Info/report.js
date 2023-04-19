const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Report extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('report')
				.setDescription('Report Any Bug Or Suggest Something For Bot Implimentation.')
                .addStringOption(option => 
                    option.setName(`bug`)
                        .setDescription(`Tell Us About The Bug/Any Suggestion.`)
                        .setRequired(true)),
			usage: 'report',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		let report = interaction.options.getString(`bug`);

        const embed = new EmbedBuilder()
            .setTitle(`Bug Reported!`)
            .setDescription(`\`\`\`${report}\`\`\``)
            .addFields(
                { name: `GuildName:`, value: `> ${interaction.guild.name}`, inline: true },
                { name: `ReportedUser:`, value: `> ${interaction.user.tag}`, inline: true },
            )
            .setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`,
                iconURL: process.env.iconurl
            });

        client.channels.cache.get(`${process.env.reportlogschannel_id}`).send({ embeds: [embed] })
        await interaction.deferReply({ ephemeral: true })
        await interaction.followUp({ content: "Reported Successfully, Our Team Will Contact You Soon." })
	}
};