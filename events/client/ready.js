const Event = require('../../structures/EventClass');
const colors = require(`colors`)
const { ActivityType } = require('discord.js');
const db = require(`quick.db`)

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		
		const client = this.client;

		setInterval(()=>{
			let status = [
				"/help | grobot.store",
			]
			client.user.setPresence({
				activities: [{ name: `${status[Math.floor(Math.random() * status.length)]}`, type: ActivityType.Playing }]
			});
		}, 15000);
		
		  

		console.log(colors.red(`Discord Bot Is Now Online With ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Users And ${client.guilds.cache.size} Servers`));
	}
};