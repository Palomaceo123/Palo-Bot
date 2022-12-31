
module.exports = async (client, interaction, args) => {

    const user1 = interaction.options.getUser('utilisateur1');
    const user2 = interaction.options.getUser('utilisateur2');

    if (!user1 || !user2) return client.errUsage({ usage: "lovemeter [utilisateur1]", type: 'editreply' }, interaction);

    if (user1 == user2) return client.errNormal({ error: "Vous ne pouvez pas donner 2 noms identiques !", type: 'editreply' }, interaction);

    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `${client.emotes.normal.heart}・Indicateur d'amour`,
        desc: "Voyez combien vous correspondez !",
        fields: [
            {
                name: "Nom 1",
                value: `${user1}`,
                inline: true,
            },
            {
                name: "Nom 2",
                value: `${user2}`,
                inline: true,
            },
            {
                name: "Résultat",
                value: `**${user2}** and **${user2}** match **${result}%**`,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

     