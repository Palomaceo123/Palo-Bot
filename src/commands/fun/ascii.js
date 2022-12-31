const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = async (client, interaction, args) => {
    const msg = interaction.options.getString('texte');

    if (msg.length > 2000) return client.errNormal({ error: "Veuillez fournir un texte de moins de 2000 caractères !", type: 'editreply' }, interaction);

    figlet.text(msg, function (err, data) {

        if (err) {
            return client.errNormal({ error: "Quelque chose a mal tourné !", type: 'editreply' }, interaction);
        }

        client.embed({
            title: '💬・Ascii',
            desc: `\`\`\` ${data} \`\`\``,
            type: 'editreply',
        }, interaction);
    })
}

 