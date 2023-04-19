const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');
const db = require(`quick.db`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('shop')
				.setDescription('Buy/Sell/View Items.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('view')
                        .setDescription('See All Items In Store.'))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName(`buy`)
                        .setDescription(`Buy An Item From Shop.`)
						.addStringOption(option =>
							option.setName('item')
								.setDescription('Item You Want To Purchase.')
								.setRequired(true)
								.addChoices(
                            		{ name: 'Steel', value: 'item_st' },
                            		{ name: 'Silver', value: 'item_si' },
                            		{ name: 'Gold', value: 'item_go' },
                            		{ name: 'Diamond', value: 'item_di' },
                            		{ name: 'Platinum', value: 'item_pl' },
                            		{ name: 'Button Phone', value: 'item_bu' },
                            		{ name: 'BlackBerry', value: 'item_bl' },
                            		{ name: 'Gaming Phone', value: 'item_ga' },
                            		{ name: 'Iphone', value: 'item_ip' },
									{ name: 'Golden Iphone', value: 'item_go' },
									{ name: 'Dell', value: 'item_de' },
									{ name: 'Lenovo', value: 'item_le' },
									{ name: 'Asus', value: 'item_as' },
									{ name: 'MacBook', value: 'item_mb' },
									{ name: 'MacBook AIR M2', value: 'item_ma' },
                        		))),
			usage: 'shop',
			category: 'economy',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

        await interaction.deferReply();

        const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setPlaceholder('Select An Option')
					.setCustomId('storepage')
					.setMaxValues(1)
					.setOptions([
						{
							label: 'Jewellery',
							value: 'jew',
							emoji: '💎',
						},
						{
							label: 'Mobiles',
							value: 'mob',
							emoji: '📱',
						},
						{
							label: 'Laptop',
							value: 'lap',
							emoji: '💻',
						},
					]),
			);

        const disabled = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setPlaceholder('Select An Option')
				.setCustomId('colors1')
                .setDisabled(true)
				.setMaxValues(1)
				.setOptions([
					{
						label: 'GroBot',
						value: 'grobot',
						emoji: '🤖',
					},
                ])
			);

        if (interaction.options.getSubcommand() === 'view') {
            let embed = new EmbedBuilder()
            .setTitle('Store')
            .setThumbnail(`${process.env.iconurl}`)
            .setDescription(`Select One Of The Options Below.\n\n**Avilable Stores: **\`\`\`> Jewellery Store\n> Mobile Store\n> Laptop Store\`\`\`\n\n **To Buy Any Shop Item Use "</shop buy:1051027438454460487>" Command.**`)
            .setFooter({
                text: `${client.user.username} - ${process.env.year} ©`, 
               iconURL: process.env.iconurl
             })
            .setColor(`${process.env.ec}`);
            await interaction.followUp({ embeds: [embed], components: [selectMenuRow] });

			const filter = i => i.customId === 'storepage';
			const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 60000 });
        	collector.on('collect', async i => {
			if (i.user.id != interaction.user.id) {
				await i.reply({ content: "This Interaction Doesn't Belongs To You.", ephemeral: true });
			}
			const selected = i.values[0];
			if (i.customId === 'storepage') {
				if(selected === `jew`){
					let imageembed = new EmbedBuilder()
					.setTitle(`Jewellery Items In Store`)
					.setDescription(`-> **Steel: ** \`10000$\`\n-> **Silver: ** \`25000$\`\n-> **Gold: ** \`50000$\`\n-> **Diamond: ** \`75000$\`\n-> **Platinum: ** \`100000$\``)
					.setFooter({
						text: `${client.user.username} - ${process.env.year} ©`, 
						iconURL: process.env.iconurl
					})
  					.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}
				if(selected === `mob`){
					let imageembed = new EmbedBuilder()
					.setTitle(`Mobile Items In Store`)
					.setDescription(`-> **Button Phone: ** \`4000$\`\n-> **BlackBerry: ** \`10000$\`\n-> **Touch Phone: ** \`25000$\`\n-> **Gaming Phone: ** \`60000$\`\n-> **Iphone: ** \`190000$\`\n-> **Golden Iphone: ** \`300000$\``)
					.setFooter({
						text: `${client.user.username} - ${process.env.year} ©`, 
						iconURL: process.env.iconurl
					})
  					.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}
				if(selected === `lap`){
					let imageembed = new EmbedBuilder()
					.setTitle(`Laptop Items In Store`)
					.setDescription(`-> **Dell: ** \`50000$\`\n-> **Lenovo: ** \`600000$\`\n-> **Asus: ** \`90000$\`\n-> **MacBook: ** \`90000$\`\n-> **MacBook AIR M2: ** \`112000$\``)
					.setFooter({
						text: `${client.user.username} - ${process.env.year} ©`, 
						iconURL: process.env.iconurl
					})
  					.setColor(`${process.env.ec}`);
  					await i.update({ embeds: [imageembed]})
				}
			}
	   })

       collector.on('end', async (_, reason) => {
			if (reason === 'idle') {
            	return await interaction.editReply({ components: [disabled] });
        	}
      	});
        }



	  /////////////////////////////


	  
	  if (interaction.options.getSubcommand() === 'buy') {
		const StringOption = interaction.options.getString("item");

		let money = db.fetch(`money_${interaction.user.id}`);

        if(StringOption == "item_st"){
			if(money < 10000){
				let embed = new EmbedBuilder()
					.setColor(`${process.env.ec}`)
					 .setDescription(`You Need \`10000$\` To Buy Steel.\n\n **Note:- Only Wallet Money Can Be Used To Buy Anything.**`)
				  return await interaction.followUp({ embeds: [embed]})
			}
			if(money => 10000){
				await db.fetch(`steel_${interaction.user.id}`)
					db.add(`steel_${interaction.user.id}`, 1)
					db.subtract(`money_${interaction.user.id}`, 10000)
	
					let embed = new EmbedBuilder()
					  .setColor(`${process.env.ec}`)
					   .setDescription(`Done✅. Purchased Steel For \`10000$\`.`)
					return await interaction.followUp({ embeds: [embed]})
			}
        } else

		//////////////////////////////
		
		if(StringOption == "item_si"){
			if(money < 25000){
				let embed = new EmbedBuilder()
					.setColor(`${process.env.ec}`)
					 .setDescription(`You Need \`25000$\` To Buy Silver.\n\n **Note:- Only Wallet Money Can Be Used To Buy Anything.**`)
				  return await interaction.followUp({ embeds: [embed]})
			}
			if(money => 25000){
				await db.fetch(`silver_${interaction.user.id}`)
					db.add(`silver_${interaction.user.id}`, 1)
					db.subtract(`money_${interaction.user.id}`, 25000)
	
					let embed = new EmbedBuilder()
					  .setColor(`${process.env.ec}`)
					   .setDescription(`Done✅. Purchased Silver For \`25000$\`.`)
					return await interaction.followUp({ embeds: [embed]})
			}
        } else

		//////////////////////////////
				
		if(StringOption == "item_go"){
			if(money < 50000){
				let embed = new EmbedBuilder()
					.setColor(`${process.env.ec}`)
					 .setDescription(`You Need \`50000$\` To Buy Gold.\n\n **Note:- Only Wallet Money Can Be Used To Buy Anything.**`)
				  return await interaction.followUp({ embeds: [embed]})
			}
			if(money => 50000){
				await db.fetch(`gold_${interaction.user.id}`)
					db.add(`gold_${interaction.user.id}`, 1)
					db.subtract(`money_${interaction.user.id}`, 50000)
	
					let embed = new EmbedBuilder()
					  .setColor(`${process.env.ec}`)
					   .setDescription(`Done✅. Purchased Gold For \`50000$\`.`)
					return await interaction.followUp({ embeds: [embed]})
			}
        } else

		//////////////////////////////

		if(StringOption == "item_di"){
			if(money < 75000){
				let embed = new EmbedBuilder()
					.setColor(`${process.env.ec}`)
					 .setDescription(`You Need \`75000$\` To Buy Diamond.\n\n **Note:- Only Wallet Money Can Be Used To Buy Anything.**`)
				  return await interaction.followUp({ embeds: [embed]})
			}
			if(money => 75000){
				await db.fetch(`diamond_${interaction.user.id}`)
					db.add(`diamond_${interaction.user.id}`, 1)
					db.subtract(`money_${interaction.user.id}`, 75000)
	
					let embed = new EmbedBuilder()
					  .setColor(`${process.env.ec}`)
					   .setDescription(`Done✅. Purchased Diamond For \`75000$\`.`)
					return await interaction.followUp({ embeds: [embed]})
			}
        } else

		//////////////////////////////

		if(StringOption == "item_pl"){
			if(money < 100000){
				let embed = new EmbedBuilder()
					.setColor(`${process.env.ec}`)
					 .setDescription(`You Need \`100000$\` To Buy Platinum.\n\n **Note:- Only Wallet Money Can Be Used To Buy Anything.**`)
				  return await interaction.followUp({ embeds: [embed]})
			}
			if(money => 100000){
				await db.fetch(`platinum_${interaction.user.id}`)
					db.add(`platinum_${interaction.user.id}`, 1)
					db.subtract(`money_${interaction.user.id}`, 100000)
	
					let embed = new EmbedBuilder()
					  .setColor(`${process.env.ec}`)
					   .setDescription(`Done✅. Purchased Platinum For \`100000$\`.`)
					return await interaction.followUp({ embeds: [embed]})
			}
        } else

		if(StringOption){
			interaction.followUp({ content: "> Out Of Stock. You Can Only Buy Jewellery For Now." })
		}

		//////////////////////////////

	  }

	}
};