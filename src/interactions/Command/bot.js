const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informations sur le bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Obtenir des informations sur le bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Voir le ping du bots en ms')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('changelogs')
                .setDescription('Obtenir les changelogs du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('links')
                .setDescription('Recevez un message avec tous les liens du bot')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('owner')
                .setDescription('Obtenir des informations sur le propriétaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('support')
                .setDescription('Obtenir une invitation pour le serveur de support')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('uptime')
                .setDescription('Afficher le temps de fonctionnement du bot')
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

 