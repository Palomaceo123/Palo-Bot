const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('Jouer à des jeux')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help') 
                .setDescription('Obtenir des informations sur les commandes de la catégorie jeux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Posez une question au robot')
                .addStringOption(option => option.setName('question').setDescription('La question que vous voulez poser').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fasttype')
                .setDescription('Apprendre à taper plus vite'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('music-trivia')
                .setDescription('Jouer à un jeu de questions musicales')
                .addNumberOption(option => option.setName('nombre').setDescription('Le nombre de chansons').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('dé')
                .setDescription('Lancer un dé'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pfc')
                .setDescription('Jouez à pierre-papier-ciseaux contre le robot')
                .addStringOption(option =>
                    option.setName('option')
                        .setDescription('Choisissez ce que vous voulez')
                        .setRequired(true)
                        .addChoice('🪨 Pierre', 'pierre')
                        .addChoice('📃 Feuille', 'feuille')
                        .addChoice('✂️ Ciseaux', 'ciseaux')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('skipword')
                .setDescription('Sauter le mot en cours'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('snake')
                .setDescription('Jouer le jeu du serpent'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('trivia')
                .setDescription('Jouer au Trivia'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('willyoupressthebutton')
                .setDescription('Play Will You Press The Button'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('wouldyourather')
                .setDescription('Jouez au jeu Would You Rather'),
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        client.loadSubcommands(client, interaction, args);
    },
};

 