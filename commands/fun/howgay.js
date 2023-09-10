const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = class HowGay extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('howgay')
				.setDescription('Gay Calculator.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Check Any User's Gay Percententage.`)
                        .setRequired(true)),
			usage: 'howgay',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        const user = interaction.options.getUser('user');
        let gaypercentage = Math.floor(Math.random() * 101);

        if(user.id === client.user.id){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: "> I'm Not Going To Tell You That 😉." })
        } else if(user){
            const embed = new EmbedBuilder()
                .setDescription(`${user} Is ${gaypercentage}% Gay`)
                .setColor(`${process.env.ec}`)
            await interaction.deferReply();
            return await interaction.followUp({embeds: [embed]})
        }
	}
};