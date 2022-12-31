const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    fetch(
        `https://some-random-api.ml/bottoken`
    )
        .then((res) => res.json()).catch({})
        .then(async (json) => {

            client.embed({
                title: `🤖・Token du Bot`,
                desc: json.token,
                type: 'editreply',
            }, interaction);
        }).catch({})

}

 