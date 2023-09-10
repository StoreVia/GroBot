const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder } = require('discord.js');
const akinator = require("../../B_Gro_Modules/discord.js-akinator");
const fs = require('fs');
const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem')

module.exports = class Akinator extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('akinator')
				.setDescription('Play Akinator Game.')
                .addStringOption(option => 
                    option.setName(`language`)
                        .setDescription(`In Which Language You Want To Play Akinator`)
                        .setRequired(true)
                .addChoices(
                    { name: 'English(Recommended)', value: 'en' },
                    { name: 'Afrikaans', value: 'af' },
                    { name: 'Arabic', value: 'ar' },
                    { name: 'Chinese', value: 'cmn' },
                    { name: 'French', value: 'fr' },
                    { name: 'German', value: 'de' },
                    { name: 'Greek', value: 'el' },
                    { name: 'Hindi', value: 'hi' },
                    { name: 'Indonesian', value: 'id' },
                    { name: 'Italian', value: 'it' },
                    { name: 'Japanese', value: 'ja' },
                    { name: 'Korean', value: 'ko' },
                    { name: 'Malayalam', value: 'ml' },
                    { name: 'Marathi', value: 'mr' },
                    { name: 'Nepali', value: 'ne' },
                    { name: 'Portuguese', value: 'pt' },
                    { name: 'Romanian', value: 'ro' },
                    { name: 'Russian', value: 'ru' },
                    { name: 'Serbian', value: 'sr' },
                    { name: 'Tamil', value: 'ta' },
                    { name: 'Telugu', value: 'te' },
                    { name: 'Thai', value: 'th' },
                    { name: 'Turkish', value: 'tr' },
                    { name: 'Ukranian', value: 'uk' },
                    { name: 'Vietnamese', value: 'vi' },
                ))
				.setDMPermission(true),
			usage: 'akinator',
			category: 'akinator',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();
        const language = interaction.options.getString("language");
        let childMode = false;
        let gameType = "character";
        let useButtons = true;

        akinator(interaction, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: process.env.ec
        })
	}
};