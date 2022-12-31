const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
        perms: ["MANAGE_CHANNELS"]
    }, interaction)

    if (perms == false) return;

    const name = interaction.options.getString('nom');

    if (name.toUpperCase() == "HELP") {
        return client.embed({
            title: `ℹ️・Options de nom de salon`,
            desc: `Ce sont les options de nom de salon : \n
            \`{emoji}\` - Emoji du salon
            \`{name}\` - Nom du salon`,
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            data.ChannelTemplate = name
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                ChannelTemplate: name
            }).save();
        }

        client.succNormal({
            text: `Le nom du salon a été défini avec succès`,
            fields: [
                {
                    name: `💬┆Nom`,
                    value: `${name}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    })
}

 