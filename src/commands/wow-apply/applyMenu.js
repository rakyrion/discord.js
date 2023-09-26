import { ActionRowBuilder, MessageCollector, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { selectRolService } from '../../wow-apply/services/selectRol.js';

export default {
	data: new SlashCommandBuilder()
		.setName('char-register')
		.setDescription('Register a new character (Form testing)'),
	async execute(interaction) {
		const menu = new StringSelectMenuBuilder()
			.setCustomId('class')
			.setPlaceholder('Please, select your class:')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Death Knight')
					.setValue('Death Knight')
					.setEmoji('<:wowdeathknight:1151811873566642196>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Druid')
					.setValue('Druid')
					.setEmoji('<:wowdruid:1151811869955334144>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Evoker')
					.setValue('Evoker')
					.setEmoji('<:wowevoker:1151811868218892339>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Hunter')
					.setValue('Hunter')
					.setEmoji('<:wowhunter:1151811875365998633>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Demon Hunter')
					.setValue('Demon Hunter')
					.setEmoji('<:wowdemonhunter:1151811883947540560>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Mage')
					.setValue('Mage')
					.setEmoji('<:wowmage:1151811863324147772>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Paladin')
					.setValue('Paladin')
					.setEmoji('<:wowpaladin:1151811877584773171>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Priest')
					.setValue('Priest')
					.setEmoji('<:wowpriest:1151811879124074526>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Rogue')
					.setValue('Rogue')
					.setEmoji('<:wowrogue:1151811881783263413>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Shaman')
					.setValue('Shaman')
					.setEmoji('<:wowshaman:1151811860518142043>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Warlock')
					.setValue('Warlock')
					.setEmoji('<:wowwarlock:1151811886904508417>'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Warrior')
					.setValue('Warrior')
					.setEmoji('<:wowwarrior:1151811865538744461>'),

			)


		const row = new ActionRowBuilder()
			.addComponents(menu)


		const response = await interaction.reply({
			content: 'Select a class to start your apply',
			components: [row]
		});

		const collectorFilter = i => i.user.id === interaction.user.id;

		try {
			const classConfirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

			const response2 = await selectRolService(classConfirmation)

			const rolConfirmation = await response2.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

			const channel = rolConfirmation.channel

			await rolConfirmation.reply('Please, now write your item level.')

			const messageCollectorFilter = m => m.author.id === interaction.user.id
			const collector = channel.createMessageCollector({
				filter: messageCollectorFilter, time: 60000, max: 1
			})

			let gs
			let armoryLink
			collector.on('collect', message => {
				gs = message.content
				collector.stop()
			})

			collector.on('end', async collected => {
				if (!gs) await channel.send('No item level message sent. Apply not submited, please try again.')
				else {
					const armoryCollector = channel.createMessageCollector({ filter: messageCollectorFilter, time: 60000, max: 1 })
					await channel.send('Now, send your armory link')

					armoryCollector.on('collect', async message => {
						armoryLink = message.content

						const summary = `Your apply has been submited.
						Here is the summary of your application:
						Class: ${classConfirmation.values[0]}
						Role: ${rolConfirmation.values[0]}
						Item Level: ${gs}
						Armory link: ${armoryLink}`

						armoryCollector.stop()

						await channel.send(summary)
					})

					armoryCollector.on('end', async collected => {
						if (!armoryLink) await channel.send('No armory link received. Apply not submited. Please, try again.')
					})
				}
			})
		} catch (e) {
			console.log(e)
			await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
		}
	},
};