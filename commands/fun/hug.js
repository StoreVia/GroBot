const Command = require('../../structures/CommandClass');
const { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, Attachment } = require('discord.js');
const fetch = require(`node-fetch`);

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('hug')
				.setDescription('Hug Some User.')
				.setDMPermission(true)
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription(`Which User You Want To Hug.`)
                        .setRequired(true)),
			usage: 'user',
			category: 'fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    await interaction.deferReply();
    const string = interaction.options.getUser(`user`);

    fetch(`https://some-random-api.ml/animu/hug`)
      .then((res) => res.json())
		  .then((data) => {
        const link = data.link;
        if(string === interaction.user){
          let attachment = new AttachmentBuilder(link);
          return interaction.followUp({ files: [attachment],content: `${interaction.user.username} You Can't Hug Yourselft. Come I Will Hug You 🥰.` })
        } else {
          let attachment = new AttachmentBuilder(link);
          return interaction.followUp({ files: [attachment],content: `${interaction.user.username} Hugs ${string.username}, Awww How Cute 🥰.` })
        }
      }
    ) 
	}
};