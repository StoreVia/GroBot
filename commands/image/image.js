const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, AttachmentBuilder  } = require('discord.js');
const canvacord = require("canvacord");

module.exports = class Image extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('image')
				.setDescription('Add Some Image Effects.')
                .addSubcommand(subcommand => 
                    subcommand
                        .setName(`filter`)
                        .setDescription(`Choose Filter You Wan To Add.`)
                .addStringOption(option =>
                    option.setName('category')
                        .setDescription('The Image Effect Category.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'blur', value: 'img_blur' },
                            { name: 'gay', value: 'img_gay' },
                            { name: 'greyscale', value: 'img_greyscale' },
                            { name: 'invert', value: 'img_invert' },
                            { name: 'jail', value: 'img_jail' },
                            { name: 'sepia', value: 'img_sepia' },
                            { name: 'trigger', value: 'img_trigger' },
                            { name: 'wasted', value: 'img_wasted' },
                            ))
                            .addUserOption(option =>
                                option.setName('user')
                                    .setDescription(`Which User You Want To Apply Filter.`)
                                    .setRequired(false)))
                .addSubcommand(subcommand => 
                    subcommand
                        .setName(`youtube`)
                        .setDescription(`Make A Fake Youtube Comment.`)
                .addStringOption(option =>
                    option.setName('text')
                        .setDescription('Enter Text You Want To Fake Comment.')
                        .setRequired(true))),
			usage: 'image',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

		await interaction.deferReply();
        
        const subcommand = interaction.options.getSubcommand();
        const UserOption = interaction.options.getUser('user') || interaction.user;
        const StringOption = interaction.options.getString("category");

        if(subcommand === "filter"){
            if(StringOption == "img_blur"){
                let image = await canvacord.Canvas.blur(UserOption.displayAvatarURL({ extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "blur.png");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_gay"){
                const gay_user = UserOption.displayAvatarURL({ extension: 'png' });
                return await interaction.followUp({ files : [{ attachment: `https://some-random-api.com/canvas/Gay?avatar=${gay_user}`, name: 'image.png' }]});
            }

            if(StringOption == "img_greyscale"){
                let image = await canvacord.Canvas.greyscale(UserOption.displayAvatarURL({ extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "greyscale.png");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_invert"){
                let image = await canvacord.Canvas.invert(UserOption.displayAvatarURL({ extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "invert.png");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_jail"){
                let image = await canvacord.Canvas.jail(UserOption.displayAvatarURL({ extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "jail.png");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_sepia"){
                let image = await canvacord.Canvas.sepia(UserOption.displayAvatarURL({ extensiFon: 'png' }));
                let attachment = new AttachmentBuilder(image, "sepia.png");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_trigger"){
                let image = await canvacord.Canvas.trigger(UserOption.displayAvatarURL({ dynamic: false, extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "triggered.gif");
                return await interaction.followUp({ files : [attachment] });
            }

            if(StringOption == "img_wasted"){
                let image = await canvacord.Canvas.wasted(UserOption.displayAvatarURL({ extension: 'png' }));
                let attachment = new AttachmentBuilder(image, "wasted.png");
                return await interaction.followUp({ files : [attachment] });
            }
        }

        if(subcommand === "youtube"){
            const youtubeuseravatar = UserOption.displayAvatarURL({ extension: 'png' });
            const youtubeusername = UserOption.username;
            const comment = interaction.options.getString(`text`);
            return await interaction.followUp({ files : [{ attachment: `https://some-random-api.com/canvas/youtube-comment?avatar=${youtubeuseravatar}&username=${youtubeusername}&comment=${comment}`, name: 'image.png' }]});
        }
	}
};