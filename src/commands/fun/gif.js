const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const msg = interaction.options.getString('texte');

    if (!msg) return client.errUsage({ usage: "gif [texte]", type: 'editreply' }, interaction);

    var giphy = require('giphy-api')(process.env.GIPHY_TOKEN);

    giphy.random(msg, function (err, res) {
        client.embed({
            title: `📺・${msg} Gif`,
            image: `https://media1.giphy.com/media/${res.data.id}/giphy.gif`,
            type: 'editreply'
        }, interaction);
    });
}

 