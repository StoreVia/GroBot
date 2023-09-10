const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Formatters } = require('discord.js');
const moment = require('moment');
const formattor = new Intl.ListFormat(`en-GB`, { style: `narrow`, type: `conjunction` })

module.exports = class Userinfo extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('userinfo')
				.setDescription('Gives You Userinfo.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Who's Userinfo.`)
                        .setRequired(false)),
			usage: 'userinfo',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		await interaction.deferReply();
		const flag = { 
            TEAM_PSEUDO_USER: 'Team User', 
            BugHunterLevel1: 'Bug Hunter',
            BugHunterLevel2: 'Bug Buster',
            CertifiedModerator: 'Discord Certified Moderator',
            HypeSquadOnlineHouse1: 'House of Bravery',
            HypeSquadOnlineHouse2: 'House of Brilliance',
            HypeSquadOnlineHouse3: 'House of Balance',
            Hypesquad: 'HypeSquad Event Attendee',
            Partner: 'Discord Partner',
            PremiumEarlySupporter: 'Early Nitro Supporter',
            STAFF: 'Discord Staff',
            VerifiedBot: 'Verified Bot',
            VerifiedDeveloper: 'Verified Developer',
            ActiveDeveloper: 'Active Developer'
        };
        
        let UserOption = interaction.options.getUser('user') || interaction.user;
        let UserOption1 = interaction.options.getMember('user') || interaction.member;
        let target = await interaction.guild.members.fetch(UserOption.id)
        let userFlags = UserOption.flags.toArray();
        let filteredFlags = userFlags.filter(f => f in flag);
		let flog = filteredFlags.length ? formattor.format(filteredFlags.map(flags => flag[flags])) : "None" ;

        const userEmbed = new EmbedBuilder()
            .setAuthor({ 
                name: `${UserOption.tag}`, 
                iconURL: UserOption.displayAvatarURL({dynamic: true, size: 2048})
            })
            .setTitle(`Userinfo of \`${UserOption.username}\``) 
            .setThumbnail(UserOption.displayAvatarURL({dynamic: true}))
            .setColor(`${process.env.ec}`)
            .addFields(
		        { name: '**Username: **', value: `> ${UserOption.username}`, inline: true },
		        { name: '**Tag: **', value: `> #${UserOption.discriminator}`,inline: true },
		        { name: '**ID: **', value: `> ${UserOption.id}`, inline: true },       
                { name: '**Avatar: **', value: `> [ClickHere](${UserOption.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`,inline: true },
                { name: '**Bot: **', value: `> ${UserOption.bot ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                { name: '**Roles: **', value: `> ${target.roles.cache.map(r => r).join(' ').replace("@everyone", "") || "NONE"}`, inline: true },
                { name: '**Discord User Since: **', value: `\`\`\`> ${moment(UserOption.createdAt).format(`DD-MM-YYYY`)}\`\`\``,inline: true },
                { name: '**Server Joined: **', value: `\`\`\`> ${moment(UserOption1.joinedAt).format(`DD-MM-YYYY`)}\`\`\``, inline: true },
                { name: '**Flages: **', value: `\`\`\`> ${flog.replace(`, `, `\n> `)}\`\`\``, inline: false },
	        )
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`, 
                iconURL: process.env.iconurl
            });
        return await interaction.followUp({ embeds: [userEmbed] })
	}
};