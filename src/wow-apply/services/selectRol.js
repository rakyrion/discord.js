import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"


export const selectRolService = async (response) => {
	const roleMenu = new StringSelectMenuBuilder()
		.setCustomId('role')
		.setPlaceholder('Please, select your rol')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Tank')
				.setValue('Tank')
				.setEmoji('<:wowtank:1151832715784626176>'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Healer')
				.setValue('Healer')
				.setEmoji('<:wowheal:1151832713049952287>'),
			new StringSelectMenuOptionBuilder()
				.setLabel('DPS')
				.setValue('DPS')
				.setEmoji('<:wowdps:1151832708734009404>')
		)

	const row = new ActionRowBuilder()
		.addComponents(roleMenu)

	const result = await response.update({ content: `Your selection is ${response.values[0]}. Please, now select your role`, components: [row] });

	return result
}