const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  let verifLevels = {
    "NONE": "None",
    "LOW": "Low",
    "MEDIUM": "Medium",
    "HIGH": "(╯°□°）╯︵  ┻━┻",
    "VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
  }

  let region = {
    "brazil": `:flag_br: `,
    "eu-central": `:flag_eu: `,
    "singapore": `:flag_sg: `,
    "us-central": `:flag_us: `,
    "sydney": `:flag_au: `,
    "us-east": `:flag_us: `,
    "us-south": `:flag_us: `,
    "us-west": `:flag_us: `,
    "eu-west": `:flag_eu: `,
    "vip-us-east": `:flag_us: `,
    "europe": `:flag_gb:`,
    "amsterdam": `:flag_nl:`,
    "hongkong": `:flag_hk: `,
    "russia": `:flag_ru: `,
    "southafrica": `:flag_za: `
  }

  let tier = {
    "TIER_1": `1`,
    "TIER_2": `2`,
    "TIER_3": `3`,
    "NONE": `0`,
  }

  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `ℹ️・Informations sur le serveur`,
    desc: `Informations sur le serveur ${interaction.guild.name}`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    image: interaction.guild.bannerURL({ size: 1024 }),
    fields: [
      {
        name: "Nom du serveur :",
        value: `${interaction.guild.name}`,
        inline: true,
      },
      {
        name: "Identifiant du serveur :",
        value: `${interaction.guild.id}`,
        inline: true,
      },
      {
        name: "Propriétaire :",
        value: `<@!${interaction.guild.ownerId}>`,
        inline: true
      },
      {
        name: "Niveau de vérification :",
        value: `${verifLevels[interaction.guild.verificationLevel]}`,
        inline: true
      },
      {
        name: "Niveau de boost :",
        value: `Tier ${tier[interaction.guild.premiumTier] || 'None'}`,
        inline: true
      },
      {
        name: "Nombre de boosts :",
        value: `${interaction.guild.premiumSubscriptionCount || '0'} boosts`,
        inline: true
      },
      {
        name: "Créé le :",
        value: `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`,
        inline: true
      },
      {
        name: "Membres :",
        value: `${interaction.guild.memberCount} membres!`,
        inline: true
      },
      {
        name: "Bots :",
        value: `${members.filter(member => member.user.bot).size} bots!`,
        inline: true
      },
      {
        name: "Salon textuels :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size} salons!`,
        inline: true
      },
      {
        name: "Salon vocaux :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size} salons !`,
        inline: true
      },
      {
        name: "Stage Channels:",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size} salons !`,
        inline: true
      },
      {
        name: "Salon d'informations :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_NEWS').size} salons !`,
        inline: true
      },
      {
        name: "Fils publics :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size} fils !`,
        inline: true
      },
      {
        name: "Fils privés :",
        value: `${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size} fils !`,
        inline: true
      },
      {
        name: "Roles:",
        value: `${interaction.guild.roles.cache.size} roles!`,
        inline: true
      },
      {
        name: "Emoji count:",
        value: `${interaction.guild.emojis.cache.size} emoji's`,
        inline: true
      },
      {
        name: "Sticker count:",
        value: `${interaction.guild.stickers.cache.size} stickers`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   