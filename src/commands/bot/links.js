const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId('Bot-linkspanel')
                .setPlaceholder('❌┆Rien de sélectionné')
                .addOptions([
                    {
                        label: `Serveur de support`,
                        description: `Rejoindre le serveur de support`,
                        emoji: "❓",
                        value: "support-linkspanel",
                    },
                    {
                        label: `Inviter le bot`,
                        description: `Invitez le bot sur votre serveur`,
                        emoji: "📨",
                        value: "invite-linkspanel",
                    },
//                    {
//                        label: `Serveur communautaire`,
//                        description: `Rejoignez le serveur communautaire !`,
//                        emoji: "🌍",
//                        value: "community-linkspanel",
//                    },
                ]),
        );

    client.embed({
        title: `🔗・Liens`,
        desc: `Accédez à tous les liens du bot ! Choisissez le lien dont vous avez besoin dans le menu ci-dessous`,
        image: "https://cdn.discordapp.com/attachments/843487478881976381/874694194474668052/Bot_banner_invite.jpg",
        components: [row],
        type: 'editreply'
    }, interaction)
}

 