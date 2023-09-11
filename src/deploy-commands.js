import 'dotenv/config'
import { REST, Routes } from 'discord.js'
import fs from 'node:fs'
import * as path from 'path'
import { fileURLToPath } from 'url';



const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const commands = [];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	// Get all commands file from the folder
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Push data from each command file (SlashCommandBuilder)
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		await import(filePath)
			.then(module => {
				const command = module.default
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			})
			.catch(error => {
				console.error(`Error importing module at ${filePath}:`, error)
			})
	}
}

// INIT REST CONNECTION TO DISCORD
const rest = new REST().setToken(TOKEN);

// DEPLOY COMMANDS
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
