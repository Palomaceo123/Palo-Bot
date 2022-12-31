const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {

    let amount = interaction.options.getNumber('montant');
    let user = interaction.user;

    if (!amount) return client.errUsage({ usage: "depot [montant]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Entrez un numéro valide !", type: 'editreply' }, interaction);

    if (amount < 0) return client.errNormal({ error: `Vous ne pouvez pas déposer de l'argent négatif ! Utilisez /retirer.`, type: 'editreply' }, interaction);

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            if (data.Money < parseInt(amount)) return client.errNormal({ error: `Tu n'as pas autant d'argent !`, type: 'editreply' }, interaction);

            let money = parseInt(amount);

            data.Money -= money;
            data.Bank += money;
            data.save();

            client.succNormal({
                text: `Vous avez déposé de l'argent dans votre banque !`,
                fields: [
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
            client.errNormal({ text: `Vous n'avez pas d'argent à déposer !`, type: 'editreply' }, interaction);
        }
    })
}
 