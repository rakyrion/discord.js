import { Client, GatewayIntentBits, SlashCommandBuilder, Collection, Events } from 'discord.js';
import 'dotenv/config'
import fs from 'node:fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from 'path';

// TO GET MESSAGES CONTENT FROM COLLECTORS IS MANDATORY TO SET THE INTENT AND PRIVACY ON DEV PORTAL
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] });
const TOKEN = process.env.TOKEN

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection()

const __dirname = dirname(fileURLToPath(import.meta.url));

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		import(filePath)
			.then(module => {
				const command = module.default
				if ('data' in command && 'execute' in command) {
					client.commands.set(command.data.name, command);
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			})
			.catch(error => {
				console.error(`Error importing module at ${filePath}:`, error);
			});
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		if (['defer', 'deathroll'].some(commandName => commandName === interaction.command)) {
			await interaction.deferReply();
			await command.execute(interaction);
		} else {
			await command.execute(interaction);

		}
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



client.login(TOKEN);