const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Organisez un giveaway sur votre serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie giveaway')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Lance un concours')
                .addChannelOption(option => option.setName('salon').setDescription('Salon où le concours doit avoir lieu').setRequired(true).addChannelType(ChannelType.GuildText))
                .addStringOption(option => option.setName('durée').setDescription('Durée du concours').setRequired(true))
                .addNumberOption(option => option.setName('gagnants').setDescription('Le nombre de gagnants du concours').setRequired(true))
                .addStringOption(option => option.setName('lot').setDescription('Le prix à gagner').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('drop')
                .setDescription('Lance un drop')
                .addChannelOption(option => option.setName('salon').setDescription('Salon où le concours doit avoir lieu').setRequired(true).addChannelType(ChannelType.GuildText))
                .addStringOption(option => option.setName('durée').setDescription('Durée du concours').setRequired(true))
                .addNumberOption(option => option.setName('gagnants').setDescription('Le nombre de gagnants du concours').setRequired(true))
                .addStringOption(option => option.setName('lot').setDescription('Le prix à gagner').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Relancer un tirage au sort')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('Met fin à un giveaway')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('Modifier la durée du giveaway')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Supprime a giveaway')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Met en pause un giveaway')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Continue un giveaway')
                .addStringOption(option => option.setName('message').setDescription('L ID du message du giveaway').setRequired(true)),
        ),

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

 