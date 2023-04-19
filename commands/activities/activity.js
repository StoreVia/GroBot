const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder  } = require('discord.js');
const titlecase = require(`titlecase`);

module.exports = class Activity extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('activity')
				.setDescription('Use Disocrd Activities.')
                .addStringOption(option =>
                    option.setName(`name`)
                        .setRequired(true)
                        .setDescription(`Select The Activity You Want To Launch.`)
                        .addChoices(
                            { name: 'Youtube', value: 'youtube' },
                            { name: 'Letter League(nitro)', value: 'lettertile' },
                            { name: 'Putt Party(nitro)', value: 'puttparty' },
                            { name: 'Poker Night(nitro)', value: 'poker' },
                            { name: 'Sketch Heads(nitro)', value: 'sketchheads' },
                            { name: 'Chess(nitro)', value: 'chess' },
                            { name: 'SpellCast(nitro)', value: 'spellcast' },
                            { name: 'Checkers(nitro)', value: 'checkers' },
                        )),
			usage: 'activity',
			category: 'activity',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Manage Guild'],
		});
	}
	async run(client, interaction) {

        const activity = interaction.options.getString("name");
        let channel = interaction.member.voice.channel;

        if(!channel){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: `> Please Make Sure You Are In A Voice Channel.`})
        } else
        if(channel) {
            await interaction.deferReply();
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, `${activity}`).then(async invite => {
                const embed = new EmbedBuilder()
                    .setTitle(`${titlecase(activity)}`)
                    .setDescription(`[Click Here To Launch ${titlecase(activity)} --- ${interaction.member.voice.channel.name}](${invite.code})\n\n > This Feature Is Not Avilable In Mobile.`)
                    .setColor(`${process.env.ec}`)
                    .setFooter({
                        text: `${client.user.username} - ${process.env.year} ©`, 
                        iconURL: process.env.iconurl
                    });
                interaction.followUp({embeds: [embed]})
            });
        }
	}
};