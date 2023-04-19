const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class Covid extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('covid')
				.setDescription('Get All Covid Cases Number List.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('all')
                        .setDescription('Get Covid Cases All Over The World.')),
			usage: 'covid',
			category: 'utility',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		await interaction.deferReply();

        if (interaction.options.getSubcommand() === 'all') {

            fetch(`https://disease.sh/v3/covid-19/all`)
            .then((res) => res.json())
            .then((data) => {
                const embed = new EmbedBuilder()
                    .setTitle(`Worldwide COVID-19 Stats 🌎`)
                    .addFields( 
                        { name: '**AllCases: **', value: `> ${data.cases.toLocaleString()}`, inline: true },
                        { name: '**Deaths: **', value: `> ${data.deaths.toLocaleString()}`, inline: true },
                        { name: '**Recovered: **', value: `> ${data.recovered.toLocaleString()}`, inline: true },
                        { name: '**TodayCases: **', value: `> ${data.todayCases.toLocaleString()}`, inline: true },
                        { name: '**TodayDeaths: **', value: `> ${data.todayDeaths.toLocaleString()}`, inline: true },
                        { name: '**TodayRecovered: **', value: `> ${data.todayRecovered.toLocaleString()}`, inline: true },
                        { name: '**Active: **', value: `> ${data.active.toLocaleString()}`, inline: true },
                        { name: '**Critical: **', value: `> ${data.critical.toLocaleString()}`, inline: true },
                        { name: '**CasesPerMillion: **', value: `> ${data.casesPerOneMillion.toLocaleString()}`, inline: true },
                    )
                    .setThumbnail(`https://i.imgur.com/gosmq21.png`)
                    .setColor(`${process.env.ec}`)
                    .setFooter({
                        text: `${client.user.username} - ${process.env.year} ©`, 
                        iconURL: process.env.iconurl
                    }); 
                return interaction.followUp({embeds: [embed]})
            })  
        }
	}
};