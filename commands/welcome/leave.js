const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType, StringSelectMenuBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Embed, ButtonStyle, ButtonBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const db = require(`quick.db`)

module.exports = class Leave extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('leave')
				.setDescription('Sends Leave Message When User Left Server.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommandGroup(group =>
                    group.setName(`channel`)
                        .setDescription(`Set Leave Message Channel.`)
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
                                .setDescription('Delete Leave Message Channel.')
                                .addChannelOption(option =>
                                    option.setName('deletechannel')
                                        .addChannelTypes(ChannelType.GuildText)
                                        .setDescription('Select Channel')
                                        .setRequired(true)))),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {


        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



        if (interaction.options.getSubcommand() === 'set') {
            const channel = interaction.options.getChannel('channel');
            const channelcheck = db.fetch(`leave_${interaction.guild.id}`, channel.id)

            if(!channelcheck){

            /////////////////////////////////////

                const leavenew = new ModalBuilder()
                    .setCustomId('myModalLeaveNew')
                    .setTitle('Leaving Message Configuration.');
                const leavenew1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Leave Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const leavenew0 = new ActionRowBuilder().addComponents(leavenew1);
                leavenew.addComponents(leavenew0);

            /////////////////////////////////////

                db.set(`welcome_${interaction.guild.id}`, channel.id);
                await interaction.showModal(leavenew);

            }
            if(channelcheck){

                /////////////////////////////////////

                const leaveold = new ModalBuilder()
                    .setCustomId('myModalLeaveOld')
                    .setTitle('Welcome System Configuration.');
                const leaveold1 = new TextInputBuilder()
                    .setCustomId('text')
                    .setLabel("Send's This Text When Some One Leave Server.")
                    .setStyle(TextInputStyle.Paragraph);
                const leaveold0 = new ActionRowBuilder().addComponents(leaveold1);
                leaveold.addComponents(leaveold0);
    
                /////////////////////////////////////

                db.set(`welcome_${interaction.guild.id}`, channel.id);
                await interaction.showModal(leaveold);

            }
        }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



//code



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



//code



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



//code



///////////////////////////////////////////////////////////////////////////////////////////////////////////////



//code



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
};