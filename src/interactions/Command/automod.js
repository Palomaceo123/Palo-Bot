const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v9');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Gérer la modération automatqiue')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de configuration automatique')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('Activer/désactiver le plugin anti-invitation')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez oui ou non').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('Activer/désactiver le plugin anti-lien')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez oui ou non').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('Activer/désactiver le plugin antispam')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionnez oui ou non').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Ajouter un salon où il est permis d envoyer des liens')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Que voulez-vous faire avec le salon ?')
                        .setRequired(true)
                        .addChoice('Ajouter', 'ajouter')
                        .addChoice('Retirer', 'retirer')
                )
                .addChannelOption(option => option.setName('salon').setDescription('Sélectionnez un salon').setRequired(true).addChannelType(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('Gérer la blacklist')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('list')
                        .setDescription('Afficher la liste noire complète')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('ajouter')
                        .setDescription('Ajouter un mot à la liste noire')
                        .addStringOption(option => option.setName('mot').setDescription('Le mot pour la liste noire').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('retirer')
                        .setDescription('Retirer un mot de la liste noire')
                        .addStringOption(option => option.setName('mot').setDescription('Le mot pour la liste noire').setRequired(true))
                )
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

 