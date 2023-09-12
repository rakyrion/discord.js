import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('deathroll')
		.setDescription('Get a sequence of random numbers between 1 and max number provided (default 100).')
		.addStringOption(option =>
			option.setName('max')
				.setDescription('The max number to start the deathroll.'))
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to challenge')
				.setRequired(false)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const targetName = target.globalName !== undefined ? `${target.globalName}'s roll is:` : 'My roll is:'
		const winMessage = target.globalName ? `Congrats, ${target.globalName}, you won!`: 'Ha ha ha, I won!!'
		const lostMessage = target.globalName ? `Sorry, ${target.globalName}, you lost.` : 'Damn it! I lost :('

		const authorUsername = `${interaction.user.globalName}'s roll is:`

		const maxInitial = interaction.options.getString('max') ?? 100;
		const min = 1

		let playerTurn = true
		let max = maxInitial

		let randomInt = Math.floor(Math.random() * (max - min + 1) + min)
		await interaction.reply(`${authorUsername} ${randomInt}`);
		playerTurn = false
		while (randomInt > 1) {
			max = randomInt
			randomInt = Math.floor(Math.random() * (max - min + 1) + min)
			await (async () => {
				return new Promise(resolve => setTimeout(resolve, 1000));
			})()
			if (randomInt === 1) {
				const message = playerTurn ? `${authorUsername} ${randomInt}. ${winMessage}` : `${targetName} ${randomInt}. ${lostMessage}`
				await interaction.followUp(message)
			} else {
				await interaction.followUp(`${playerTurn ? authorUsername : targetName} ${randomInt}`);
				playerTurn ? playerTurn = false : playerTurn = true
			}
		}
	},
};