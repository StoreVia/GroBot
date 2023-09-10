const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const dare = require(`../../A_Gro_db/dare.json`);

module.exports = class Dare extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dare')
				.setDescription('Get A Random Dare.')
				.setDMPermission(true),
			usage: 'dare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Dare')
					.setCustomId('nxtdare')
					.setStyle(ButtonStyle.Success),
            )

            const buttonRow1 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
                		.setLabel('Dare')
                		.setCustomId('nxtdare1')
                		.setDisabled(true)
						.setStyle(ButtonStyle.Success),
            )

		await interaction.deferReply();

		let embed = new EmbedBuilder()
  			.setTitle('Dare')
  			.setDescription(dare[Math.floor(Math.random() * dare.length)])
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId === 'nxtdare';
		const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else {
                let embed = new EmbedBuilder()
                    .setTitle('Dare')
                    .setDescription(dare[Math.floor(Math.random() * dare.length)])
  					.setFooter({
      					text: `${client.user.username} - ${process.env.year} ©`, 
      					iconURL: process.env.iconurl
    				})
        			.setColor(`${process.env.ec}`);
				await i.update({ embeds: [embed], components: [buttonRow] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				return await interaction.editReply({ components: [buttonRow1] });
			}
		});
	}
};