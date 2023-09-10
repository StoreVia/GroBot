const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = class Translate extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('translate')
				.setDescription('Translate Some Text From English To Other Language.')
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription(`Text You Want To Translate.`)
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('language')
                        .setDescription('In Which Language You Want To Translate Text.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Afrikaans', value: 'af' },
                            { name: 'Arabic', value: 'ar' },
                            { name: 'Chinese', value: 'cmn' },
                            { name: 'Dutch', value: 'nl' },
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
			usage: 'translate',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();

        const text = interaction.options.getString('text');
        const language = interaction.options.getString("language");

        let name = "NULL";
        if(language === "af") name = "Afrikaans";
        if(language === "ar") name = "Arabic";
        if(language === "cmn") name = "Chinese";
        if(language === "nl") name = "Dutch";
        if(language === "fr") name = "French";
        if(language === "de") name = "German";
        if(language === "el") name = "Greek";
        if(language === "hi") name = "Hindi";
        if(language === "it") name = "Italian";
        if(language === "ja") name = "Japanese";
        if(language === "ko") name = "Korean";
        if(language === "ml") name = "Malayalam";
        if(language === "mr") name = "Marathi";
        if(language === "ne") name = "Nepali";
        if(language === "pt") name = "Portuguese";
        if(language === "ro") name = "Romanian";
        if(language === "ru") name = "Russian";
        if(language === "sr") name = "Serbian";
        if(language === "ta") name = "Tamil";
        if(language === "te") name = "Telugu";
        if(language === "thi") name = "Thai";
        if(language === "tr") name = "Turkish";
        if(language === "uk") name = "Ukranian";
        if(language === "vi") name = "Vietnamese";


        translate(text, { to: language }).then(res => {
            const embed = new EmbedBuilder()
                .setTitle(`Translated To \`${name}\``)
                .setDescription(`\`\`\`${res.text}\`\`\``)
                .setColor(`${process.env.ec}`)
                .setFooter({
                    text: `${client.user.username} - ${process.env.year} ©`, 
                    iconURL: process.env.iconurl
                });
           return interaction.followUp({ embeds: [embed] });
        })	
	}
};