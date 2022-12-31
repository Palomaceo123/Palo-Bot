const Discord = require('discord.js');

const Counting = require("../../database/models/countChannel");
const GTN = require("../../database/models/guessNumber");
const GTW = require("../../database/models/guessWord");
const WordSnake = require("../../database/models/wordsnake");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');

    if (choice == "counting") {
        interaction.guild.channels.create("counting", {
            type: "GUILD_TEXT"
        }).then((ch) => {
            client.embed({
                title: `🔢・Compter`,
                desc: `C'est le début du compteur ! Le premier chiffre est **1**`
            }, ch)

            client.createChannelSetup(Counting, ch, interaction)
        })
    }

    if (choice == "gtn") {
        interaction.guild.channels.create("guess-the-number", {
            type: "GUILD_TEXT"
        }).then((ch) => {
            client.embed({ 
                title: `🔢・Deviner le nombre`,
                desc: `Devinez le nombre entre **1** et **10.000** !`
            }, ch)

            client.createChannelSetup(GTN, ch, interaction)
        })
    }

    if (choice == "gtw") {
        interaction.guild.channels.create("guess-the-word", {
            type: "GUILD_TEXT"
        }).then((ch) => {
            var word = "start";
            var shuffled = word.split('').sort(function () { return 0.5 - Math.random() }).join('');

            client.embed({ 
                title: `🔠・Devinez le mot`,
                desc: `Mettez les lettres dans le bon ordre !`,
                fields: [
                    {
                        name: `❇️ ┆ Mot`,
                        value: `${shuffled.toLowerCase()}`
                    }
                ],
            }, ch)
            
            client.createChannelSetup(GTW, ch, interaction)
        })
    }

    if (choice == "wordsnake") {
        interaction.guild.channels.create("word-snake", {
            type: "GUILD_TEXT"
        }).then((ch) => {
            client.createChannelSetup(WordSnake, ch, interaction)
        })
    }
}

 