const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder } = require('discord.js');
const db = require(`quick.db`);
const Discord = require(`discord.js`);
const version = require(`../../package.json`).version;
const Canvas = require('canvas');
const canv = require('canvas'),
    canvas = canv.createCanvas(1018, 468),
    ctx = canvas.getContext('2d');
const canvacord = require("canvacord");

module.exports = class GuildMemberAdd extends Event {
	constructor(client) {
		super(client, {
			name: 'guildMemberRemove',
			category: 'guild',
		});
	}
	async run(member) {

        const client = this.client;

        let server = db.fetch(`leave_${member.guild.id}`)
        let guildCh = client.channels.cache.get(server)

        if (!server) {
            return;
        }
        if (server) {
            let text = db.fetch(`leavetext_${member.guild.id}`) || "<MemberMention>, Just Left The Server."
            const text1 = text.replace('<MemberMention>', `${member}`)
                .replace('<MemberCount>', `${member.guild.memberCount}`)
                .replace('<UserName>', `${member.user.username}`)
                .replace('<UserId>', `${member.user.id}`)
                .replace('<UserTag>', `${member.user.discriminator}`)
                .replace('<ServerName>', `${member.guild.name}`)
                .replace('<ServerId>', `${member.guild.id}`);

            guildCh.send({ content: `${text1}`})
        }
	}
};