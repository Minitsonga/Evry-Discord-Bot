const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const button = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL('https://info-evry.fr/')
            .setLabel('Info-Evry')
            .setStyle('LINK'),

        new MessageButton()
            .setURL('https://ecampus.paris-saclay.fr/')
            .setLabel('Ecampus')
            .setStyle('LINK'),

        new MessageButton()
            .setURL('http://portailmathinfo.blogspot.com/')
            .setLabel('Portail Math Info')
            .setStyle('LINK'),

        new MessageButton()
            .setURL('https://drive.google.com/drive/folders/168FWXFRcTvqhPUSjJeY_36b0veZ2olWa?usp=sharing')
            .setLabel('Google Drive')
            .setStyle('LINK'),

        new MessageButton()
            .setURL('https://t.me/info_evry')
            .setLabel('Groupe Telegram')
            .setStyle('LINK'),

    );

module.exports = {

    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Donne tous les liens les plus importants'),


    async execute(interaction) {
        return interaction.reply({ content: 'Retrouves tous les liens les plus importants :', components: [button] });
    },
};