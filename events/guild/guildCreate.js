const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder } = require('discord.js');
const db = require(`quick.db`)
const Discord = require(`discord.js`)
const version = require(`../../package.json`).version;

module.exports = class GuildCreate extends Event {
	constructor(client) {
		super(client, {
			name: 'guildCreate',
			category: 'guild',
		});
	}
	async run(guild) {

		const client = this.client;

        let embed = new Discord.EmbedBuilder()
            .setTitle(`${client.user.username}`)
            .setDescription(`Thanks For Choosing ${client.user.username}\n**To Get All Commands Please Type "/help".**`)
            .setColor(`${process.env.ec}`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} © || Version :- ${version}`,
                iconURL: process.env.iconurl
            })
        guild.systemChannel.send({ embeds: [embed] })

	}
};