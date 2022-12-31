const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

const Schema = require("../../database/models/music");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('custom-commands')
        .setDescription('Créer des commandes personnalisées')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur la catégorie des commandes personnalisées'),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Créer une commande personnalisée')
                .addStringOption(option => option.setName('commande').setDescription('Le nom de la commande').setRequired(true))
                .addStringOption(option => option.setName('texte').setDescription('La réponse de la commande').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprimer une commande personnalisée')
                .addStringOption(option => option.setName('commande').setDescription('Le nom de la commande').setRequired(true)),
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const perms = await client.checkUserPerms({
            flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
            perms: ["MANAGE_MESSAGES"]
        }, interaction)

        if (perms == false) return;
        
        client.loadSubcommands(client, interaction, args);
    },
};

 