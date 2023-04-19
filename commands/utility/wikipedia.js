const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class Wikipedia extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('wikipedia')
				.setDescription('Search Something In Wikipedia.')
				.addStringOption(option =>
					option.setName(`query`)
						.setDescription(`Enter Text That You Want To Search In Wikipedia.`)
						.setRequired(true)),
			usage: 'wikipedia',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		

		const query = interaction.options.getString(`query`)

        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
		.then((res) => res.json())
		.then(async (data) => {
			if(data.type === "disambiguation"){
				try{
					const embed = new EmbedBuilder()
						.setTitle(`${data.title}`)
						.setURL(`${data.content_urls.desktop.page}`)
						.setDescription(`${data.extract}\n\n> Link For This Topic : [Click Me!](${data.content_urls.desktop.page})`)
						.setColor(`${process.env.ec}`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/1042676003291533365/1060592246900142190/Wikipedia-logo-transparent.png`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`,
							iconURL: process.env.iconurl
						});
					await interaction.deferReply();
					interaction.followUp({ embeds: [embed] })
				} catch(e) {
					await interaction.deferReply({ ephemeral: true });
					interaction.followUp({ content: `> No Query Found For \`${query}\`` })
				}
			} else {
				try{
					const embed = new EmbedBuilder()
						.setTitle(`${data.title}`)
						.setURL(`${data.content_urls.desktop.page}`)
						.setDescription(`${data.extract}`)
						.setColor(`${process.env.ec}`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/1042676003291533365/1060592246900142190/Wikipedia-logo-transparent.png`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`,
							iconURL: process.env.iconurl
					 	});
					await interaction.deferReply();
					interaction.followUp({ embeds: [embed] })
				} catch(e) {
					await interaction.deferReply({ ephemeral: true });
					interaction.followUp({ content: `> No Query Found For \`${query}\`` })
				}
			}
		})
	}
};