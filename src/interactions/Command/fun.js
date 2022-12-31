const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Exécuter des commandes amusantes du bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie fun')
        )

        // Meme Commands

        .addSubcommandGroup((group) =>
            group
                .setName('meme')
                .setDescription('Voir toutes les commandes de memes amusants du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('confused')
                        .setDescription('Réagissez avec un meme de Nick Young confus')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('intelligence')
                        .setDescription('Voir à quel point vous êtes intelligent')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('dinochrome')
                        .setDescription('Dinosaure dans chrome')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('epicgamerrate')
                        .setDescription('Découvrez à quel point vous êtes un joueur épique.')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('howgay')
                        .setDescription('Voir à quel point tu es gay')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('simplet')
                        .setDescription('Voir à quel point vous êtes simplet')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('puant')
                        .setDescription('Voir à quel point tu es puant')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('rickroll')
                        .setDescription('Obtenir un rickroll')
                )
        )

        // User Commands

        .addSubcommandGroup((group) =>
            group
                .setName('utilisateur')
                .setDescription('Voir toutes les commandes amusantes pour l utilisateur du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hack')
                        .setDescription('Piratez vos amis ou vos ennemis !')
                        .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('hug')
                        .setDescription('Faire un câlin à un utilisateur')
                        .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('kill')
                        .setDescription('Tuer un utilisateur')
                        .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('lovemeter')
                        .setDescription('Voir dans quelle mesure vous vous allez avec quelqu un')
                        .addUserOption(option => option.setName('utilisateur1').setDescription('Sélectionnez un utilisateur').setRequired(true))
                        .addUserOption(option => option.setName('utilisateur2').setDescription('Sélectionnez un utilisateur').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('sudo')
                        .setDescription('Dites quelque chose comme quelqu un d autre')
                        .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                        .addStringOption(option => option.setName('texte').setDescription('Entrez un texte').setRequired(true))
                )
        )

        // Text Commands

        .addSubcommandGroup((group) =>
            group
                .setName('texte')
                .setDescription('Découvrez toutes les commandes de texte amusantes du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('ascii')
                        .setDescription('Faire un texte en ascii')
                        .addStringOption(option => option.setName('texte').setDescription('Entrez un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('gif')
                        .setDescription('Rechercher un gif')
                        .addStringOption(option => option.setName('texte').setDescription('Entrez un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('reverse')
                        .setDescription('Inversez votre texte')
                        .addStringOption(option => option.setName('texte').setDescription('Entrez un texte').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('say')
                        .setDescription('Faites dire au robot quelque chose')
                        .addStringOption(option => option.setName('texte').setDescription('Entrez un texte').setRequired(true))
                )
        )

        // Extra Commands

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('Voir toutes les commandes supplémentaires amusantes du bot')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('token')
                        .setDescription('Obtenir mon token')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('horlogemondiale')
                        .setDescription('Affiche la ou les horloges mondiales')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('noel')
                        .setDescription('Voir le nombre de jours avant Noël')
                )
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

 