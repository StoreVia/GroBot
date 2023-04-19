const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder } = require('discord.js');
const db = require(`quick.db`)
const Discord = require(`discord.js`)
const discordTranscripts = require('discord-html-transcripts');
const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');

module.exports = class InteractionCreate extends Event {
	constructor(client) {
		super(client, {
			name: 'interactionCreate',
			category: 'guild',
		});
	}
	async run(interaction) {

		const client = this.client;
		
//commandruneventstart
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);
			if(interaction.user.bot) {
				return;
			}
			if(!interaction.inGuild() && interaction.type === InteractionType.ApplicationCommand){
				await interaction.deferReply();
				return await interaction.followUp({ content: '> Slash Commands Can Only Be Used In Server/Guilds.' });
			}
			if(!command){
				await interaction.deferReply();
				return await interaction.followUp({ content: `> This Isn't Avilable For Now.`, ephemeral: true }) && client.commands.delete(interaction.commandName);
			}
			try {
				command.run(client, interaction);
			}
			catch (e) {
				console.log(e);
				await interaction.deferReply();
				return await interaction.followUp({ content: `> An Error Has Been Occured.` });
			}
		}
//commandruneventend

//welcomestart
		if(interaction.customId === 'myModalWelcomeNew') {
    		await interaction.reply({ content: `> Done✅. Welcome Channel Was Now Set.`, ephemeral: true })
    		.then(() => {
      			const text = interaction.fields.getTextInputValue('text');
      			db.set(`welcometext_${interaction.guild.id}`, text)
    		})
  		}
		if(interaction.customId === 'myModalWelcomeOld') {
			await interaction.reply({ content: `> Done✅. Welcome Channel Was Now Updated.`, ephemeral: true })
			.then(() => {
				const text = interaction.fields.getTextInputValue('text');
				db.set(`welcometext_${interaction.guild.id}`, text)
			})
		}
		
		if(interaction.customId === 'myModalWelcomeTextEdit') {
			await interaction.reply({ content: `> Done✅. Welcome Channel Text Now Updated.`, ephemeral: true })
			.then(() => {
				const text1 = interaction.fields.getTextInputValue('text1');
				db.set(`welcometext_${interaction.guild.id}`, text1)
			})
		}
		if(interaction.customId === 'myModalDmUserNew') {
			await interaction.reply({ content: `> Done✅. Welcome User Dm Was Now Set.`, ephemeral: true })
			.then(() => {
				const text2 = interaction.fields.getTextInputValue('text2');
				db.set(`welcomedmtext_${interaction.guild.id}`, text2)
			})
		}
		if(interaction.customId === 'myModalDmUserOld') {
			await interaction.reply({ content: `> Done✅. User Dm Text Message Was Now Updated.`, ephemeral: true })
			.then(() => {
				const text3 = interaction.fields.getTextInputValue('text3');
				db.set(`welcomedmtext_${interaction.guild.id}`, text3)
			})
		}
//welcomeend

