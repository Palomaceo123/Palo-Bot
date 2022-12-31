const Discord = require('discord.js');
const {
    joinVoiceChannel,
    VoiceConnectionStatus,
    entersState
} = require('@discordjs/voice');
const fs = require('fs');
const TriviaPlayer = require('../../assets/utils/TriviaPlayer.js');

module.exports = async (client, interaction, args) => {

    const number = interaction.options.getNumber('nombre');

    if (!number || isNaN(number)) return client.errUsage({ usage: "music-trivia [nombre de chiffres]", type: 'editreply' }, interaction);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({ error: `Vous n'êtes pas dans un salon vocal !`, type: 'editreply' }, interaction);

    if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return client.errNormal({ error: `Vous n'êtes pas dans le même salon vocal !`, type: 'editreply' }, interaction);

    if (interaction.client.playerManager.get(interaction.guild.id)) return client.errNormal({ error: `Vous ne pouvez pas l'utiliser pendant la lecture d'un morceau !`, type: 'editreply' }, interaction);

    if (interaction.client.triviaManager.get(interaction.guildId)) return client.errNormal({ error: `Il y a déjà un trivia en jeu !`, type: 'editreply' }, interaction);

    const jsonSongs = fs.readFileSync(
        '../../config/data/musictrivia.json',
        'utf8'
    );
    const videoDataArray = JSON.parse(jsonSongs).songs;

    const randomLinks = getRandom(videoDataArray, parseInt(number));
    interaction.client.triviaManager.set(
        interaction.guildId,
        new TriviaPlayer()
    );

    const triviaPlayer = interaction.client.triviaManager.get(
        interaction.guildId
    );

    randomLinks.forEach(link => {
        triviaPlayer.queue.push({
            url: link.url,
            singer: link.singer,
            title: link.title,
            channel
        });
    });

    const membersInChannel = interaction.member.voice.channel.members;

    membersInChannel.each(user => {
        if (user.user.bot) return;
        triviaPlayer.score.set(user.user.username, 0);
    });

    handleSubscription(interaction, triviaPlayer, client);
}

async function handleSubscription(interaction, player, client) {
    const queue = player.queue;
    let voiceChannel = queue[0].channel;

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });

    player.textChannel = interaction.channel;
    player.passConnection(connection);
    try {
        await entersState(player.connection, VoiceConnectionStatus.Ready, 10000);
    } catch (error) {
        connection.destroy();
        return client.emit("voiceError", error);
    }

    player.process(player.queue);

    client.embed({
        title: `🎶・Music Quiz`,
        desc: `Préparez-vous ! Votez pour sauter la chanson en entrant le mot 'skip'. Bonne chance ! \n\n**Chansons en attente :** ${queue.length} \n**Temps de lecture:** 30 secondes`,
        type: 'editreply'
    }, interaction);
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError('getRandom: Plus d éléments pris que disponibles !');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[(x in taken) ? taken[x] : x];
        taken[x] = (--len in taken) ? taken[len] : len;
    }
    return result;
}

 