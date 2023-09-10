const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

module.exports = class Gif extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('gif')
				.setDescription('Search For Gif.')
				.setDMPermission(true)
                .addStringOption(option =>
                    option.setName('string')
                        .setDescription(`Enter Text.`)
                        .setRequired(true)),
			usage: 'gif',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const string = interaction.options.getString(`string`);
       
    giphy.search(string).then(function (res) {
      let id = res.data[0].id;
      let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      const embed = new EmbedBuilder()
        .setTitle(`${string}`)
        .setImage(msgurl)
        .setColor(`${process.env.ec}`)
        .setFooter({
          text: `${client.user.username} - ${process.env.year} ©`, 
          iconURL: process.env.iconurl
        });
      return interaction.followUp({ embeds: [embed] });
    });
	}
};