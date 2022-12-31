const Discord = require('discord.js');

const inviteMessages = require("../../database/models/inviteMessages");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"]
    }, interaction)

    if (perms == false) return;

    const message = interaction.options.getString('message');

    if (message.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Options du message de bienvenue`,
            desc: `Options de message de bienvenue: \n
            \`{user:username}\` - Nom d'utilisateur de l'utilisateur
            \`{user:discriminator}\` - Discriminateur de l'utilisateur
            \`{user:tag}\` - Tag de l'utilisateur
            \`{user:mention}\` - Mention de l'utilisateur

            \`{inviter:username}\` - Nom d'utilisateur de l'invitant
            \`{inviter:discriminator}\` - Discriminateur de l'invitant
            \`{inviter:tag}\` - Tag de l'invitant
            \`{inviter:mention}\` - Mentionner l'invitant
            \`{inviter:invites}\` - Nombre d'invitations de l'invitant
            \`{inviter:invites:left}\` - Invitations restantes de l'invitant
                    
            \`{guild:name}\` - Nom du serveur
            \`{guild:members}\` - Nombre de membres du serveur`,
            type: 'editreply'
        }, interaction)
    }

    if (message.toUpperCase() == "DEFAULT") {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = null;
                data.save();

                client.succNormal({
                    text: `Message de bienvenue supprimé !`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
    else {
        inviteMessages.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.inviteJoin = message;
                data.save();
            }
            else {
                new inviteMessages({
                    Guild: interaction.guild.id,
                    inviteJoin: message
                }).save();
            }

            client.succNormal({
                text: `Le message de bienvenue a été défini avec succès`,
                fields: [
                    {
                        name: `💬┆Message`,
                        value: `${message}`,
                        inline: true
                    },
                ],
                type: 'editreply'
            }, interaction)
        })
    }
}

 