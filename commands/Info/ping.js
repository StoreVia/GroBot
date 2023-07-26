const Command = require("../../structures/CommandClass");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Gives You Bots Ping.")
        .setDMPermission(true),
      usage: "ping",
      category: "Info",
      permissions: ["Use Application Commands", "Send Messages", "Embed Links"],
    });
  }
  async run(client, interaction) {
    await interaction.deferReply();
    let embed = new EmbedBuilder()
      .setColor(`${process.env.ec}`)
      .addFields(
        { name: "**🟢 Api: **", value: `> \`0 ms\``, inline: true },
        { name: "**🏓 Latency: **", value: `> \`0 ms\``, inline: true },
      );
    interaction.followUp({ embeds: [embed] }).then((msg) => {
      let embed = new EmbedBuilder()
        .setColor(`${process.env.ec}`)
        .addFields(
          {
            name: "**🟢 Api: **",
            value: `> \`${Math.round(client.ws.ping)} ms\``,
            inline: true,
          },
          {
            name: "**🏓 Latency: **",
            value: `> \`${
              msg.createdTimestamp - interaction.createdTimestamp
            } ms\``,
            inline: true,
          },
        );
      interaction.editReply({ embeds: [embed] });
    });
  }
};
