const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `・Informations sur le propriétaire`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<:blue_crown:1012017210992115812> ┆ Nom du propriétaire",
            value: `Palomaceo`,
            inline: true,
        },
        {
            name: "<:discord:1012017257158824027> ┆ Tag discord",
            value: `!                      Palomaceo#4651`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 