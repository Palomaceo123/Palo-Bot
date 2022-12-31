const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.ADMINISTRATOR],
        perms: ["ADMINISTRATOR"]
    }, interaction)

    if (perms == false) return;

    const user = interaction.options.getUser('utilisateur');
    let amount = interaction.options.getNumber('montant');

    if (!user || !amount) return client.errUsage({ usage: "addmoney [utilisateur] [montant]", type: 'editreply' }, interaction);

    if (isNaN(amount)) return client.errNormal({ error: "Entrez un numéro valide !", type: 'editreply' }, interaction);

    if (user.bot) return client.errNormal({
        error: "Vous ne pouvez pas ajouter de l'argent à un bot !",
        type: 'editreply'
    }, interaction);

    client.addMoney(interaction, user, parseInt(amount));

    setTimeout(() => {
        Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
            if (data) {

                client.succNormal({
                    text: `Ajout d'argent à un utilisateur !`,
                    fields: [
                        {
                            name: `👤┆Utilisateur`,
                            value: `<@!${user.id}>`,
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
                client.errNormal({ error: `Cet utilisateur n'a pas d'argent !`, type: 'editreply' }, interaction);
            }
        }, 500)
    })
}
 