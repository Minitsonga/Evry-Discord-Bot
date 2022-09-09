const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { roleList } = require('../config.json')

const roleSelection = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roleselection')
            .setPlaceholder('Noting Selected')
            .addOptions([
                {
                    label: roleList[0].label,
                    description: roleList[0].descritpion,
                    value: roleList[0].id,

                },
                {
                    label: roleList[1].label,
                    description: roleList[1].descritpion,
                    value: roleList[1].id,

                },
                {
                    label: roleList[2].label,
                    description: roleList[2].descritpion,
                    value:roleList[2].id,

                },
                {
                    label: roleList[3].label,
                    description: roleList[3].descritpion,
                    value: roleList[3].id,

                },
                {
                    label: roleList[4].label,
                    description: roleList[4].descritpion,
                    value:roleList[4].id,

                },
            ]),
    );


module.exports = {

    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Shows you a list of roles you can have'),


    async execute(interaction) {
        await interaction.reply({ content: 'Choose the role you want', components: [roleSelection] });

    },
};