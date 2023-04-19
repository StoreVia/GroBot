<div align = "center">
<h1>🍥・Naotori</h1>
</div>
<div align = "center">
<h2>NPM para manipulación de imágenes de una manera sencilla</h2>
</div>

[![NPM](https://nodei.co/npm/naotori.png)](https://nodei.co/npm/naotori/)

## 🍀・Características
- Fácil de usar ✨
- Muy personalizable 🎨
- Rápido y eficiente 🚀

## 📦・Instalación
- Necesitarás **discord.js**
- Necesitarás **canvas**
- Ahora podrás abrir tu terminal y escribir:

```
$ npm install naotori
```

## 📖・Contenido

### 🔮・Funciones:

- [`WelcomeCard()`](https://www.npmjs.com/package/naotori#WelcomeCard) - Crea una bienvenida para tu servidor de **Discord** de una manera muy sencilla.

## 📜・Ejemplos

### WelcomeCard

```js
const naotori = require('naotori')
const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('guildMemberAdd', async member => {

    const wlcCard = await new naotori.WelcomeCard() // el await es importante
    .setBackground('https://i.imgur.com/CL9Fkoy.jpeg') // ( opcional ) | El  fondo de la imagen | ( default ) Fondo transparente
    .setMemberIcon(member.user.displayAvatarURL({ format: 'png', size: 4096})) // ( obligatorio ) | Ícono del miembro
    .setCircleColor('#ffffff') // ( opcional ) | Color del círculo de usuario | ( default ) No hay círculo
    .setTitle('Hola que tal bienvenid@') // ( obligatorio ) | Título de la tarjeta
    .setDescription('Espero que te la pases muy bien') // ( opcional ) | Descripción de la tarjeta | ( default) No hay descripción
    .setFont('DEFAULT') // ( opcional ) | La fuente de el título y descripción | ( default ) DEFAULT | ( opciones ) DEFAULT, ANIMATION, CHINESE

    let card = await wlcCard.render() // ( obligatorio ) | Crea la tarjeta

    const attachment = new Discord.MessageAttachment(card, 'bienvenida.png')
    client.channels.cache.get('CHANNEL-ID').send({ files: [attachment]})
})

client.login('BOT-TOKEN')
```

### 🔎・Vista previa - **WelcomeCard**

![WellcomeCard](https://i.imgur.com/vyqgmvx.png)

## 🌌・Autor
>ayamiヾ#0305