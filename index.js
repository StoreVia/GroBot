/**
   ____              _ _ _       
  / ___|_ __ ___  __| (_) |_ ___ 
 | |   | '__/ _ \/ _` | | __/ __|
 | |___| | |  __/ (_| | | |_\__ \
  \____|_|  \___|\__,_|_|\__|___/                              

 * Made By StoreVia Developers
 * Credits :- Professor.#1974 (Discord)
 * Version :- v1.0
 * BotName :- GroBot
 * Website :- https://www.grobot.store

*/

//packagesstart
const Client = require('./structures/Client');
require('dotenv').config();
const canvacord = require("canvacord");
const Discord = require(`discord.js`)
const Canvas = require('canvas');
const db = require(`quick.db`)
const version = require(`./package.json`).version;
const { GiveawaysManager } = require("./B_Gro_Modules/discord-giveaways");
const client = new Client();
const canv = require('canvas'),
	canvas = canv.createCanvas(1018, 468),
	ctx = canvas.getContext('2d')
const { loadImage } = require(`canvas`)
const { Captcha } = require("discord.js-captcha");
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require('@distube/yt-dlp');
const moment = require('moment');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const titlecase = require(`title-case`)
const { readdirSync } = require("fs");
const colors = require("colors");
const { DiscordTogether } = require('discord-together');
const fetch = require(`node-fetch`)
//packagesend

//clientextensionsstart
client.discordTogether = new DiscordTogether(client);
client.commands = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
["Command", "Event", "RegisterSlash"]
.filter(Boolean)
.forEach(h => {
  require(`./handler/${h}`);
})
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaway_utility/giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: process.env.ec,
    embedColorEnd: process.env.ec,
    reaction: "🎉"
  }
});
//clientextensionsend

/**
//distubesettingstart
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
}
spotifyoptions.api = {
  clientId: `e505e4e082914ae8872d5a10442ab6f6`,
  clientSecret: `8d5e8f809cba4f658e150cb6d234a99a`,
}
client.distube = new DisTube(client, {
  youtubeCookie: 'YSC=vMLAlaILcQI; VISITOR_INFO1_LIVE=IRiaZnScO3c; GPS=1; PREF=f4=4000000&f6=40000000&tz=Asia.Calcutta; SID=Rgi8YGY5qmSIfNichRRqPYT_JK86-5w0dJpg29osIPWrKRewsVgT5j-9hhS4Wgj2ZLlPVA.; __Secure-1PSID=Rgi8YGY5qmSIfNichRRqPYT_JK86-5w0dJpg29osIPWrKRewIeoatCryfVwDyEwlmqAU1g.; __Secure-3PSID=Rgi8YGY5qmSIfNichRRqPYT_JK86-5w0dJpg29osIPWrKRewbjAhdZSj6Aoe1Nl9brfEfA.; HSID=AxFPQBEGvbvNAo6mj; SSID=AUJr6ijpCD324MijR; APISID=xTw7Sv_dbw29awZY/AIjjAhVrmZyB0GQyA; SAPISID=VjSJP1CvLl-g-jPE/ATfUJxeOrEHDbO2EN; __Secure-1PAPISID=VjSJP1CvLl-g-jPE/ATfUJxeOrEHDbO2EN; __Secure-3PAPISID=VjSJP1CvLl-g-jPE/ATfUJxeOrEHDbO2EN; LOGIN_INFO=AFmmF2swRgIhAPZCU_YadqbCb6UPDqPUWq_MAndecBDPiOiAN9xoa_xBAiEAvUFN0zbZZF3RiQp85pZGMS0MbIfeVk_RJUyiWDI7tPw:QUQ3MjNmeUN1YjdHblJkQk0td3ZNT2NaY2E1RnZ4MnNqc2EyLVRNbHg2SHJYTlFXSU9qZHBweXRNRVdUZ3dtOG13N0g2NklrNDhIQ2VQVGxzXzlLY1pwWC1Qb3NaZmUzR3Z4TmlYYXdVU2UxSWNlRWp1S0MtN1pDUkpuSWQ2LVBZSmZEMW9yRlJrN0taNzA2azNYQ1Zra01vYjZSa3BXaW93; CONSISTENCY=ADecB4vfyN2otHe9-bbbeDVAqxXsakHnBBZVo4hy-jt4YgUXwqbTkiKMiqNeyUCxlure49Ly8UDnOyebnacbrbKg4vCpD8bgj7jPgBlIhEJ27Bcv7tbDM7D3O4YcdRzAOkK0MupqdT7Y2NEf5Q2yapP1iojcyI0jOtG26n_Lbv8cvcLvQfoaq1xPMu8FSKGVXFJvK6eD3QseU-gUqYenJAJ2ioM; SIDCC=AIKkIs3U6EiwFU100gGB4NYyZTb_5ec5p-eyB5JjfZsdPTHYq7AASMipww5_ECQivwXzq8LK; __Secure-1PSIDCC=AIKkIs2C0EGaUFRY8gANPSF0nmD9hlOpQQ75m6my9Q44R5M-s8PsCr_hnxaDq-1m3dxNX4q43A; __Secure-3PSIDCC=AIKkIs23aXKE28u0mZPcUNeUsYOWKnmCLWDCmjUZeCxcLG8XSfupc_4msISyjRshC21vNELRog',
  emitNewSongOnly: false,
  searchCooldown: 30,
  leaveOnEmpty: false,
  emptyCooldown: 60,
  leaveOnFinish: false,
  leaveOnStop: false,
  customFilters:
  {
    "clear": "dynaudnorm=f=200",
    "lightbass": "bass=g=8,dynaudnorm=f=200",
    "bassboost": "bass=g=20,dynaudnorm=f=200",
    "8d": "apulsator=hz=0.08",
    "customspeed": "atempo=1.0",
    "vaporwave": "aresample=48000,asetrate=48000*0.8",
    "nightcore": "aresample=48000,asetrate=48000*1.25",
    "phaser": "aphaser=in_gain=0.4",
    "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
    "tremolo": "tremolo",
    "vibrato": "vibrato=f=6.5",
    "reverse": "areverse",
    "treble": "treble=g=5",
    "surrounding": "surround",
    "pulsator": "apulsator=hz=1",
    "subboost": "asubboost",
    "karaoke": "stereotools=mlev=0.03",
    "flanger": "flanger",
    "gate": "agate",
    "haas": "haas",
    "mcompand": "mcompand"
  },
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});
//distubesettingstart
 */

