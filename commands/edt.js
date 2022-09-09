const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { default: fetch } = require('node-fetch');

let week = getWeek(new Date());
// Get year (and check if the week number is between two years)
const year = new Date().getMonth() === 0 && week >= 52 ? new Date().getFullYear() - 1 : new Date().getFullYear();

// Get week number
function getWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edt')
        .setDescription("Affiche l'emploi du temps.")
        .addStringOption(option =>
            option.setName('annee')
                .setDescription('Choisez votre année')
                .setRequired(true)
                .addChoice('L1', 'L1')
                .addChoice('L2', 'L2')
                .addChoice('L3', 'L3')
                .addChoice('M1', 'M1')
                .addChoice('M2', 'M2'))
        .addStringOption(option =>
            option.setName('groupe')
                .setDescription('Choisez votre groupe')
                .setRequired(true)
                .addChoice('G1', 'G1')
                .addChoice('G2', 'G2')
                .addChoice('G3', 'G3')
                .addChoice('G4', 'G4')
                .addChoice('G5', 'G5')
                .addChoice('G6', 'G6')
                .addChoice('SA', 'SA')
                .addChoice('SR', 'SA')
                .addChoice('SDVI', 'SDVI')
                .addChoice('ISDV', 'ISDV')
                .addChoice('MI', 'MI')
                .addChoice('MA', 'MA'))
        .addIntegerOption(option =>
            option.setName('semaine')
                .setDescription('Ajouter ou retirer des semaines')),

    async execute(interaction) {
        const choice = interaction.options.getString('annee') + ' ' + interaction.options.getString('groupe');
        const level = interaction.options.getString('annee');
        const groupe = interaction.options.getString('groupe');
        const weekOption = interaction.options.getInteger('semaine');
        let URL = null;
        let stop = false;
        //let obj = null;


        week = week + weekOption;
        
        const response = await fetch(`https://api.info-evry.fr/v1/edt/${level}/${groupe}/${week}/${year}`);
        const body = await response.json().catch(function (error) {
            if (error.message) {
                stop = true;
                return interaction.reply({ content: 'Filière inexistante', ephemeral: true });
            }
        });

        if (!stop) {
            URL = body.url;

            const embed = new MessageEmbed()
                .setTitle(`Semaine ${week} - Année ${year} - Filière: ${choice} `)
                .setImage(URL)
            return interaction.reply({ content: 'Ton emploi du temps', embeds: [embed] });
        }
    },
};