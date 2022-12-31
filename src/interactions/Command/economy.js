const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy')
        .setDescription('Jouez le jeu de l économie dans votre serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie économie')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('additem')
                .setDescription('Ajouter un  rôle au magasin')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('addmoney')
                .setDescription('Ajouter de l argent à un utilisateur')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('money')
                .setDescription('Consultez votre solde')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('réclamer')
                .setDescription('Réclamer de l argent')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('acheter')
                .setDescription('Acheter des articles dans le magasin Bot')

        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reset')
                .setDescription('Remettre l économie du serveur à zéro')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('crime')
                .setDescription('Commettre un crime')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('daily')
                .setDescription('Réclamer votre argent quotidien')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('deleteitem')
                .setDescription('Supprimer un rôle du magasin')
                .addRoleOption(option => option.setName('role').setDescription('Sélectionnez un rôle').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('depot')
                .setDescription('Déposer de l argent à la banque')
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pecher')
                .setDescription('Pêchez du poisson')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('chasser')
                .setDescription('Chassez des animaux')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('monthly')
                .setDescription('Réclamer votre argent mensuel')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pay')
                .setDescription('Payer un utilisateur')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('removemoney')
                .setDescription('Retirer de l argent à un utilisateur')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('voler')
                .setDescription('Voler un utilisateur')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('magasin')
                .setDescription('Montrer le magasin de ce serveur')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('weekly')
                .setDescription('Réclamer votre argent hebdomadaire')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('retirer')
                .setDescription('Retirer votre argent')
                .addNumberOption(option => option.setName('montant').setDescription('Entrez un montant').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('work')
                .setDescription('Aller au travail')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Consultez le classement économique')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Le type de classement que vous souhaitez')
                        .setRequired(true)
                        .addChoice('Argent', 'argent')
                        .addChoice('Banque', 'banque')
                )
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

 