const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.errNormal({
        error: `Le concours est malheureusement terminé ! Vous ne pouvez plus participer`
    }, member).catch(() => { });
};