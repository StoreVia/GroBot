const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const roasts = require(`../../A_Gro_db/roast.json`);
const titlecase = require(`titlecase`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('roast')
				.setDescription('Roast Someone.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`User You Want To Roast.`)
                        .setRequired(true)),
			usage: 'roast',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        let target = interaction.options.getUser(`user`);

        if(target.id === interaction.user.id){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: "> You Can't Roast Your Self." })
        } else if(target.id === client.user.id){
            await interaction.deferReply({ ephemeral: true });
            interaction.followUp({ content: "> Why Are You Guys Trying To Roast Me." })
        } else if(target){
            await interaction.deferReply();
            interaction.followUp({ content: `${target}, ${titlecase(roasts[Math.floor(Math.random() * roasts.length)])}.` })
        }
		
	}
};