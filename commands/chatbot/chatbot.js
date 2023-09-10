const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits, ChannelType } = require('discord.js');
const db = require(`quick.db`);

module.exports = class ChatBot extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('chatbot')
				.setDescription('Set And Delete Chatbot.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('set')
                        .setDescription('Set Chatbot Channel.')
                        .addChannelOption(option =>
                            option.setName('channel')
                                .setDescription('Select Channel')
                                .addChannelTypes(ChannelType.GuildText)
                                .setRequired(true)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('delete')
                        .setDescription('Delete Chatbot Channel.')
                        .addChannelOption(option =>
                            option.setName('deletechannel')
                                .addChannelTypes(ChannelType.GuildText)
                                .setDescription('Select Channel')
                                .setRequired(true))),
			usage: 'chatbot',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        await interaction.deferReply({ ephemeral: true });

        if(!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageGuild)){
        return await interaction.reply({ content: `> You Need "Manage Guild" Permission To Use This Command`, ephemeral: true})
        }

        if (interaction.options.getSubcommand() === 'set') {
            const channel = interaction.options.getChannel('channel');            
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`, channel.id);
            if(!checkchannel){
                db.set(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chat Bot Was Now Bounded To ${channel}.`})
            }
            if(checkchannel){
                db.set(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chat Bot Was Now Updated To ${channel}.`})
            }   
        }
        if (interaction.options.getSubcommand() === 'delete') {
            const channel = interaction.options.getChannel('deletechannel');
            const checkchannel = db.fetch(`chatbot_${interaction.guild.id}`, channel.id);
            if(!checkchannel){
                return await interaction.followUp({ content: `> Chat Bot Was Not Bounded To ${channel}.`})
            }
            if(checkchannel){
                db.delete(`chatbot_${interaction.guild.id}`, channel.id);
                return await interaction.followUp({ content: `> Chat Bot Was Now Deleted In ${channel}.`})
            }
        }
	}
};