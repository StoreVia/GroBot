const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { formatMessage, buttonStyle } = require('../utils/utils');
const approve = require('../utils/approve');
const cu = `${process.env.botname}`;


module.exports = class RPSGame extends approve {
  constructor(options = {}) {

    if (!options.isSlashGame) options.isSlashGame = false;
    if (!options.message) throw new TypeError('NO_MESSAGE: No message option was provided.');
    if (typeof options.message !== 'object') throw new TypeError('INVALID_MESSAGE: message option must be an object.');
    if (typeof options.isSlashGame !== 'boolean') throw new TypeError('INVALID_COMMAND_TYPE: isSlashGame option must be a boolean.');
    if (!options.opponent) throw new TypeError('NO_OPPONENT: No opponent option was provided.');
    if (typeof options.opponent !== 'object') throw new TypeError('INVALID_OPPONENT: opponent option must be an object.');


    if (!options.embed) options.embed = {};
    if (!options.embed.title) options.embed.title = 'Rock Paper Scissors';
    if (!options.embed.color) options.embed.color = '#5865F2';
    if (!options.embed.description) options.embed.description = 'Use The Button Below To Make A Choice.';

    if (!options.buttons) options.buttons = {};
    if (!options.buttons.rock) options.buttons.rock = 'Rock';
    if (!options.buttons.paper) options.buttons.paper = 'Paper';
    if (!options.buttons.scissors) options.buttons.scissors = 'Scissors';

    if (!options.emojis) options.emojis = {};
    if (!options.emojis.rock) options.emojis.rock = '🪨';
    if (!options.emojis.paper) options.emojis.paper = '📄';
    if (!options.emojis.scissors) options.emojis.scissors = '✂️';

    if (!options.timeoutTime) options.timeoutTime = 60000;
    if (!options.buttonStyle) options.buttonStyle = 'SUCCESS';
    if (!options.pickMessage) options.pickMessage = 'You Have Choosen {emoji}.';
    if (!options.winMessage) options.winMessage = '**{player}** Congratulations!, You Won The Game! ';
    if (!options.tieMessage) options.tieMessage = 'Draw. No One Won The Game!';
    if (!options.timeoutMessage) options.timeoutMessage = 'No One Won The Game!';
    if (!options.requestMessage) options.requestMessage = '{player} Has Invited You For Game(RockPaperScissors).';
    if (!options.rejectMessage) options.rejectMessage = 'The Player Rejected To Play With You.';


    if (typeof options.embed !== 'object') throw new TypeError('INVALID_EMBED: embed option must be an object.');
    if (typeof options.embed.title !== 'string') throw new TypeError('INVALID_EMBED: embed title must be a string.');
    if (typeof options.embed.color !== 'string') throw new TypeError('INVALID_EMBED: embed color must be a string.');
    if (typeof options.embed.description !== 'string') throw new TypeError('INVALID_EMBED: embed description must be a string.');
    if (typeof options.buttons !== 'object') throw new TypeError('INVALID_BUTTONS: buttons option must be an object.');
    if (typeof options.buttons.rock !== 'string') throw new TypeError('INVALID_BUTTONS: rock button must be a string.');
    if (typeof options.buttons.paper !== 'string') throw new TypeError('INVALID_BUTTONS: paper button must be a string.');
    if (typeof options.buttons.scissors !== 'string') throw new TypeError('INVALID_BUTTONS: scissors button must be a string.');
    if (typeof options.emojis !== 'object') throw new TypeError('INVALID_EMOJIS: emojis option must be an object.');
    if (typeof options.emojis.rock !== 'string') throw new TypeError('INVALID_EMOJIS: rock emoji must be a string.');
    if (typeof options.emojis.paper !== 'string') throw new TypeError('INVALID_EMOJIS: paper emoji must be a string.');
    if (typeof options.emojis.scissors !== 'string') throw new TypeError('INVALID_EMOJIS: scissors emoji must be a string.');
    if (typeof options.timeoutTime !== 'number') throw new TypeError('INVALID_TIME: Timeout time option must be a number.');
    if (typeof options.buttonStyle !== 'string') throw new TypeError('INVALID_BUTTON_STYLE: button style must be a string.');
    if (typeof options.pickMessage !== 'string') throw new TypeError('INVALID_MESSAGE: Pick message option must be a string.');
    if (typeof options.winMessage !== 'string') throw new TypeError('INVALID_MESSAGE: Win message option must be a string.');
    if (typeof options.tieMessage !== 'string') throw new TypeError('INVALID_MESSAGE: Tie message option must be a string.');
    if (typeof options.timeoutMessage !== 'string') throw new TypeError('INVALID_MESSAGE: Timeout message option must be a string.');
    if (options.playerOnlyMessage !== false) {
      if (!options.playerOnlyMessage) options.playerOnlyMessage = 'Only {player} and {opponent} can use these buttons.';
      if (typeof options.playerOnlyMessage !== 'string') throw new TypeError('INVALID_MESSAGE: playerOnly Message option must be a string.');
    }


    super(options);
    this.options = options;
    this.message = options.message;
    this.opponent = options.opponent;
    this.playerPick = null;
    this.opponentPick = null;
  }


  async sendMessage(content) {
    if (this.options.isSlashGame) return await this.message.editReply(content);
    else return await this.message.channel.send(content);
  }

  async startGame() {
    if (this.options.isSlashGame) {
      if (!this.message.deferred) await this.message.deferReply().catch(e => {});
      this.message.author = this.message.user;
    }

    const approve = await this.approve();
    if (approve) this.RPSGame(approve);
  }


  async RPSGame(msg) {

    const emojis = this.options.emojis;
    const labels = this.options.buttons;
    const choice = { r: emojis.rock, p: emojis.paper, s: emojis.scissors };

    const embed = new EmbedBuilder()
    .setColor(this.options.embed.color)
    .setTitle(this.options.embed.title)
    .setDescription(`${this.options.embed.description}.\n\n> ${this.message.author.tag + ' vs ' + this.opponent.tag}`)
    .setAuthor({ name: this.message.author.tag, iconURL: this.message.author.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `${cu} - ${process.env.year} ©`, iconURL: process.env.iconurl })

    this.options.buttonStyle = buttonStyle(this.options.buttonStyle);
    const r = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.r).setCustomId('rps_r').setLabel(labels.rock);
    const p = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.p).setCustomId('rps_p').setLabel(labels.paper);
    const s = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.s).setCustomId('rps_s').setLabel(labels.scissors);
    const row = new ActionRowBuilder().addComponents(r, p, s);

    await msg.edit({ embeds: [embed], components: [row] });
    const collector = msg.createMessageComponentCollector({ idle: this.options.timeoutTime });


    collector.on('collect', async btn => {
      await btn.deferUpdate().catch(e => {});
      if (btn.user.id !== this.message.author.id && btn.user.id !== this.opponent.id) {
        if (this.options.playerOnlyMessage) btn.followUp({ content: formatMessage(this.options, 'playerOnlyMessage'), ephemeral: true });
        return;
      }


      if (btn.user.id === this.message.author.id && !this.playerPick) {
        this.playerPick = choice[btn.customId.split('_')[1]];
        btn.followUp({ content: this.options.pickMessage.replace('{emoji}', this.playerPick), ephemeral: true });
      } 
      else if (!this.opponentPick) {
        this.opponentPick = choice[btn.customId.split('_')[1]];
        btn.followUp({ content: this.options.pickMessage.replace('{emoji}', this.opponentPick), ephemeral: true });
      }
      if (this.playerPick && this.opponentPick) return collector.stop();
    })

    collector.on('end', async (_, reason) => {
      if (reason === 'idle' || reason === 'user') return this.gameOver(msg, this.getResult());
    })
  }


  getResult() {
    if (!this.playerPick && !this.opponentPick) return 'timeout';
    else if (this.playerPick === this.opponentPick) return 'tie';
    else return 'win';
  }

  player1Won() {
    const { rock: r, paper: p, scissors: s } = this.options.emojis;
    return ((this.playerPick === s && this.opponentPick === p) || (this.playerPick === r && this.opponentPick === s) || (this.playerPick === p && this.opponentPick === r));
  }


  async gameOver(msg, result) {
    const RPSGame = { player: this.message.author, opponent: this.opponent, playerPick: this.playerPick, opponentPick: this.opponentPick };
    if (result === 'win') RPSGame.winner = this.player1Won() ? this.message.author.id : this.opponent.id;
    this.emit('gameOver', { result, ...RPSGame });


    const embed = new EmbedBuilder()
    .setColor(this.options.embed.color)
    .setTitle(this.options.embed.title)
    .setAuthor({ name: this.message.author.tag, iconURL: this.message.author.displayAvatarURL({ dynamic: true }) })
    .setFooter({ text: `${cu} - ${process.env.year} ©`, iconURL: process.env.iconurl })
    .setDescription(`${formatMessage(this.options, result+'Message', !this.player1Won())}.\n\n> ${this.message.author.tag + ' vs ' + this.opponent.tag}`)
    .addFields({ name: this.message.author.username, value: this.playerPick ?? '❔', inline: true })
    .addFields({ name: 'VS', value: '⚡', inline: true })
    .addFields({ name: this.opponent.username, value: this.opponentPick ?? '❔', inline: true })
    
    return msg.edit({ embeds: [embed], components: [] });
  }
}