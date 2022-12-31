const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 6);

    client.embed({
        title: `🎲・Dé`,
        desc: `Tu as obtenu le chiffre  ${result}`,
        type: 'editreply'
    }, interaction);
}

 