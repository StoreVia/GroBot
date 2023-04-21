const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const db = require(`quick.db`);

module.exports = class Welcome extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('welcome')
				.setDescription('Setup Welcome System.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommandGroup(group =>
                    group.setName(`channel`)
                        .setDescription(`Set Welcome Channel.`)
                        .addSubcommand(subcommand =>
                            subcommand
                                .setName('set')
                                .setDescription('Set Welcome Channel.')
                                .addChannelOption(option =>
                                    option.setName('channel')
                                        .addChannelTypes(ChannelType.GuildText)
                                        .setDescription('Select Channel')
                                        .setRequired(true)))
                        .addSubcommand(subcommand =>
                            subcommand
                                .setName('delete')
                                .setDescription('Delete Welcome Channel.')
                                .addChannelOption(option =>
                                    option.setName('deletechannel')
                                        .addChannelTypes(ChannelType.GuildText)
                                        .setDescription('Select Channel')
                                        .setRequired(true))))
                .addSubcommand(subcommand => 
                    subcommand
                        .setName(`background`)
                        .setDescription(`Set Photo Background When A User Join's Server.`)
                        .addStringOption(option =>
                            option.setName('url')
                                .setDescription(`Enter Background Url For Welcome Message.`)
                                .setRequired(true)))
                .addSubcommandGroup(group =>
                    group.setName(`text`)
                        .setDescription(`Customize Texts.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`edit`)
                                .setDescription(`Edit Welcome Message When A User Join's Server.`))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`color`)
                                    .setDescription(`Edit Text Color In Welcome Image.`)))
                .addSubcommandGroup(group =>
                    group.setName(`dm`)
                        .setDescription(`Dm's User When Joined Server.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`user`)
                                .setDescription(`Dm's User When Joined Server.`)
                                .addStringOption(option =>
                                    option.setName(`set`)
                                        .setDescription(`Dm's User When Joined Server Settings.`)
                                        .setRequired(true)
                                        .addChoices(
                                            { name: 'On', value: 'on'},
                                            { name: 'Off', value: 'off'}
                                        ))))
                .addSubcommandGroup(group =>
                    group.setName(`dm-user`)
                        .setDescription(`Edit User's Dm Welcome Message When That User Join's Server.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`text-edit`)
                                .setDescription(`Edit User's Dm Welcome Message When That User Join's Server.`)))
                .addSubcommand(subcommand => 
                    subcommand.setName(`guide`)
                        .setDescription(`Get Guidence About Setting Welcome System.`))
                .addSubcommand(subcommand => 
                    subcommand.setName(`template`)
                            .setDescription(`Choose Welcome Image Template.`)),
			usage: 'welcome',
			category: 'welcome',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
            await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if (subcommand === 'set') {

            const channel = interaction.options.getChannel('channel');
            const channelcheck = db.fetch(`welcome_${interaction.guild.id}`, channel.id)
            if(!channelcheck){

                /////////////////////////////////////

                const welcomenew = new ModalBuilder()
                    .setCustomId('myModalWelcomeNew')
                    .setTitle('Welcome System Configuration.');
                const welcomenew1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Join Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const welcome0 = new ActionRowBuilder().addComponents(welcomenew1);
                welcomenew.addComponents(welcome0);

                /////////////////////////////////////

                db.set(`welcome_${interaction.guild.id}`, channel.id);
                await interaction.showModal(welcomenew);

            }
            if(channelcheck){

                /////////////////////////////////////

                const welcomeold = new ModalBuilder()
                    .setCustomId('myModalWelcomeOld')
                    .setTitle('Welcome System Configuration.');
                const welcomeold1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Join Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const welcomeold0 = new ActionRowBuilder().addComponents(welcomeold1);
                welcomeold.addComponents(welcomeold0);
            
                /////////////////////////////////////

			    db.set(`welcome_${interaction.guild.id}`, channel.id);
                await interaction.showModal(welcomeold);

            }
        }
        
        

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if (subcommand === 'delete') {
            const channel = interaction.options.getChannel('deletechannel');
            const checkchannel = db.fetch(`welcome_${interaction.guild.id}`, channel.id);
            if(checkchannel){
                db.delete(`welcome_${interaction.guild.id}`, channel.id);
                await interaction.reply({ content: `> Welcome Message System Was Now Disabled In ${channel}`, ephemeral: true})
            }
            if(!checkchannel){
                await interaction.reply({ content: `> ${channel} Was Not Bounded To Welcome System.`, ephemeral: true})
            }
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if (subcommand === 'background') {
            const background = interaction.options.getString('url');
            const backgoundcheck = db.fetch(`welcomebg_${interaction.guild.id}`)
            if(!backgoundcheck){
                db.set(`welcomebg_${interaction.guild.id}`, background);
                await interaction.reply({ content: `> Done✅. Welcome Background Was Now Set.`, ephemeral: true})
            }
            if(backgoundcheck){
                db.set(`welcomebg_${interaction.guild.id}`, background);
                await interaction.reply({ content: `> Done✅. Welcome Background Was Now Updated.`, ephemeral: true})
            }
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "guide"){

            const embed = new EmbedBuilder()
                .setTitle(`GroBot Welcome System Guide `)
                .setDescription(`> **Note: **Use \`:emoji_name:\` To Use Emoji In Welcome Message,Use \`<a:emoji_name:emoji_id>\` To Use Emoji Gif In Welcome Message & This Message Also Inlcudes For Dm Messages.`)
                .setImage(`https://i.imgur.com/YvxM0bc.png`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`,
                    iconURL: process.env.iconurl
                })
            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ embeds: [embed] })
            
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if(subcommand === "edit"){

            /////////////////////////////////////

            const welcometextedit = new ModalBuilder()
			    .setCustomId('myModalWelcomeTextEdit')
			    .setTitle('Welcome System Configuration.');
		    const welcometextedit1 = new TextInputBuilder()
			    .setCustomId('text1')
			    .setLabel("Send's This Text When Some One Join Server.")
			    .setStyle(TextInputStyle.Paragraph);
		    const welcometextedit0 = new ActionRowBuilder().addComponents(welcometextedit1);
		    welcometextedit.addComponents(welcometextedit0);

            /////////////////////////////////////

            await interaction.showModal(welcometextedit);

        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if(subcommand === "user"){
            const set = interaction.options.getString("set");
            const userdmoncheck = db.fetch(`welcomedm_${interaction.guild.id}`, "on")
            const userdmoffcheck = db.fetch(`welcomedm_${interaction.guild.id}`, "off")
            if(set === "on"){
                if(userdmoncheck){
                    await interaction.reply({ content: `> Dm-User Was Already Enabled. If You Want To Edit Welcome Dm Message Use \`/welcome dm-user text-edit\` Command.`, ephemeral: true})
                }
                if(!userdmoncheck){

                    /////////////////////////////////////

                    const welcomedmusernew = new ModalBuilder()
                        .setCustomId('myModalDmUserNew')
                        .setTitle('Welcome System Configuration.');
                    const welcomedmusernew1 = new TextInputBuilder()
                        .setCustomId('text2')
                        .setLabel("Send's This DmText When Some One Join Server.")
                        .setStyle(TextInputStyle.Paragraph);
                    const welcomedmusernew0 = new ActionRowBuilder().addComponents(welcomedmusernew1);
                    welcomedmusernew.addComponents(welcomedmusernew0);

                    /////////////////////////////////////

                    db.set(`welcomedm_${interaction.guild.id}`, "on")
                    await interaction.showModal(welcomedmusernew)
                }
            }
            if(set === "off"){
                if(userdmoffcheck){
                    db.delete(`welcomedm_${interaction.guild.id}`, "off")
                    await interaction.reply({ content: `> Done✅. Dm-User Was Disabled Now.`, ephemeral: true})
                }
                if(!userdmoffcheck){
                    await interaction.reply({ content: `> Dm-User Was Already Disabled.`, ephemeral: true})
                }
            }
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if(subcommand === "text-edit"){

            /////////////////////////////////////

            const welcomedmuserold = new ModalBuilder()
			    .setCustomId('myModalDmUserTextEdit')
			    .setTitle('Welcome System Configuration.');
		    const welcomedmuserold1 = new TextInputBuilder()
			    .setCustomId('text3')
			    .setLabel("Send's This DmText When Some One Join Server.")
			    .setStyle(TextInputStyle.Paragraph);
		    const welcomedmuserold0 = new ActionRowBuilder().addComponents(welcomedmuserold1);
		    welcomedmuserold.addComponents(welcomedmuserold0);

            /////////////////////////////////////

            await interaction.showModal(welcomedmuserold);
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if(subcommand === "color"){

            /////////////////////////////////////

            const selectMenuRow = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setPlaceholder('Select An Option')
                        .setCustomId('colors')
                        .setDisabled(false)
                        .setMaxValues(1)
                        .setOptions([
                            {
                                label: 'Black',
                                value: '000000',
                                emoji: '⬛',
                            },
                            {
                                label: 'White',
                                value: 'FFFFFF',
                                emoji: '⬜',
                            },
                            {
                                label: 'Orange',
                                value: 'FFA500',
                                emoji: '🟧',
                            },
                            {
                                label: 'Blue',
                                value: '87CEEB',
                                emoji: '🟦',
                            },
                            {
                                label: 'Red',
                                value: 'FF0000',
                                emoji: '🟥',
                            },
                            {
                                label: 'Brown',
                                value: '964B00',
                                emoji: '🟫',
                            },
                            {
                                label: 'Purple',
                                value: 'A020F0',
                                emoji: '🟪',
                            },
                            {
                                label: 'Green',
                                value: '00FF00',
                                emoji: '🟩',
                            },
                            {
                                label: 'Yellow',
                                value: 'FFFF00',
                                emoji: '🟨',
                            },
                        ]   
                    ),
                );

            const disabled = new ActionRowBuilder()
			    .addComponents(
				    new StringSelectMenuBuilder()
					    .setPlaceholder('Select An Option')
					    .setCustomId('colors1')
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


            const embed = new EmbedBuilder()
                .setTitle(`Select The Color`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                })
                .setDescription(`Select One Of The Option Below.\n\n> Note :- **Selecting Color Changes Text Color In Welcome Image.**`)

            await interaction.reply({ embeds: [embed], components: [selectMenuRow], ephemeral: true })


            const filter = i => i.customId === 'colors';
            const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

            collector.on('collect', async i => {
			    if (i.user.id != interaction.user.id) {
				    await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			    }
			    const selected = i.values[0];

			    if (i.customId === 'colors') {
                    if(selected === "000000"){
				        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Black.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
                    }

                    if(selected === "FFFFFF"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To White.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "FFA500"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Orange.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "87CEEB"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Blue.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "FF0000"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Red.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
                    }

                    if(selected === "964B00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Brown.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "A020F0"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Purple.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "00FF00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Green.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }

                    if(selected === "FFFF00"){
                        const embed = new EmbedBuilder()
                            .setTitle(`Done`)
                            .setColor(`${process.env.ec}`)
                            .setDescription(`Done✅. Your Welcome Text Color Was Now Set To Yellow.`)
                            .setFooter({
                                text: `${client.user.username} - ${process.env.year} ©`, 
                                iconURL: process.env.iconurl
                            })
                        i.update({ embeds: [embed] })
                        db.set(`welcometextcolor_${interaction.guild.id}`, selected)
			        }
                }
	        })

	        collector.on('end', async (_, reason) => {
                if (reason === 'idle') {
                    await interaction.editReply({ components: [disabled] });
                }
            });
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if(subcommand === "template"){

            const buttonRow = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
					    .setEmoji(`1️⃣`)
					    .setCustomId('one')
					    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setEmoji(`2️⃣`)
					    .setCustomId('two')
					    .setStyle(ButtonStyle.Secondary),
                )

            const disabled = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
					    .setLabel(`grobot`)
					    .setCustomId('grobot')
					    .setStyle(ButtonStyle.Secondary),
                )

            const embed = new EmbedBuilder()
                .setTitle(`Welcome Templates`)
                .setDescription(`Choose One Of The Option Below.`)
                .setColor(`${process.env.ec}`)
                .setImage(`https://media.discordapp.net/attachments/1097119486986960968/1097191953361285201/Discord_Templates.png`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                })

            await interaction.deferReply({ ephemeral: true })
            await interaction.followUp({ embeds: [embed], components: [buttonRow], ephemeral: true })

            const filter = i => i.customId;
            const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });

            collector.on('collect', async i => {
			    if (i.user.id != interaction.user.id) {
				    await i.update({ content: "This Interaction Doesn't Belongs To You." });
			    }
                if(i.customId === "one"){
                    await db.set(`welcometemplate_${interaction.guild.id}`, "one")
                    await i.update({ content: "Done✅. Template 1 Has Been Choosen.", embeds: [], components: [] });
                }
                if(i.customId === "two"){
                    await db.set(`welcometemplate_${interaction.guild.id}`, "two")
                    await i.update({ content: "Done✅. Template 2 Has Been Choosen.", embeds: [], components: [] });
                }
            })

            collector.on('end', async (_, reason) => {
                if (reason === 'idle') {
                    await interaction.editReply({ components: [] });
                }
            });
        }    
	}
};