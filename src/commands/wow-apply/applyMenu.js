import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputStyle } from 'discord.js';

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


		await interaction.reply({
			content: 'Select a class to start your apply',
			components: [row]
		});
	},
};