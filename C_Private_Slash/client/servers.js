const Command = require('../../structures/CommandClass');
const db = require(`quick.db`);
const { EmbedBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Embed } = require('discord.js');

module.exports = class Update extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('servers')
				.setDescription('DEVELOPER ONLY COMMNAD.'),
			usage: 'servers',
			category: 'client',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        await interaction.deferReply()
        let embed = new EmbedBuilder()
            .setDescription(`<t:${parseInt(Date.now() / 1000)}:R>`)
            .setColor(`${process.env.ec}`)
        interaction.user.send({ embeds: [embed] }).then(() => {
            interaction.followUp({ content: `Done✅. Sent Details To Your Dm.` }).then(() => {
                client.guilds.cache.forEach(async(x) => {
                    let embed = new EmbedBuilder()
                        .addFields(
                            { name: `**Name: **`, value: `${x.name}`, inline: true },
                            { name: `\u200b`, value: `\u200b`, inline: true },
                            { name: `**Members: **`, value: `${x.memberCount}`, inline: true },
                        )
                        .setColor(`${process.env.ec}`)
                    interaction.user.send({embeds: [embed]})
                });
            })
        })   
	}
};