const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {    
    const text = interaction.options.getString('texte');

    if (text.length >= 2000) return client.errNormal({ 
        error: "Vous ne pouvez pas utiliser plus de 2000 caractères !", 
        type: 'editreply' 
    }, interaction);

    await interaction.channel.send({ content: client.removeMentions(text) }).then(() => {
        client.succNormal({
            text: `Message envoyé avec succès`,
            type: 'ephemeraledit'
        }, interaction)
    })
}

 