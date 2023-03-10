const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.edit(messageID, {
        setEndTimestamp: Date.now()
    }).then(() => {
        client.succNormal({
            text: `Le concours se terminera dans moins de ${client.giveawaysManager.options.updateCountdownEvery / 1000} secondes`,
            type: 'editreply'
        }, interaction);
    }).catch((err) => {
        client.errNormal({
            error: `Je n'arrive pas à trouver le giveaway pour ${messageID}!`,
            type: 'editreply'
        }, interaction)
    });
}

 