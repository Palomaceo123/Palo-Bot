const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serveur')
        .setDescription('Gérer le serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('saloninfo')
                .setDescription('Obtenir des informations sur un salon')
                .addChannelOption(option => option.setName('salon').setDescription('Sélectionnez un salon').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('membres')
                .setDescription('Voir combien de membres il y a dans ce serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('oldestmembre')
                .setDescription('Obtenir la date de création du compte le plus ancien dans le serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('roleinfo')
                .setDescription('Obtenir des informations sur un rôle')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('Obtenir toutes les informations sur le serveur actuel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stealemoji')
                .setDescription('Voler un emoji')
                .addStringOption(option => option.setName('emoji').setDescription('Entrez un emoji à voler').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('youngestmembre')
                .setDescription('Obtenir la plus jeune date de création de compte dans le serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('utilisateurinfo')
                .setDescription('Obtenir toutes les informations sur un utilisateur')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('inviteinfo')
                .setDescription('Obtenir toutes les informations sur une invitation')
                .addStringOption(option => option.setName('invite').setDescription('Entrez un code d invitation').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojis')
                .setDescription('Voir les emojis du serveur')
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

 