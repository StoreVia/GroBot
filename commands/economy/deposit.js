const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, Embed } = require('discord.js');
const { stripIndents } = require('common-tags');
const db = require(`quick.db`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('deposit')
				.setDescription('Deposit Money In Bank.')
				.setDMPermission(true)
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription(`Enter Amount You Want To Deposit.`)
                        .setRequired(false)),
			usage: 'deposit',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

       await interaction.deferReply();
       let user = interaction.user;
       const amount = interaction.options.getInteger(`amount`);
       let money = db.fetch(`money_${user.id}`)

       if(money < amount){
        const embed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`You Don't Have \`${amount}$\` To Deposit In Your Bank Account.`)
            return await interaction.followUp({ embeds: [embed]})
        }
        if(!amount){
            let allbal = db.fetch(`money_${user.id}`)
            db.subtract(`money_${user.id}`, allbal)
            db.add(`bank_${user.id}`, allbal)
            const embed = new EmbedBuilder()
            .setColor(`${process.env.ec}`)
            .setDescription(`Done✅. You Have Deposited \`${allbal}$\` In Your Bank Account..`)
            return await interaction.followUp({ embeds: [embed]})
        }else {
            db.subtract(`money_${user.id}`, amount)
            db.add(`bank_${user.id}`, amount)
            const embed = new EmbedBuilder()
                .setColor(`${process.env.ec}`)
                .setDescription(`Done✅. You Have Deposited \`${amount}$\` In Your Bank Account.`)
            return await interaction.followUp({ embeds: [embed]})
       }

	}
};