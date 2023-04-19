const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = class Help extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('help')
				.setDescription('Gives List Of Commands Of Bot.')
				.setDMPermission(true),
			usage: 'help',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setPlaceholder('Select An Option')
					.setCustomId('hlpcmd')
					.setDisabled(false)
					.setMaxValues(1)
					.setOptions([
						{
							label: 'Akinator',
							value: 'akinator',
							emoji: '🧞',
						},
						{
							label: 'Chatbot',
							value: 'chatbot',
							emoji: '🤖',
						},
						{
							label: 'Covid',
							value: 'covid',
							emoji: '🦠',
						},
						{
							label: 'Fun',
							value: 'fun',
							emoji: '🎯',
						},
						{
							label: 'Mini Player Games',
							value: 'games',
							emoji: '🎮',
						},
						{
							label: 'Giveaway',
							value: 'giveaway',
							emoji: '🎉',
						},
						{
							label: 'Image',
							value: 'image',
							emoji: '🖼️',
						},
						{
							label: 'Info',
							value: 'info',
							emoji: '🌐',
						},
						{
							label: 'Truth Or Dare',
							value: 'tod',
							emoji: '🎭',
						},
						{
							label: 'Utility',
							value: 'utility',
							emoji: '🔨',
						},
						{
							label: 'Welcome',
							value: 'welcome',
							emoji: '👋',
						},
					]),
			);

		const disabled = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setPlaceholder('Select An Option')
					.setCustomId('hlpcmd1')
					.setDisabled(true)
                	.setOptions([
						{
							label: 'GroBot',
							value: 'grobot',
							emoji: '🤖',
						},
                   	]	
				)
			);

		await interaction.deferReply();
			
		const filter = i => i.customId === 'hlpcmd';
		const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });
			
		let embed = new EmbedBuilder()
  			.setTitle('Help')
			.setThumbnail(`${process.env.iconurl}`)
  			.setDescription(`Select One Of The Options Below.`)
  			.setFooter({
      			text: `${client.user.username} - ${process.env.year} ©`, 
     			iconURL: process.env.iconurl
   			})
        	.setColor(`${process.env.ec}`);
		const i1 = await interaction.followUp({ embeds: [embed], components: [selectMenuRow] });


		collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			}

			const selected = i.values[0];

			if (i.customId === 'hlpcmd') {
				let akinator = ["`/akinator`",]
				let akinatordata = akinator.join(", ");

				let chatbot = ["`/chatbot set`", "`/chatbot delete`"]
				let chatbotdata = chatbot.join(", ");

				let covid = ["`/covid all`"]
				let coviddata = covid.join(", ");

				let fun = ["`/catsay`", "`/dice`", "`/fliptext`", "`/gif`",  "`/howgay`", "`/hug`", "`/kill`", "`/meme`", "`/nitro`"]
				let fundata = fun.join(", ");

				let games = ["`/8ball`", "`/2048`", "`/flood`", "`/hangman`", "`/matchpairs`", "`/rockpapersissors`", "`/slots`", "`/snake`", "`/tictactoe`","`/trivia`","`/wouldyourather`" ]
				let gamesdata = games.join(", ");

				let giveaway = ["`/giveaway create`", "`/giveaway delete`", "`/giveaway edit`", "`/giveaway pause`", "`/giveaway resume`"]
				let giveawaydata = giveaway.join(", ");

				let image = ["`/image filter`", "`/image youtube`"]
				let imagedata = image.join(", ");

				let info = ["`/avatar`", "`/botinfo`", "`/help`", "`/invite`", "`/membercount`", "`/ping`", "`/userinfo`"]
				let infodata = info.join(", ");

				let tod = ["`/truth`", "`/dare`", "`/truthordare`"]
				let toddata = tod.join(", ");

				let utility = ["`/fact`", "`/translate`", "`/reminder`"]
				let utilitydata = utility.join(", ");

				let welcome = ["`/welcome guide`", "`/welcome set`", "`/welcome delete`", "`/welcome text edit`", "`/welcome background`", "`/welcome dm user`", "`/welcome dm-user text-edit`"]
				let welcomedata = welcome.join(", ");



				if(selected === `akinator`){
					let akinatorembed = new EmbedBuilder()
						.setTitle(`Akinator Commands Of ${client.user.username}`)
						.setDescription(`${akinatordata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [akinatorembed]})
				}

				if(selected === `chatbot`){
					let chatbotembed = new EmbedBuilder()
						.setTitle(`Chatbot Commands Of ${client.user.username}`)
						.setDescription(`${chatbotdata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [chatbotembed]})
				}

				if(selected === `covid`){
					let funembed = new EmbedBuilder()
						.setTitle(`Covid Commands Of ${client.user.username}`)
						.setDescription(`${coviddata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [funembed]})
				}

				if(selected === `fun`){
					let funembed = new EmbedBuilder()
						.setTitle(`Fun Commands Of ${client.user.username}`)
						.setDescription(`${fundata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [funembed]})
				}

				if(selected === `games`){
					let gamesembed = new EmbedBuilder()
						.setTitle(`Game Commands Of ${client.user.username}`)
						.setDescription(`${gamesdata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [gamesembed]})
				}

				if(selected === `giveaway`){
					let imageembed = new EmbedBuilder()
						.setTitle(`Giveaway Commands Of ${client.user.username}`)
						.setDescription(`${giveawaydata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}

				if(selected === `image`){
					let imageembed = new EmbedBuilder()
						.setTitle(`Image Commands Of ${client.user.username}`)
						.setDescription(`${imagedata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}

				if(selected === `info`){
					let infoembed = new EmbedBuilder()
						.setTitle(`Image Commands Of ${client.user.username}`)
						.setDescription(`${infodata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [infoembed]})
				}

				if(selected === `tod`){
					let todembed = new EmbedBuilder()
						.setTitle(`Truth Or Dare Commands Of ${client.user.username}`)
						.setDescription(`${toddata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [todembed]})
				}

				if(selected === `utility`){
					let utilityembed = new EmbedBuilder()
						.setTitle(`Utility Commands Of ${client.user.username}`)
						.setDescription(`${utilitydata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [utilityembed]})
				}

				if(selected === `welcome`){
					let welcomeembed = new EmbedBuilder()
						.setTitle(`Welcome Commands Of ${client.user.username}`)
						.setDescription(`${welcomedata}`)
						.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`, 
							iconURL: process.env.iconurl
						})
  						.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [welcomeembed]})
				}
			}
	   	})

	   collector.on('end', async (_, reason) => {
    		if (reason === 'idle') {
            	return await interaction.editReply({ components: [disabled] });
        	}
      	})
	}
};