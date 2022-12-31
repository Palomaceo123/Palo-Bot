const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('utilisateur');
    const text = interaction.options.getString('texte');

    if (text.length >= 2000) return client.errNormal({ error: "Vous ne pouvez pas utiliser plus de 2000 caractères !", type: 'editreply' }, interaction);

    interaction.channel.createWebhook(user.username, {
        avatar: user.displayAvatarURL(),
    }).then(async (_webhook) => {
        await _webhook.send(client.removeMentions(text));
        _webhook.delete();

        client.succNormal({
            text: `Le message sudo a été envoyé !`, 
            type: 'ephemeraledit' 
        }, interaction);
    });
}

 