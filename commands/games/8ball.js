const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class EightBallGame extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('8ball')
				.setDescription('Play 8Ball Game.')
                .addStringOption(option =>
                    option
                        .setName('question')
                        .setDescription('Enter Question.')
                        .setRequired(true)),
			usage: '8ball',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		const array = [
            "Yes",
            "Yes Maybe!",
            "Absolute",
            "Hmmm...",
            "Sussy Baka",
            "Idk",
            "No",
            "Huh!",
            "I Mean... Yes",
            "I Mean No",
            "I Mean So",
            "Small Change",
            "Big chance",
            "Never!",
            "Bruh",
            "Yoo Whatt???",
          ];
    const question = interaction.options.getString('question');
    const answer = array[Math.floor(Math.random() * array.length)];

    
    const embed = new EmbedBuilder()
      .setTitle("8Ball")
      .setColor(`${process.env.ec}`)
      .addFields(
	      { name: '**Your Question: **', value: `\`\`\`${question}\`\`\``,inline: false },
		    { name: '**Answer: **', value: `\`\`\`${answer}\`\`\``, inline: false },
	    )
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`, 
        iconURL: process.env.iconurl
      })
    await interaction.deferReply();
		await interaction.followUp({ embeds: [embed] });
    
	}
};