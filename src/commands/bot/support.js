const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel("Serveur de support")
                .setURL(client.config.discord.serverInvite)
                .setStyle("LINK"),
        );

    client.embed({
        title: `<:uo_BotSupport:1015565238017470514>・Support`,
        desc: `Rendez votre serveur encore meilleur avec notre bot !`,
        image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
        url: client.config.discord.serverInvite,
        components: [row],
        type: 'editreply'
    }, interaction)
}

 