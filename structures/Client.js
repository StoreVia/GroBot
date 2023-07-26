const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");
const { Collection } = require("@discordjs/collection");
const CommandHandler = require("../handler/Command");
const EventHandler = require("../handler/Event");
const Util = require("./Util");

module.exports = class BotClient extends Client {
  constructor(...opt) {
    super({
      opt,
      partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.Channel,
        Partials.User,
      ],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.commands = new Collection();
    this.events = new Collection();
    this.util = new Util(this);

    new EventHandler(this).build("../events");
    new CommandHandler(this).build("../commands");
    new CommandHandler(this).build("../C_Private_Slash");
  }

  async login() {
    await super.login(process.env.token);
  }

  exit() {
    if (this.quitting) return;
    this.quitting = true;
    this.destroy();
  }

  fetchCommand(cmd) {
    return this.commands.get(cmd);
  }
};
