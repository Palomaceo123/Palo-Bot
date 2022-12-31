const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('casino')
        .setDescription('Jouer au jeu de casino')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenez des informations sur les commandes de la catégorie casino')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('blackjack')
                .setDescription('Jouez à un jeu de blackjack pour gagner de l argent')
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crash')
                .setDescription('Plus de risques, plus de récompenses')
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roulette')
                .setDescription('Play roulette')
                .addStringOption(option => option.setName('couleur').setDescription('Entrez une couleur hex').setRequired(true))
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('slots')
                .setDescription('Jouer aux machines à sous')
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
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

 