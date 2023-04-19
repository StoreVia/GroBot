const Command = require('../../structures/CommandClass');
const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = class CatchTheFish extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('catchthefish')
				.setDescription('Play Catch The Fish Game.')
        .addNumberOption(option =>
          option.setName(`count`)
            .setDescription(`Give Number Of Fishes You Want To Catch.(enter number less than 25)`)
            .setRequired(true)),
			usage: 'catchthefish',
			category: 'Games',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {

    const positions = {      
      safe:   '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
      danger: '_ _                          💣\n            _ _              :hand_splayed:\n            _ _              :cat:',
      win:    '_ _           :crown:**You Won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
      lose:   '_ _           :skull:**You Lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
      left:   '_ _                 **You Left.**\n_ _                      :hand_splayed:\n_ _                      :cat:'
    };

    let randomized = Math.floor(Math.random() * 2);
    let gameEnded = false;
    let randomPos = positions[Object.keys(positions)[randomized]];
    let data = 0;
    let count = interaction.options.getNumber(`count`);

    if(count > 25){ 
		  await interaction.deferReply({ ephemeral: true });
      await interaction.followUp({ content: "Number Should Be Less Than 25." })
    }

    const componentsArray = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('e')
          .setLabel('Stop')
          .setDisabled(false)
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(String(Math.random()))
          .setEmoji('🎣')
          .setDisabled(false)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('ee')
          .setLabel('Stop')
          .setDisabled(false)
          .setStyle(ButtonStyle.Danger)
      );

    const componentsArray1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('e')
          .setLabel('Stop')
          .setDisabled(true)
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(String(Math.random()))
          .setEmoji('🎣')
          .setDisabled(true)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('ee')
          .setLabel('Stop')
          .setDisabled(true)
          .setStyle(ButtonStyle.Danger)
      );
  



    await interaction.deferReply();
    let msg = await interaction.followUp({ content: `Catch ${count} Fishes To Win!\n\n${randomPos}`, components: [componentsArray] })

    const filter = (button => {
       return button.user.id === interaction.user.id; 
    });

    const collector = interaction.channel.createMessageComponentCollector({ filter });

    function update(button) {
      randomized = Math.floor(Math.random() * 2);
      randomPos = positions[Object.keys(positions)[randomized]];
      if(data === count) {
        gameEnded = true;
        collector.stop();
        msg.edit({
          content: positions.win,
          components: [componentsArray1],
        });
        button.deferUpdate();
      } else 
      if(data <= -count * 3) {
        gameEnded = true;
        collector.stop();
        msg.edit({
          content: positions.lose,
          components: [componentsArray1],
        });
        button.deferUpdate();
      } 
      else {
        if(button){
          return button.deferUpdate();
        } else {
          msg.edit({
            content: randomPos + `           **${data}**`,
            components: [componentsArray],
          });
        }
      } 
    }
      
    setInterval(() => {
      if(gameEnded === false){
        return update();
      } 
    }, 2000);
      
    collector.on('collect', async (button) => {
      if(button.customId === "e"){
        gameEnded = true;
        msg.edit({ content: `${positions.left}`, components: [componentsArray1]});
      }
      if(button.customId === "ee"){
        gameEnded = true;
        msg.edit({ content: `${positions.left}`, components: [componentsArray1]});
      }
      if(randomized !== 0) {
        data -= count;
        update(button);
      }
      else {
        data++;
        update(button);
      }
    });
	}
}