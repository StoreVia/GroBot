const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Formatters } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const ms = require("parse-ms-2");
const statuses = {
    "online" : "🟢",
    "idle" : "🟠",
    "dnd" : "🔴",
    "offline" : "⚫️",
  }
const db = require("quick.db");

module.exports = class Userinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('beg')
				.setDescription(`Beg And Get Money For Every One Minute.`),
			usage: 'beg',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    let user = interaction.user;
    let timeout = 60000;
    let amount = Math.floor(Math.random() * 101);
    let beg = await db.fetch(`beg_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
        let time = ms(timeout - (Date.now() - beg));
        let timeEmbed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`**You Have Begged Recently**.\n\n**You Can Beg Again In: **\n\`\`\`> ${time.seconds}s\`\`\``);
        await interaction.followUp({embeds: [timeEmbed]})
    } else {
        let moneyEmbed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`Recieved✅. You Have Begged And Recieved ${amount}$ In Your Wallet.`)
        await interaction.followUp({embeds: [moneyEmbed]})
        db.add(`money_${user.id}`, amount)
        db.add(`begs_${user.id}`, 1)
        db.set(`beg_${user.id}`, Date.now())
    }

	}
};