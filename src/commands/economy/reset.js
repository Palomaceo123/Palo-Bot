const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");
const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {

    client.checkPerms({
        flags: [Discord.Permissions.FLAGS.ADMINISTRATOR],
        perms: ["ADMINISTRATOR"]
    }, interaction)


    const row = new Discord.MessageActionRow() 
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('eco_go')
                .setEmoji('✅')
                .setStyle('SUCCÈS'),

            new Discord.MessageButton()
                .setCustomId('eco_stop')
                .setEmoji('❌')
                .setStyle('DANGER'),
        );

    client.embed({
        title: `⏰・Réinitialisation de l'économie`,
        desc: `Vous êtes sûr de vouloir réinitialiser l'économie ?`,
        components: [row],
        type: 'editreply',
    }, interaction)

    const filter = i => i.user.id === interaction.user.id;

    interaction.channel.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 }).then(async i => {
        if (i.customId == "eco_go") {
            var remove = await Schema.deleteMany({ Guild: interaction.guild.id });
            var remove2 = await Schema2.deleteMany({ Guild: interaction.guild.id });
            var remove3 = await store.deleteMany({ Guild: interaction.guild.id });

            client.succNormal({
                text: `L'économie a été réinitialisée avec succès dans cette guilde !`,
                components: [],
                type: 'editreply'
            }, interaction);
        }

        if (i.customId == "eco_stop") {
            client.errNormal({
                error: `La réinitialisation de l'économie a été annulée !`,
                components: [],
                type: 'editreply'
            }, interaction);
        }
    })
        .catch(() => {
            client.errNormal({
                error: "Le temps est écoulé ! Annulation de la réinitialisation de l'économie !",
                type: 'editreply'
            }, interaction);
        });
}

 