import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('defer')
		.setDescription('Defer test of 1 minute'),
	async execute(interaction) {
		await(async () => {
			return new Promise(resolve => setTimeout(resolve, 6000));
		})()
		await interaction.editReply('This is a deferred message to avoid discord 3 seconds discord error.');
	},
};