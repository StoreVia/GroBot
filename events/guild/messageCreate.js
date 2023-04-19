const Event = require('../../structures/EventClass');
const { InteractionType, EmbedBuilder } = require('discord.js');
const db = require(`quick.db`)
const Discord = require(`discord.js`)
const titlecase = require(`titlecase`)

module.exports = class MessageCreate extends Event {
	constructor(client) {
		super(client, {
			name: 'messageCreate',
			category: 'guild',
		});
	}
	async run(message) {

		const client = this.client;

//clientmentionstart
        if(message.content.includes(`<@${client.user.id}>`)){
            let embed = new Discord.EmbedBuilder()
                .setDescription(`To Get All Commands Please Type "/help".`)
                .setColor(`${process.env.ec}`);
            message.reply({ embeds: [embed] })
        }
//clientmentionend

//chatbotstart  
        if (message.author.bot){
            return;
        } 
        message.content = message.content
            .replace(/@(everyone)/gi, "everyone")
            .replace(/@(here)/gi, "here")
            .replace('<tips>', '**');
        let cb = `${message.channel.id}`;
        let chatbot1 = db.fetch(`chatbot_${message.guild.id}`, cb);
        if (!chatbot1) {
            return;
        }
        if (chatbot1) {
            if (message.channel.id == `${chatbot1}`){
                let text = message.content;
                fetch(`http://api.brainshop.ai/get?bid=154409&key=iaRW35CrLdHBpOBW&uid=${message.author.id}&msg=${encodeURIComponent(text)}`)
                .then(response => response.json())
                .then(data => {
                    const text = data.cnt.toLowerCase()
                        .replace('<tips>', '**')
                        .replace('my dear great botmaster, acobot team.', 'Professor#0195')
                        .replace('i was created by acobot team.', 'Professor#0195')
                        .replace(`creeper chat bot`, `${client.user.username}`)
                        .replace('</tips>', '**');
                    message.reply({content: `${titlecase(text)}`})
                    message.channel.sendTyping();
                })
            };
        }
	}
};