const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var antwoorden = [
        "Oui !",
        "Malheureusement pas",
        "Vous avez tout à fait raison !",
        "Non, désolé.",
        "Je suis d'accord",
        "Aucune idée !",
        "Je ne suis pas si intelligent...",
        "Mes sources disent que non !",
        "C'est certain",
        "Vous pouvez compter sur elle",
        "Probablement pas.",
        "Tout indique que c'est non.",
        "Aucun doute",
        "Absolument",
        "Je ne sais pas."
    ];
    var resultaat = Math.floor((Math.random() * antwoorden.length));

    client.embed({
        title: `${client.emotes.normal.ball}・8ball`,
        desc: `Voir la réponse à votre question !`,
        fields: [
            {
                name: `💬┆Votre question`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `🤖┆Réponse de Bot`,
                value: `\`\`\`${antwoorden[resultaat]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}

 