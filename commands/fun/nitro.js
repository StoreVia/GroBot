const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require(`ms`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('nitro')
				.setDescription('Get A Free Nitro.')
				.setDMPermission(true),
			usage: 'nitro',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

		let embed1 = new EmbedBuilder()
      .setDescription(`Discord Nitro Payment Started!`)
      .setColor(`${process.env.ec}`)
    let msg = await interaction.followUp({embeds: [embed1]});

    let time = "3s";
    setTimeout(function () {
      let embed = new EmbedBuilder()
        .setDescription(`Getting Things Ready For Nitro Payment!`)
        .setColor(`${process.env.ec}`)
      msg.edit({content: " ", embeds: [embed]});
    }, ms(time));

    let time14 = "5s";
    setTimeout(function () {
      let embed = new EmbedBuilder()
        .setDescription(`Choosing Discord Nitro Plan!`)
        .setColor(`${process.env.ec}`)
      msg.edit({embeds: [embed]});
    }, ms(time14));

    let time2 = "7s";
    setTimeout(function () {
      let embed = new EmbedBuilder()
        .setDescription(`Choosen 99.99$ Plan!`)
        .setColor(`${process.env.ec}`)
      msg.edit({embeds: [embed]});
    }, ms(time2));

    let time3 = "10s";
    setTimeout(function () {
      let embed = new EmbedBuilder()
        .setImage(`https://cdn.discordapp.com/attachments/1097119486986960968/1097822394351104101/animated-paypal-loading.gif`)
        .setDescription(`Payment Requested In Paypal!`)
        .setColor(`${process.env.ec}`)
      msg.edit({embeds: [embed]});
    }, ms(time3));

    let time5 = "18s";
    setTimeout(function () {
      const embed = new EmbedBuilder()
        .setTitle("Here Is Your Nitro Link!")
        .setDescription(`[Click Here](https://bit.ly/3HydaR9) To Claim Your Nitro`)
        .setImage(`https://i.imgur.com/ZEopR3f.png`)
        .setFooter({
          text: `${client.user.username} - ${process.env.year} ©`, 
          iconURL: process.env.iconurl
        })
        .setColor(`${process.env.ec}`);
      msg.edit({embeds: [embed]});
    }, ms(time5));
	}
};