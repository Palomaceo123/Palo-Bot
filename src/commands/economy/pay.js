const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    const user = await interaction.guild.members.fetch(interaction.options.getUser('utilisateur'));
    let amount = interaction.options.getNumber('montant');
    
    if (amount < 0) return client.errNormal({ error: `Vous ne pouvez pas payer de l'argent négatif !`, type: 'editreply' }, interaction);

    if (user.id == interaction.user.id) {
        return client.errNormal({
            error: "Vous ne pouvez pas vous verser de l'argent à vous-même !",
            type: 'editreply'
        }, interaction)
    }

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({ error: `Tu n'as pas autant d'argent !`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.save();

            client.addMoney(interaction, user, money);

            client.succNormal({
                text: `Vous avez bien payé un utilisateur !`,
                fields: [
                    {
                        name: `👤┆Utilisateur`,
                        value: `$${user}`,
                        inline: true
                    },
                    {
                        name: `${client.emotes.economy.coins}┆Montant`,
                        value: `$${amount}`,
                        inline: true
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({ text: `Tu n'as pas d'argent !`, type: 'editreply' }, interaction);
        }
    })
}

 