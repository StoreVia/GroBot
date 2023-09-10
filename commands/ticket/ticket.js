const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ButtonStyle, ButtonBuilder, PermissionFlagsBits, ActionRowBuilder, ChannelType } = require('discord.js');
const db = require(`quick.db`);

module.exports = class Ticker extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ticket')
				.setDescription('Setup Ticket System.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand(subcommand =>
                    subcommand.setName('setup')
                        .setDescription(`Setup Ticket System.`)
                        .addChannelOption(option =>
                            option.setName(`channel`)
                                .setRequired(true)
                                .setDescription(`Select Channel That You Want To Send Ticket Panel.`)
                                .addChannelTypes(ChannelType.GuildText))
                        .addChannelOption(option =>
                            option.setName(`category`)
                                .addChannelTypes(ChannelType.GuildCategory)
                                .setRequired(true)
                                .setDescription(`Select Category For Tickets Creation.`))
                        .addChannelOption(option =>
                            option.setName(`ticket_logs`)
                                .setRequired(true)
                                .setDescription(`Setup Ticket Logs Channel.`)
                                .addChannelTypes(ChannelType.GuildText))
                        .addRoleOption(option =>
                            option.setName(`support_role`)
                                .setDescription(`Select Role Those Who Responds To Tickets.`)
                                .setRequired(true)))
                .addSubcommandGroup(group =>
                    group.setName(`send`)
                        .setDescription(`Send/Activate Ticket Panel.`)
                        .addSubcommand(subcommand => 
                            subcommand.setName(`panel`)
                                .setDescription(`Send/Activate Ticket Panel.`)))
                .addSubcommandGroup(group =>
                    group.setName(`edit`)
                        .setDescription(`Edit Ticket Configurations.`)
                        .addSubcommand(subcommand =>
                            subcommand.setName(`role`)
                                .setDescription(`Edit Ticket Support Role.`)
                                .addRoleOption(option =>
                                    option.setName(`support_role`)
                                        .setDescription(`Select Role Those Who Responds To Tickets.`)
                                        .setRequired(true)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`channel`)
                                .setDescription(`Select Channel That You Want To Send Ticket Panel.`)
                                .addChannelOption(option =>
                                    option.setName(`select_channel`)
                                        .setDescription(`Select Channel That You Want To Send Ticket Panel`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildText)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`category`)
                                .setDescription(`Select Category For Tickets Creation.`)
                                .addChannelOption(option =>
                                    option.setName(`select_category`)
                                        .setDescription(`Select Category For Tickets Creation.`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildCategory)))
                        .addSubcommand(subcommand =>
                            subcommand.setName(`logs`)
                                .setDescription(`Setup Ticket Logs Channel.`)
                                .addChannelOption(option =>
                                    option.setName(`select_logs_channel`)
                                        .setDescription(`Setup Ticket Logs Channel.`)
                                        .setRequired(true)
                                        .addChannelTypes(ChannelType.GuildText)))),
			usage: 'ticket',
			category: 'ticket',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        let subcommand = interaction.options.getSubcommand();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "setup"){
            const channel =  interaction.options.getChannel(`channel`);
            const category = interaction.options.getChannel(`category`);
            const ticketlogs = interaction.options.getChannel(`ticket_logs`);
            const supportrole = interaction.options.getRole(`support_role`);

            db.set(`ticketchannel_${interaction.guild.id}`, channel.id)
            db.set(`ticketcategory_${interaction.guild.id}`, category.id)
            db.set(`ticketlogs_${interaction.guild.id}`, ticketlogs.id)
            db.set(`ticketrole_${interaction.guild.id}`, supportrole.id)

            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `Done✅. Use "/ticket send pannel" Command To Activate/Send Ticket.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        if(subcommand === "panel"){
            let check = db.fetch(`ticketchannel_${interaction.guild.id}`)
            if(!check){
                await interaction.deferReply({ ephemeral: true });
                return await interaction.followUp({ content: `> You Have Not Setup Ticket System Yet. Use "/ticket setup" Command To Setup Ticket System.` })
            }
            if(check){
                let channel = client.channels.cache.get(check)
                const buttonRow = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
				        .setLabel('Open')
                        .setEmoji(`📩`)
				        .setCustomId('ticketopen')
				        .setStyle(ButtonStyle.Success),
                )
                const embed = new EmbedBuilder()
                .setTitle(`Ticket`)
                .setDescription(`> Open Ticket By Clicking Below Button.`)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`,
                    iconURL: process.env.iconurl
                  });
                channel.send({ embeds: [embed], components: [buttonRow] })
                await interaction.deferReply({ ephemeral: true })
                return await interaction.followUp({ content: `Done✅. Activated/Sent Ticket Panel In <#${check}>.` })
            }
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "role"){
            const role = interaction.options.getRole(`support_role`);
            db.set(`ticketrole_${interaction.guild.id}`, role.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `Done✅. Support Role Has Been Edited.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "channel"){
            const channel = interaction.options.getChannel(`select_channel`);
            db.set(`ticketchannel_${interaction.guild.id}`, channel.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `Done✅. Ticket Channel Has Been Updated.\n> **Delete Panel Message In Old Channel.**\n> **Use "/ticket send panel" Command To Send Panel To Updated Channel.**"` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "category"){
            const category = interaction.options.getChannel(`select_category`);
            db.set(`ticketcategory_${interaction.guild.id}`, category.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `Done✅. Ticket Category Has Been Updated.` })
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(subcommand === "logs"){
            const logs = interaction.options.getChannel(`select_logs_channel`);
            db.set(`ticketlogs_${interaction.guild.id}`, logs.id)
            await interaction.deferReply({ ephemeral: true })
            return await interaction.followUp({ content: `Done✅. Ticket Logs Has Been Updated.` })
        }
	}
};