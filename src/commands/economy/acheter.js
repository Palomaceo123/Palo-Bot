const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
    const storeData = await store.find({ Guild: interaction.guild.id });
    if (storeData.length == 0) return client.errNormal({
        error: `Aucun magasin n'a été trouvé sur ce serveur`,
        type: 'editreply'
    }, interaction);

    let labels = [];

    storeData.forEach(d => {
        const role = interaction.guild.roles.cache.get(d.Role);

        const generated = {
            label: `${role.name.substr(0, 24)}.`,
            value: role.id,
        }

        return labels.push(generated);
    });

    const select = await client.generateSelect(`economyBuy`, labels);

    client.embed({
        title: `🛒・Le magasin de ${interaction.guild.name}`,
        desc: `Choisissez un article dans le menu pour l'acheter`,
        components: [sélectionnez],
        type: 'editreply'
    }, interaction)

    const filter = i => {
        i.deferUpdate();
        return i.user.id === interaction.user.id;
    };

    interaction.channel.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', time: 60000 }).then(async i => {
        const role = i.values[0];
        const buyPerson = i.guild.members.cache.get(i.user.id);

        const data = await Schema.findOne({ Guild: i.guild.id, User: i.user.id });
        const checkStore = await store.findOne({ Guild: i.guild.id, Role: role });

        if (parseInt(checkStore.Amount) > parseInt(data.Money)) return client.errNormal({
            error: `Tu n'as pas assez d'argent pour acheter ça !`,
            type: 'editreply'
        }, i);

        client.removeMoney(i, i.user, parseInt(checkStore.Amount));

        buyPerson.roles.add(role);

        client.succNormal({
            text: `L'achat a été réalisé avec succès`,
            fields: [
                {
                    name: `📘┆Item`,
                    value: `<@&${role}>`
                }
            ],
            type: 'editreply'
        }, i);
    })
}

 