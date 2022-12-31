const Discord = require('discord.js');

const Schema = require("../../database/models/functions");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"]
    }, interaction)

    if (perms == false) return;

    const boolean = interaction.options.getBoolean('choix');

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if (data) {
        data.Levels = boolean;
        data.save();
    }
    else {
        new Schema({
            Guild: interaction.guild.id,
            Levels: boolean,
        }).save();
    }

    client.succNormal({
        text: `Les niveaux sont maintenant **${boolean ? 'activé' : 'désactivé'}** dans cette guilde.`,
        type: 'editreply'
    }, interaction);
}

 