import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('randomint')
		.setDescription('Replies with a random Int between 1 and 9999'),
	async execute(interaction) {
		const max = 9999
		const min = 1
		const randomInt = Math.floor(Math.random() * (max - min + 1) + min)

		await interaction.reply(`Here you got your random number: ${randomInt}`);
	},
};