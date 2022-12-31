const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = async (client, interaction, args) => {
  const invite = interaction.options.getString('invite');

  const verifyFlags = {
    0: `Sans restriction`,
    1: `L'adresse électronique du compte doit être vérifiée.`,
    2: `Il faut être inscrit sur Discord depuis plus de 5 minutes.`,
    3: `Il être membre du serveur depuis plus de 10 minutes.`,
    4: `Il doit avoir un numéro de téléphone vérifié`
  }

  axios.get(`https://discord.com/api/v9/invites/${encodeURIComponent(invite)}`).catch(async () => {
    return client.errNormal({
      error: "Je n'ai pas pu trouver le serveur",
      type: 'editreply'
    }, interaction)
  }).then(async (raw) => {
    const { data } = raw;
    if (!data) return;

    let guildTimestamp = (await toUnix(data.guild.id)).timestamp;
    let channelTimestamp = (await toUnix(data.channel.id)).timestamp;

    return client.embed({
      title: `📨・Informations sur l'invitation`,
      thumbnail: `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=1024`,
      image: `https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}.png?size=1024`,
      fields: [
        {
          name: "Nom du serveur",
          value: `${data.guild.name}`,
          inline: true,
        },
        {
          name: "ID du serveur",
          value: `${data.guild.id}`,
          inline: true,
        },
        {
          name: "Serveur créé",
          value: `<t:${guildTimestamp}>`,
          inline: true,
        },
        {
          name: "Nom du salon",
          value: `${data.channel.name}`,
          inline: true,
        },
        {
          name: "ID du salon",
          value: `${data.channel.id}`,
          inline: true,
        },
        {
          name: "Salon créée",
          value: `<t:${channelTimestamp}>`,
          inline: true,
        },
        {
          name: "Images du serveur",
          value: `${data.guild.icon && data.guild.banner && data.guild.splash ? `` : `No data`}
          ${data.guild.icon ? `[Server Icon](https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=4096)` : ``}
          ${data.guild.banner ? `[Server Banner](https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}.png?size=4096)` : ``}`,
          inline: true,
        },
        {
          name: "Niveau de vérification du serveur",
          value: `${verifyFlags[data.guild.verification_level]}`,
          inline: true,
        },
      ],
      type: 'editreply'
    }, interaction)
  })
}

const toUnix = (snowflake) => {
  const EPOCH = 1420070400000;
  const BINARY = idToBinary(snowflake.toString()).toString(2).padStart(64, '0');
  let timestamp = parseInt(((parseInt(BINARY.substring(0, 42), 2) + EPOCH).toString().substring(0, (parseInt(BINARY.substring(0, 42), 2) + EPOCH).toString().length - 3)));
  let timestampms = parseInt(BINARY.substring(0, 42), 2) + EPOCH;
  const date = new Date(timestampms);
  const data = {
    timestamp,
    timestampms,
    date
  }
  return data
}

const idToBinary = (num) => {
  let bin = '';
  let high = parseInt(num.slice(0, -10)) || 0;
  let low = parseInt(num.slice(-10));
  while (low > 0 || high > 0) {
    bin = String(low & 1) + bin;
    low = Math.floor(low / 2);
    if (high > 0) {
      low += 5000000000 * (high % 2);
      high = Math.floor(high / 2);
    }
  }
  return bin;
}

   