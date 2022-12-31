const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthdays')
        .setDescription('Afficher ou enregistrer un anniversaire')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie "anniversaires".')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Vérifiez votre date d anniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimez votre anniversaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Voir tous les anniversaires')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Définissez votre date d anniversaire')
                .addNumberOption(option => option.setName('jour').setDescription('Le numéro du jour qui correspond à votre anniversaire').setRequired(true))
                .addNumberOption(option => option.setName('mois').setDescription('Le numéro du mois correspondant à votre date de naissance').setRequired(true))
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        client.loadSubcommands(client, interaction, args);
    },
};

 