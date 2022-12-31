const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Ajustez le bot à votre goût')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie configuration')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levels')
                .setDescription('Activer/désactiver les niveaux')
                .addBooleanOption(option => option.setName('choix').setDescription('Activé ou désactivé').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setcolor')
                .setDescription('Définir une couleur pour le message personnalisé')
                .addStringOption(option => option.setName("couleur").setDescription("Entrez une couleur hex").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setverify')
                .setDescription('Configurer le panneau de vérification')
                .addBooleanOption(option => option.setName('activer').setDescription('Oui ou non').setRequired(true))
                .addChannelOption(option => option.setName('salon').setDescription('Sélectionnez un salon').setRequired(true).addChannelType(ChannelType.GuildText))
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('setchannelname')
                .setDescription('Définir un nom de salon personnalisé pour les statistiques du serveur')
                .addStringOption(option => option.setName("nom").setDescription("Entrez un nom pour le salon ou envoyez HELP pour les arguments.").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('levelmessage')
                .setDescription('Définir le message de niveau bot')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message pour les niveaux ou envoyez HELP pour les arguments.").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcomemessage')
                .setDescription('Définir le message de bienvenue')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message de bienvenue ou envoyez HELP pour les arguments.").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leavemessage')
                .setDescription('Définir le message de départ')
                .addStringOption(option => option.setName("message").setDescription("Entrez un message de départ ou envoyez HELP pour les arguments.").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketmessage')
                .setDescription('Définir le message de ticket du bot')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Type de message du ticket')
                        .setRequired(true)
                        .addChoice('ouverture', 'ouvert')
                        .addChoice('fermeture', 'fermé')
                )
                .addStringOption(option => option.setName("message").setDescription("Entrez un message pour le ticket").setRequired(true))
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

 