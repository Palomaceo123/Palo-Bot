const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('family')
        .setDescription('Créer une famille à Bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie famille')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('adopter')
                .setDescription('Adopter un membre')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimez votre famille !'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('renier')
                .setDescription('Renier un de vos enfants ou un parent')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('divorce')
                .setDescription('Divorcez de votre partenaire')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('family')
                .setDescription(`Voyez qui est dans la famille de quelqu'un !`)
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(false)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('épouser')
                .setDescription('Épouser un membre')
                .addUserOption(option => option.setName('utilisateur').setDescription('Sélectionnez un utilisateur').setRequired(true)),
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

 