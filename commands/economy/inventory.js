const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Formatters, User } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const db = require("quick.db");

module.exports = class Userinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('inventory')
				.setDescription(`Get Someone's/your's Inventory Item List.`)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Inventory.`)
                        .setRequired(false)),
			usage: 'inventory',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const user = interaction.options.getUser('user') || interaction.user;

    let steel = db.fetch(`steel_${user.id}`)
    if (steel === null) steel = 0;

    let silver = db.fetch(`silver_${user.id}`)
    if (silver === null) silver = 0;

    let gold = db.fetch(`gold_${user.id}`)
    if (gold === null) gold = 0;

    let diamond = db.fetch(`diamond_${user.id}`)
    if (diamond === null) diamond = 0;

    let platinum = db.fetch(`platinum_${user.id}`)
    if (platinum === null) platinum = 0;

    let moneyEmbed = new EmbedBuilder()
        .setTitle(`Inventory Of \`${user.username}\``)
        .setColor(`${process.env.ec}`)
        .addFields(
            { name: '**Steel: **', value: `> ${steel}-grams`, inline: true },
			{ name: '**Silver: **', value: `> ${silver}-grams`, inline: true },
			{ name: '**Gold: **', value: `> ${gold}-grams`, inline: true },
			{ name: '**Diamond\'s: **', value: `> ${diamond}\`s`, inline: true },
			{ name: '**Platinum: **', value: `> ${platinum}-grams`, inline: true },
			{ name: '\u200b', value: `\u200b`, inline: true },
        )
        .setFooter({
            text: `${client.user.username} - ${process.env.year} ©`, 
            iconURL: process.env.iconurl
        })
    await interaction.followUp({embeds: [moneyEmbed]})

	}
};