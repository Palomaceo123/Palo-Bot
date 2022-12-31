const Discord = require('discord.js');
const ms = require('ms');

module.exports = async (client, interaction, args) => {
    const messageID = interaction.options.getString('message');

    client.giveawaysManager.pause(messageID).then(() => {
        client.succNormal({ 
            text: `Giveaway mis en pause !`, 
            type: 'editreply' 
        }, interaction);
    }).catch((err) => {
        client.errNormal({ 
            error: `Je n'arrive pas à trouver le giveaway pour ${messageID}!`, 
            type: 'editreply' 
        }, interaction)
    });
}

 