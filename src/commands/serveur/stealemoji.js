const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.Permissions.FLAGS.MANAGE_EMOJIS],
    perms: ["MANAGE_EMOJIS"]
  }, interaction)
  
  if (perms == false) return;

  const rawEmoji = interaction.options.getString('emoji');
  const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

  if (parsedEmoji.id) {
    const extension = parsedEmoji.animated ? ".gif" : ".png";
    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

    interaction.guild.emojis.create(url, parsedEmoji.name).then(emoji => {
      client.succNormal({
        text: `Emoji ajouté avec succès au serveur`,
        fields: [
          {
            name: "😛┇Emoji",
            value: `${emoji}`,
            inline: true,
          },
          {
            name: "😜┇Nom de l'emoji",
            value: `${emoji.name}`,
            inline: true,
          },
          {
            name: "😝┇Identifiant de l'Emoji",
            value: `${emoji.id}`,
            inline: true,
          },
        ],
        type: 'editreply'
      }, interaction)
    })
  }
  else {
    client.errNormal({
      error: "Emoji non trouvé !",
      type: 'editreply'
    }, interaction)
  }
}

   