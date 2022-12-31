const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
  const perms = new Discord.Permissions(role.permissions.bitfield).toArray();

  client.embed({
    title: `ℹ️・Role information`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    desc: `Information about the role ${role}`,
    fields: [
      {
        name: 'ID du rôle :',
        value: `${role.id}`,
        inline: true
      },
      {
        name: 'Nom du rôle :',
        value: `${role.name}`,
        inline: true
      },
      {
        name: 'Mentionnable :',
        value: `${role.mentionable ? 'Yes' : 'No'}`,
        inline: true
      },
      {
        name: 'Permissions du rôle :',
        value: `${perms.join(', ')}`
      }
    ],
    type: 'editreply'
  }, interaction)
}

   