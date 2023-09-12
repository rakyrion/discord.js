import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('deathroll')
		.setDescription('Get a sequence of random numbers between 1 and 9999 untill is 1'),
	async execute(interaction) {
		const maxInitial = 9999
		const min = 1

		let playerTurn = true
		let max = maxInitial

		let randomInt = Math.floor(Math.random() * (max - min + 1) + min)
		await interaction.reply(`Your roll: ${randomInt}`);
		playerTurn = false
		while (randomInt > 1) {
			max = randomInt
			randomInt = Math.floor(Math.random() * (max - min + 1) + min)
			await (async () => {
				return new Promise(resolve => setTimeout(resolve, 1000));
			})()
			if (randomInt === 1) {
				const message = playerTurn ? `Your roll is: ${randomInt}. Ha ha ha, I won!!` : `My roll is: ${randomInt}. Damn it! I lost :(`
				await interaction.followUp(message)
			} else {
				await interaction.followUp(`${playerTurn ? 'Your roll: ' : 'My roll: '}${randomInt}`);
				playerTurn ? playerTurn = false : playerTurn = true
			}
		}
	},
};