const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const figlet = require('figlet');

module.exports = class Ascii extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ascii')
				.setDescription('Convert Normal Text To Ascii Text.')
				.addStringOption(option =>
					option.setName(`text`)
						.setDescription(`Enter Text That You Want To Convert To Ascii Text.`)
						.setRequired(true)),
			usage: 'ascii',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {   
        
        const text = interaction.options.getString(`text`);

        figlet.text(text, async function(err, data){
            if(err){
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: `> Error Occured Please Try Later Or Use "/report" To Report The Bug.` });
            }
            if(data.length > 2000){
                await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: `> Please Decrease The Length Of The Sentence.` });
            }
			if(text.length > 15){
				await interaction.deferReply({ ephemeral: true })
                interaction.followUp({ content: ` \`\`\`${data}\`\`\` ` });
			}
			if(text.length < 15){
                await interaction.deferReply()
                interaction.followUp({ content: ` \`\`\`${data}\`\`\` ` });
			}
        }) 
	}
};