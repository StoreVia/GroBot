const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Formatters } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const db = require("quick.db");

module.exports = class Userinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('balance')
				.setDescription(`Get Someone's/your's Balance.`)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Balance.`)
                        .setRequired(false)),
			usage: 'balance',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const UserOption = interaction.options.getUser('user') || interaction.user;
    let bal = db.fetch(`money_${UserOption.id}`);
    let bank = db.fetch(`bank_${UserOption.id}`);
    if (bal === null) bal = 0;
    if (bank === null) bank = 0;
    let Total = bal + bank;

    let moneyEmbed = new EmbedBuilder()
        .setColor(`${process.env.ec}`)
        .setTitle(`Balance Of \`${UserOption.username}\``)
        .setThumbnail(`https://i.imgur.com/dhrAdNy.png`)
        .addFields(
            { name: `**Wallet: **`, value: `${bal}$`, inline: true},
            { name: `**Bank: **`, value: `${bank}$`, inline: true},
            { name: `**Total: **`, value: `${Total}$`, inline: true},
          )
          .setFooter({
      text: `${client.user.username} - ${process.env.year} ©`, 
      iconURL: process.env.iconurl
    })
    return await interaction.followUp({ embeds: [moneyEmbed] })

	}
};