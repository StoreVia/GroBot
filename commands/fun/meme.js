const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const titlecase = require(`titlecase`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('meme')
				.setDescription('Get A Random Meme.')
				.setDMPermission(true),
			usage: 'meme',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();
		let sub = [
            'meme',
            'me_irl',
            'memes',
            'dankmeme',
            'dankmemes',
            'ComedyCemetery',
            'terriblefacebookmemes',
            'funny'
        ]
        const random = Math.floor(Math.random() * sub.length)

		const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NextMeme')
					.setCustomId('nxtmeme')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('stop')
                	.setDisabled(false)
					.setStyle(ButtonStyle.Danger),
            )
        const buttonRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('NextMeme')
					.setCustomId('nxtmeme1')
                	.setDisabled(true)
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setLabel('Stop')
					.setCustomId('stop')
                	.setDisabled(true)
					.setStyle(ButtonStyle.Danger),
            )
			
        fetch(`https://www.reddit.com/r/${sub[random]}/random/.json`)
		.then((res) => res.json())
		.then((response) => {
			if(!response){
				return;
			}
			if(!response[0].data){
				return;
			}
			if(response[0].data.children[0].data.over_18 === true){
				return;
			} 

			let perma = response[0].data.children[0].data.permalink;
			let url = `https://reddit.com${perma}`;
			let memeImage = response[0].data.children[0].data.url || response[0].data.children[0].data.url_overridden_by_dest;
			let title = response[0].data.children[0].data.title;
        	const embed = new EmbedBuilder()
				.setTitle(`${titlecase(title)}`)
				.setURL(`${url}`)
				.setImage(memeImage)
				.setColor(`${process.env.ec}`)
      			.setFooter({
      				text: `${client.user.username} - ${process.env.year} ©`, 
      				iconURL: process.env.iconurl
    			});
			interaction.followUp({ embeds: [embed], components: [buttonRow] });
        });

		const filter = i => i.customId;
		const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

        collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			} 
			if(i.customId === "nxtmeme") {
				let sub1 = [
					'meme',
					'me_irl',
					'memes',
					'dankmeme',
					'dankmemes',
					'ComedyCemetery',
					'terriblefacebookmemes',
					'funny'
				]
				const random1 = Math.floor(Math.random() * sub.length)
				fetch(`https://www.reddit.com/r/${sub1[random1]}/random/.json`)
				.then((res) => res.json())
				.then((response) => {
					if(!response){
						return;
					}
					if(!response[0].data){
						return;
					}
					if(response[0].data.children[0].data.over_18 === true){
						return;
					} 

					let perma = response[0].data.children[0].data.permalink;
					let url = `https://reddit.com${perma}`;
					let memeImage = response[0].data.children[0].data.url || response[0].data.children[0].data.url_overridden_by_dest;
					let title = response[0].data.children[0].data.title;
        			const embed = new EmbedBuilder()
						.setTitle(`${titlecase(title)}`)
						.setURL(`${url}`)
						.setImage(memeImage)
						.setColor(`${process.env.ec}`)
      					.setFooter({
      						text: `${client.user.username} - ${process.env.year} ©`, 
      						iconURL: process.env.iconurl
    					});
					i.update({ embeds: [embed], components: [buttonRow] });
        		})
			}
			if(i.customId === "stop"){
				return await i.update({ components: [buttonRow1] });
			}
		})

		collector.on('end', async (_, reason) => {
			if (reason === 'idle' || reason === 'user') {
				return await interaction.editReply({ components: [buttonRow1] });
			}
		});
	}
};