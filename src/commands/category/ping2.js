import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping2')
		.setDescription('Replies with Pong! From Discord.js'),
	async execute(interaction) {
		await interaction.reply('Pong! From Discord.js');
	},
};