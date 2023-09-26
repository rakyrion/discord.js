import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputStyle } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('char-register-buttons')
		.setDescription('Register a new character (Form testing)'),
	async execute(interaction) {
		const dk = new ButtonBuilder()
			.setCustomId('dk')
			.setLabel('Death Knight')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowdeathknight:1151811873566642196>')

		const druid = new ButtonBuilder()
			.setCustomId('druid')
			.setLabel('Druid')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowdruid:1151811869955334144>')

		const evoker = new ButtonBuilder()
			.setCustomId('evoker')
			.setLabel('Evoker')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowevoker:1151811868218892339>')

		const hunter = new ButtonBuilder()
			.setCustomId('hunter')
			.setLabel('Hunter')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowhunter:1151811875365998633>')

		const dh = new ButtonBuilder()
			.setCustomId('dh')
			.setLabel('Demon Hunter')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowdemonhunter:1151811883947540560>')

		const mage = new ButtonBuilder()
			.setCustomId('mage')
			.setLabel('Mage')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowmage:1151811863324147772>')


		const paladin = new ButtonBuilder()
			.setCustomId('paladin')
			.setLabel('paladin')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowpaladin:1151811877584773171>')

		const priest = new ButtonBuilder()
			.setCustomId('priest')
			.setLabel('Priest')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowpriest:1151811879124074526>')

		const rogue = new ButtonBuilder()
			.setCustomId('rogue')
			.setLabel('Rogue')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowrogue:1151811881783263413>')

		const shaman = new ButtonBuilder()
			.setCustomId('shaman')
			.setLabel('Shaman')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowshaman:1151811860518142043>')

		const warlock = new ButtonBuilder()
			.setCustomId('warlock')
			.setLabel('Warlock')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowwarlock:1151811886904508417>')

		const warrior = new ButtonBuilder()
			.setCustomId('warrior')
			.setLabel('Warrior')
			.setStyle(ButtonStyle.Primary)
			.setEmoji('<:wowwarrior:1151811865538744461>')

		const row = new ActionRowBuilder()
			.addComponents(dk, evoker, druid, dh)

		const row2 = new ActionRowBuilder()
			.addComponents(hunter, mage, paladin, priest
			)

		const row3 = new ActionRowBuilder()
			.addComponents(rogue, shaman, warlock, warrior)

		await interaction.reply({
			content: 'WIP: Select a class to register your character',
			components: [row, row2, row3]
		});
	},
};