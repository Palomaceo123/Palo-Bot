const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
                name: "📢┆Traduction",
                value: 'Le bot est actuelement en cours de traduction et de développement donc si vous trouvez des bugs ou des erreurs de traductions veuillez rejoindre [ce serveur](https://discord.gg/invite/QaebC7kuQX) pour les signaler',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 