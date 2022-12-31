const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
    const promises = [
        client.shard.broadcastEval(client => client.guilds.cache.size),
        client.shard.broadcastEval(client => client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(client => client.channels.cache.size),
        client.shard.broadcastEval(client => client.voice.adapters.size)
    ];
    return Promise.all(promises)
        .then(async results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
            const totalVoice = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);

            const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

            client.embed({
                title: `<:uo_info:1015553303242883112>・Informations sur le bot`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [{
                    name: "<:uo_info:1015553303242883112> ┆ Information",
                    value: `Palo-Bot est un bot avec lequel vous pouvez gérer votre serveur entier ! Nous avons un grand bot avec de nombreuses options pour améliorer votre serveur !`,
                    inline: false,
                },
                {
                    name: "<:discord_bot:1012038552521031703> ┆ Nom du bot",
                    value: `${client.user.username}`,
                    inline: true,
                },
                {
                    name: "<:uo_add:1015553154533838879> ┆ ID du bot",
                    value: `${client.user.id}`,
                    inline: true,
                },
                {
                    name: "<:uo_BotsManeger:1015564324422553670> ┆ Shards",
                    value: `\`${client.options.shardCount}\` shards`,
                    inline: true,
                },
                {
                    name: "<:blue_crown:1012017210992115812> ┆ Propriétaire du bot",
                    value: `<@!781130817060864022> `,
                    inline: true,
                },
                {
                    name: "<:blue_hammers:1012018248163786763> ┆ Bot developer",
                    value: `<@!781130817060864022>`,
                    inline: true,
                },
                {
                    name: "<:uoBot_icon_slash:1015552999332003850> ┆ Commandes",
                    value: `\`${client.commands.size}\` commandes`,
                    inline: true,
                },
                {
                    name: "<:discord:1012017257158824027> ┆ Serveurs",
                    value: `\`${totalGuilds}\` serveurs`,
                    inline: true,
                },
                {
                    name: "<:discord:1012017257158824027> ┆ Serveurs sur ce shard",
                    value: `\`${client.guilds.cache.size}\` serveurs`,
                    inline: true,
                },
                {
                    name: "<:member:1012017243837702174> ┆ Membres",
                    value: `\`${totalMembers}\` membres`,
                    inline: true,
                },
                {
                    name: "<:uo_voice_channel:1015566886303440906> ┆ Salons connectés",
                    value: `\`${totalVoice}\` salons`,
                    inline: true,
                },
                {
                    name: "<:hashtag:1012018249854091415> ┆ Salons",
                    value: `\`${totalChannels}\` salons`,
                    inline: true,
                },
                {
                    name: "<:uo_clock:1015551740281622538> ┆ Créé",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: "<:uo_clock:1015551740281622538> ┆ Temps de fonctionnement",
                    value: `${duration}`,
                    inline: true,
                },
                {
                    name: "<:to_space:1012038751729491968> ┆ Vitesse de l'API :",
                    value: `\`${client.ws.ping}\`ms`,
                    inline: true,
                },
                {
                    name: "<:values:1012038654916579358> ┆ Mémoire du bot",
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
                    inline: true,
                },
                {
                    name: "<:cpu:1012038346199023687> ┆ Version du bot",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "<:cpu:1012038346199023687> ┆ Version de Node.js",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "<:cpu:1012038346199023687> ┆ Version de Discord.js",
                    value: `\`${Discord.version}\``,
                    inline: true,
                },
                {
                    name: "<:plane:1012017388440531015> ┆ Liens",
                    value: `Ajoutez-moi : [[ICI]](${client.config.discord.botInvite}) \nServeur de support : [[ICI]](${client.config.discord.serverInvite})`,
                    inline: false,
                }],
                type: 'editreply'
            }, interaction)
        })
}

 