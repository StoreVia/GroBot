const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const moment = require('moment');

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
        let mentionedMember = UserOption;
        let UserOption1 = interaction.options.getMember('user') || interaction.member;
        let mentionedMember1 = UserOption1;
        let userFlags = mentionedMember.flags.toArray();
        let flog = userFlags.map(flags => flag[flags]);

        let target = await interaction.guild.members.fetch(UserOption.id)

        const userEmbed = new EmbedBuilder()
            .setAuthor({ 
                name: `${mentionedMember.tag}`, 
                iconURL: mentionedMember.displayAvatarURL({dynamic: true, size: 2048})
            })
            .setTitle(`Userinfo of \`${mentionedMember.username}\``) 
            .setThumbnail(mentionedMember.displayAvatarURL({dynamic: true}))
            .setColor(`${process.env.ec}`)
            .addFields(
		        { name: '**Username: **', value: `> ${mentionedMember.username}`, inline: true },
		        { name: '**Tag: **', value: `> #${mentionedMember.discriminator}`,inline: true },
		        { name: '**ID: **', value: `> ${mentionedMember.id}`, inline: true },       
                { name: '**Avatar: **', value: `> [ClickHere](${mentionedMember.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`,inline: true },
                { name: '**Bot: **', value: `> ${mentionedMember.bot ? "\`✔️\`" : "\`❌\`"}`, inline: true },
                { name: '**Roles: **', value: `> ${target.roles.cache.map(r => r).join(' ').replace("@everyone", "") || "NONE"}`, inline: true },
                { name: '**Discord User Since: **', value: `\`\`\`> ${moment(mentionedMember.createdAt).format(`DD-MM-YYYY`)}\`\`\``,inline: true },
                { name: '**Server Joined: **', value: `\`\`\`> ${moment(mentionedMember1.joinedAt).format(`DD-MM-YYYY`)}\`\`\``, inline: true },
                { name: '**Flages: **', value: `\`\`\`> ${flog || 'None'}\`\`\``, inline: false },
	        )
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`, 
                iconURL: process.env.iconurl
            });
        return await interaction.followUp({ embeds: [userEmbed] })
	}
};