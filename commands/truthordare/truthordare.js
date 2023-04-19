const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const tod = require(`../../A_Gro_db/tod.json`);

module.exports = class TruthOrDare extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('truthordare')
				.setDescription('Get A Random Truth Or Dare.')
				.setDMPermission(true),
			usage: 'truthordare',
			category: 'truthordare',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Tod Random')
					.setCustomId('nxttod')
					.setStyle(ButtonStyle.Success),
            )

            const buttonRow1 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
                		.setLabel('Tod Random')
                		.setCustomId('nxttod')
                		.setDisabled(true)
						.setStyle(ButtonStyle.Success),
            )

		await interaction.deferReply();

		let embed = new EmbedBuilder()
  			.setTitle('Truth Or Dare')
  			.setDescription(tod[Math.floor(Math.random() * tod.length)])
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId === 'nxttod';
		const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else {
                let embed = new EmbedBuilder()
                    .setTitle('Truth Or Dare')
                    .setDescription(tod[Math.floor(Math.random() * tod.length)])
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