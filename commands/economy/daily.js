const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Formatters } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const ms = require("parse-ms-2");
const db = require("quick.db");

module.exports = class Userinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('daily')
				.setDescription(`Collect Your Daily Reward.`),
			usage: 'daily',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    let user = interaction.user;
    let daily = await db.fetch(`daily_${user.id}`);
    let timeout = 86400000;
    let amount = 5000;

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
        let timeEmbed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`**You Have Already Collected Your Daily Reward**.\n\n**You Can Collect Again In: **\n\`\`\`> ${time.hours}h ${time.minutes}m ${time.seconds}s\`\`\``);
        await interaction.followUp({embeds: [timeEmbed]})
    } else {
        let moneyEmbed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`Recieved✅. You Have Collected Your Daily Reward Of ${amount}$ In Your Wallet.`)
        await interaction.followUp({embeds: [moneyEmbed]})
        db.add(`money_${user.id}`, amount)
        db.set(`daily_${user.id}`, Date.now())
    }

	}
};