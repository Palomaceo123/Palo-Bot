const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const gchannel = interaction.options.getChannel('salon');
    const duration = interaction.options.getString('durée');
    const winnerCount = interaction.options.getNumber('gagnants');
    const prize = interaction.options.getString('lot');

    client.giveawaysManager.start(gchannel, {
        duration: ms(duration),
        prize: `${client.emotes.normal.gift} - ${prize}`,
        lastChance: {
            enabled: true,
            content: `${client.emotes.normal.error} ***DERNIÈRE CHANCE DE PARTICIPER !** ${client.emotes.normal.error}`,
            threshold: 5000,
            embedColor: '#FF0000'
        },
        pauseOptions: {
            isPaused: true,
            content: '⚠️ **CE GIVEAWAY EST EN PAUSE !** ⚠️',
            unPauseAfter: null,
            embedColor: '#FFFF00'
        },
        winnerCount: parseInt(winnerCount),
        hostedBy: interaction.user,
        thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
        isDrop: true,
        messages: {
            giveaway: `${client.emotes.normal.party} **GIVEAWAY** ${client.emotes.normal.party}`,
            giveawayEnded: `${client.emotes.normal.party} **LE GIVEAWAY EST TERMINÉ** ${client.emotes.normal.party}`,
            drawing: `${client.emotes.normal.clock} - Se termine à : **{timestamp}**!`,
            dropMessage: `Soyez le premier à réagir avec 🥳`,
            winMessage: "Félicitations à {winners} ! Vous venez de gagner **{this.prize}** !",
            embedFooter: "Giveaway !",
            embedColor: client.config.colors.normal,
            noWinner: "Concours annulé, pas assez de participants. \n",
            hostedBy: `${client.emotes.normal.party} - Organisé par : {this.hostedBy}`,
            winners: `🏆 - Winner(s)`,
            endedAt: "Se termine à :",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            },
        },

    }).then((gData) => {
        client.succNormal({ 
            text: `Le giveaway a été drop dans ${gchannel}`,
            type: 'ephemeraledit'
        }, interaction);
    });
}

 