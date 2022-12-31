const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autosetup')
        .setDescription('Laissez le bot installer automatiquement')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de configuration automatique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('logs')
                .setDescription('Définir les logs du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoice('Server logs', 'serverLogs')
                        .addChoice('Level logs', 'levelLogs')
                        .addChoice('Boost logs', 'boostLogs')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('fun')
                .setDescription('Définir les salons de divertissement du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoice('Birthdays', 'birthdays')
                        .addChoice('Chatbot', 'chatbot')
                        .addChoice('Reviews', 'reviews')
                        .addChoice('Suggestions', 'suggestions')
                        .addChoice('Starboard', 'starboard')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Définir les salons jeu du serveur')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoice('Counting', 'counting')
                        .addChoice('Guess the number', 'gtn')
                        .addChoice('Guess the word', 'gtw')
                        .addChoice('Word snake', 'wordsnake')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('welcome')
                .setDescription('Configurer le système de bienvenue')
                .addStringOption(option =>
                    option.setName('setup')
                        .setDescription('La configuration que vous souhaitez')
                        .setRequired(true)
                        .addChoice('Welcome channel', 'welcomechannel')
                        .addChoice('Welcome role', 'welcomerole')
                        .addChoice('Leave channnel', 'leavechannel')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('customvoice')
                .setDescription('Configurer les salons vocaux privés du serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ticketpanel')
                .setDescription('Configurer le panneau de tickets du serveur')
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const perms = await client.checkUserPerms({
            flags: [Discord.Permissions.FLAGS.ADMINISTRATOR],
            perms: ["ADMINISTRATOR"]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 