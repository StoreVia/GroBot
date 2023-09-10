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
                    		{ name: 'Poker Night', value: 'poker' },
                    		{ name: 'Jamspace', value: 'jamspace' },
							{ name: 'Putt Party', value: 'puttparty' },
                    		{ name: 'Gartic Phone', value: 'garticphone' },
                    		{ name: 'Know What I Meme', value: 'kwim' },
                            { name: 'Chess In The Park', value: 'chess' },
                            { name: 'Bobble Leauge', value: 'bobble' },
                            { name: 'Land-io', value: 'landio' },
                            { name: 'Sketch Heads', value: 'sketchheads' },
                            { name: 'Blazing 8s', value: 'blazing8' },
                            { name: 'SpellCast', value: 'spellcast' },
                            { name: 'Checkers In The Park', value: 'checkers' },
                            { name: 'Letter League', value: 'lettertile' },
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
                let embed = new EmbedBuilder()
                	.setColor(`${process.env.ec}`)
                	.addFields(
                    	{ name: `**RequestedBy: **`, value: `${interaction.user}`, inline: true },
                    	{ name: `\u200b`, value: `\u200b`, inline: true },
                    	{ name: `**VoiceChannel: **`, value: `${interaction.member.voice.channel}`, inline: true }
					)
                interaction.followUp({ embeds: [embed] })
                interaction.channel.send({content: `${invite.code}`})
            });
        }
	}
};