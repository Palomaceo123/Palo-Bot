const Discord = require('discord.js');

const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"]
    }, interaction)

    if (perms == false) return;

    const role = interaction.options.getRole('role');

    if (!role) return client.errUsage({ usage: "deleteitem [role]", type: 'editreply' }, interaction);

    store.findOne({ Guild: interaction.guild.id, Role: role.id }, async (err, storeData) => {
        if (storeData) {

            var remove = await store.deleteOne({ Guild: interaction.guild.id, Role: role.id });

            client.succNormal({
                text: `Le rôle a été supprimé du magasin`,
                fields: [
                    {
                        name: `🛒┆Role`,
                        value: `${role}`
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {

            client.errNormal({
                error: `Ce rôle n'est pas dans le magasin !`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 