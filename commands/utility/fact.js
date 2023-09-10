const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const facts = require(`../../A_Gro_db/facts.json`);
const titlecase = require(`titlecase`);

module.exports = class Fact extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('fact')
				.setDescription('Gives A Random Fact.')
				.setDMPermission(true),
			usage: 'fact',
			category: 'utility',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NextFact')
					.setCustomId('nxtfact')
					.setStyle(ButtonStyle.Success),
            )
            const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NextFact')
					.setCustomId('nxtfact1')
                    .setDisabled(true)
					.setStyle(ButtonStyle.Success),
            )

		await interaction.deferReply();

		let embed = new EmbedBuilder()
  			.setTitle('Facts')
    		.setThumbnail(`https://i.imgur.com/ryyJgAK.png`)
  			.setDescription(titlecase(facts[Math.floor(Math.random() * facts.length)]))
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
      			iconURL: process.env.iconurl
    		})
        	.setColor(`${process.env.ec}`);
		await interaction.followUp({ embeds: [embed], components: [buttonRow] });

        const filter = i => i.customId === 'nxtfact';
		const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} else {
                let embed = new EmbedBuilder()
  					.setTitle('Facts')
    				.setThumbnail(`https://i.imgur.com/ryyJgAK.png`)
  					.setDescription(titlecase(facts[Math.floor(Math.random() * facts.length)]))
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