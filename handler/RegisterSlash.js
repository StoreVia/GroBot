const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();
const {
  readdirSync
} = require("fs");
const colors = require("colors");

const deploy = async () => {

	const commandData = [];
	const privateData = [];

	fs.readdirSync('./commands/').forEach(async category => {
		const commands = fs.readdirSync(`./commands/${category}/`).filter(cmd => cmd.endsWith('.js'));

		for (const command of commands) {
			const Command = require(`../commands/${category}/${command}`);

			const cmd = new Command();

			const cmdData = cmd.data.toJSON();
			commandData.push(cmdData);
		}
	});

	fs.readdirSync('./C_Private_Slash/').forEach(async category => {
		const commands1 = fs.readdirSync(`./C_Private_Slash/${category}/`).filter(cmd => cmd.endsWith('.js'));

		for (const command of commands1) {
			const Command1 = require(`../C_Private_Slash/${category}/${command}`);

			const cmd1 = new Command1();

			const cmdData1 = cmd1.data.toJSON();
			privateData.push(cmdData1);
		}
	});

	const rest = new REST({ version: '10' }).setToken(process.env.token);

	try {
		let clientId = `${process.env.client_id}`;
		let psid = `${process.env.privateserver_id}`;
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandData },
		).then(() => {
			console.log(`Slash Commands Are Now Ready To Use.`.brightGreen);
		});
		await rest.put(
			Routes.applicationGuildCommands(clientId, psid),
			{ body: privateData },
		).then(() => {
			console.log(`Private Slash Commands Are Now Ready To Use.`.brightGreen);
		});
	}
	catch (e) {
		console.error(e);
	}
};

deploy();