const Discord = require('discord.js');

const Schema = require("../../database/models/verify");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"]
    }, interaction)

    if (perms == false) return;

    const boolean = interaction.options.getBoolean('activer');
    const channel = interaction.options.getChannel('salon');
    const role = interaction.options.getRole('role');

    if (boolean == true) {
        const data = await Schema.findOne({ Guild: interaction.guild.id });
        if (data) {
            data.Channel = channel.id;
            data.Role = role.id
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                Channel: channel.id,
                Role: role.id
            }).save();
        }

        client.succNormal({
            text: `Le panneau de vérification a été créé avec succès`,
            fields: [
                {
                    name: `📘┆Salon`,
                    value: `${channel} (${channel.name})`,
                    inline: true
                },
                {
                    name: `📛┆Rôle`,
                    value: `${role} (${role.name})`,
                    inline: true
                }
            ],
            type: 'editreply'
        }, interaction);

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('Bot_verify')
                    .setEmoji('✅')
                    .setStyle('SUCCÈS'),
            );

        client.embed({
            title: `${interaction.guild.name}・Vérification`,
            desc: `Cliquez sur le bouton pour vous vérifier et accéder qu reste du serveur`,
            components: [row]
        }, channel)
    }
}

 