//ticketstart
		if(interaction.customId === 'ticketopen') {
			const role = db.fetch(`ticketrole_${interaction.guild.id}`)
			const category1 = db.fetch(`ticketcategory_${interaction.guild.id}`)
			const category = client.channels.cache.get(category1)
			const channelcheck = interaction.member.guild.channels.cache.find(channel => channel.name === `${interaction.user.username.toLowerCase()}_${interaction.user.id}`);
  
			if(channelcheck){
				await interaction.deferReply({ ephemeral: true })
				await interaction.followUp({ content: `> You Have Already An Open Ticket.` })
			} else 
			if(!channelcheck) {
				const channel1 = await interaction.guild.channels.create({
					name: `${interaction.user.username}_${interaction.user.id}`,
					type: Discord.ChannelType.GuildText,
					parent: category,
					topic: `${interaction.user.id}`,
					permissionOverwrites: [
						{
							id: interaction.guild.roles.everyone.id,
							deny: [Discord.PermissionsBitField.Flags.ViewChannel]
						},
						{
							id: interaction.user.id,
							allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
						},
						{
			  				id: role,
			  				allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
						}
					]
	    		}).then( async (channel) => {
					await interaction.deferReply({ ephemeral: true })
					await interaction.followUp({ content: `Done✅. Check Out ${channel}.` })
  
					const buttonRow = new Discord.ActionRowBuilder()
						.addComponents(
		  					new Discord.ButtonBuilder()
								.setLabel('Close')
								.setEmoji(`❌`)
								.setCustomId('closeticket')
								.setStyle(Discord.ButtonStyle.Danger),
						)
					const embed = new Discord.EmbedBuilder()
		  				.setAuthor({
							name: `${interaction.user.tag}`,
							iconURL: `${interaction.user.displayAvatarURL({ extension: "png"})}`
		  				})
		  				.setTitle(`Ticket Opened`)
		  				.setDescription(`Please Wait Our Staff Will Arrive Soon To Help You.`)
		  				.setColor(`${process.env.ec}`)
		  				.setFooter({
							text: `${client.user.username} - ${process.env.year} ©`,
							iconURL: process.env.iconurl
		  				})
					channel.send({ content: `<@&${role}>, ${interaction.user} Created Ticket!`, embeds: [embed], components: [buttonRow] })
	  			})
			}
		}
  
		if(interaction.customId === "closeticket"){
			const role = db.fetch(`ticketrole_${interaction.guild.id}`)
			const row = new Discord.ActionRowBuilder()
				.addComponents(
		 			new Discord.ButtonBuilder()
						.setLabel('Yes')
						.setEmoji(`✅`)
						.setCustomId('yes')
						.setStyle(Discord.ButtonStyle.Success),
		  			new Discord.ButtonBuilder()
						.setLabel('No')
						.setEmoji(`❌`)
						.setCustomId('cancel')
						.setStyle(Discord.ButtonStyle.Danger),
				)
   			let msg = await interaction.reply({ content: `<@&${role}>, ${interaction.user} Has Requested For Closing Ticket Please Confirm Before Deleting.`, components: [row]})
  
   			const filter = i => i.customId;
   			const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });
  
   			collector.on('collect', async (i) => {
				const role = db.fetch(`ticketrole_${interaction.guild.id}`)
	  			if (i.customId === 'yes') {
					if(!interaction.member.roles.cache.has(`${role}`)){
		  				await i.deferReply({ ephemeral: true })
		  				await i.followUp({ content: "> You Dont Have Permissions." })
					}
					if(interaction.member.roles.cache.has(`${role}`)){
						const logs = db.fetch(`ticketlogs_${interaction.guild.id}`)
						const guild = client.guilds.cache.get(interaction.guild.id);
     	 				const chan = guild.channels.cache.get(logs);

      					interaction.followUp({ content: 'Saving Messages Please Wait...' });

      					interaction.channel.messages.fetch().then(async (messages) => {
                    		let a = messages.filter(m => m.author.bot !== true).map(m =>
          						`\n ${new Date(m.createdTimestamp).toLocaleString('en-EN')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        					).reverse().join('\n');
		                	if (a.length < 1) a = "Nothing"
		        			var paste = new PrivateBinClient("https://privatebin.net/");
        					var result = await paste.uploadContent(a, {uploadFormat: 'markdown'})

            				const embed = new EmbedBuilder()
								.setTitle('Ticket Logs')
								.setDescription(`To See Logs Of The Ticket Created By <@!${interaction.channel.topic}> [ClickHere](${getPasteUrl(result)})`)
								.addFields(
									{ name: `**CreatedBy: **`, value: `<@!${interaction.channel.topic}>`, inline: true },
									{ name: `**ClosedBy: **`, value: `<@!${interaction.user.id}>`, inline: true }
								)
								.setColor(`${process.env.ec}`)
								.setFooter({
									text: `Link Expires In 6 Days From Now.`,
									iconURL: process.env.iconurl
								})
								.setTimestamp()

							await i.deferUpdate()
							const logs = db.fetch(`ticketlogs_${interaction.guild.id}`)
							client.channels.cache.get(logs).send({ embeds: [embed] }).then(() => {
								interaction.channel.delete()
							})
						})
					}
	  			}
	  			if (i.customId === 'cancel') {
					interaction.deleteReply();
	  			}
   			})
   			collector.on('end', async (_, reason) => {
				if (reason === 'idle' || reason === 'user') {
	  				return await interaction.deleteReply();
				}
			});
  		}
//ticketend
	}
};