//consoleloggingstart
try {
  let stringlength = 69;
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Loading Slash Commands`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Loading Slash Commands`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

  let amount = 0;
  readdirSync("./commands/").forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      let pull = require(`./commands/${dir}/${file}`);
      console.log( 
        colors.red(`Slash : `) + colors.green(`${dir} : `) + colors.yellow(file + " - " + "File Was Loaded")
      );
      if (pull.name) {
        client.commands.set(pull.name, pull);
        amount++;
      } else {
        console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
    }
  });
  console.log(`${amount} Slash Command Files Loaded.`.brightGreen);
} catch (e) {
    console.log(String(e.stack).bgRed)
}
//consoleloggingend

/**
//distubestart
client.distube
  .on('playSong', (queue, song) => {
    let embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Now Playing ♪`,
        iconURL: process.env.music_iconurl
      })
      .setDescription(`[${song.name}](${song.url})`)
      .addFields(
        { name: '**Author: **', value: `[${song.uploader.name}](${song.uploader.url})`,inline: true },
        { name: '**Duration: **', value: `\`${song.formattedDuration}\``,inline: true },
        { name: '**Requested By: **', value: `${song.user}`,inline: true },
      )
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`,
        iconURL: process.env.iconurl
      })
    queue.textChannel.send({ embeds: [embed] })
  })
  .on('addSong', (queue, song) => {
    let embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Added Song To Queue!`,
        iconURL: process.env.music_iconurl
      })
      .setDescription(`[${song.name}](${song.url})`)
      .addFields(
        { name: '**Author: **', value: `[${song.uploader.name}](${song.uploader.url})`,inline: true },
        { name: '**Duration: **', value: `\`${song.formattedDuration}\``,inline: true },
        { name: '**Requested By: **', value: `${song.user}`,inline: true },
      )
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`,
        iconURL: process.env.iconurl
      })
    queue.textChannel.send({ embeds: [embed] })
  })
  .on('addList', (queue, playlist) => {
    let embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Added PlayList To Queue!`,
        iconURL: process.env.music_iconurl
      })
      .setDescription(`[${playlist.name}](${playlist.url})`)
      .addFields(
        { name: '**No.of Songs: **', value: `${playlist.songs.length}`,inline: true },
        { name: '**Requested By: **', value: `${playlist.user}`,inline: true },
      )
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`,
        iconURL: process.env.iconurl
      })
    queue.textChannel.send({ embeds: [embed] })
  })
  .on('error', (channel, e) => {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`An Error Occured!`)
      .setDescription(`**Visit This Website To Resolve Error :- [ClickHere](https://grobot.store/errors.html).**`)
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`,
        iconURL: process.env.iconurl
      })
    channel.send({ embeds: [embed] })
    console.error(e)
  })
  .on('empty', (channel) => {
    let embed = new Discord.EmbedBuilder()
      .setDescription(`Leaving Voice Channel! Insufficient Members.`)
      .setColor(`${process.env.ec}`)
    message.channel.send({ embeds: [embed] })
  })
  .on('searchNoResult', (message, query) => {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`No Result Found!`)
      .setDescription(`**Error (429 : Server Busy Due To Too Many Requestes)** \n> If You Think This Is An Error Please Report Us By Us "$report" Command.`)
      .setColor(`${process.env.ec}`)
      .setFooter({
        text: `${client.user.username} - ${process.env.year} ©`,
        iconURL: process.env.iconurl
      })
    message.channel.send({ embeds: [embed] })
  })
  .on('finish', queue => {
    let embed = new Discord.EmbedBuilder()
      .setDescription(`Music Queue Has Been Ended.`)
      .setColor(`${process.env.ec}`)
    queue.textChannel.send({ embeds: [embed] })
  })
  .on("initQueue", queue => {
    queue.volume = 100;
  });
//distubeend
 */

//errorhandlingstart
process.on('unhandledRejection', (reason, p) => {
  console.log(' [ AntiCrashDetection ]:- Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch');
  console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
//errorhandlingend

//clientloginstart
client.login().then(() => {
})
//clientloginend