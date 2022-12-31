const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('family_delete')
                .setEmoji('✅')
                .setStyle('SUCCÈS'),

            new Discord.MessageButton()
                .setCustomId('family_stop')
                .setEmoji('❌')
                .setStyle('DANGER'),
        );

    client.embed({
        title: `${client.emotes.normal.error}・Réinitialisation de la famille`,
        desc: `Tu es sûr de vouloir réinitialiser ta famille ?`,
        components: [row],
        type: 'editreply'
    }, interaction);

    const filter = i => i.user.id === interaction.user.id;

    interaction.channel.awaitMessageComponent({ filter, time: 60000 })
        .then(async i => {
            if (i.customId == "family_delete") {
                i.message.delete();

                var remove = await Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.author.id });
                const parent = await Schema.findOne({ Guild: interaction.guild.id, Parent: interaction.author.id });
                const partner = await Schema.findOne({ Guild: interaction.guild.id, Partner: interaction.author.id });

                if (parent) {
                    parent.Parent = " ";
                    parent.save();
                }

                if (partner) {
                    partner.Partner = " ";
                    partner.save();
                }

                client.succNormal({ text: `Votre famille a été supprimée !`, type: 'editreply' }, interaction);
            }

            if (i.customId == "family_stop") {
                i.message.delete();
            }
        })
        .catch((err) => {
            console.log(err)
            client.errNormal({ error: "Le temps est écoulé ! Chargement de secours annulé !", type: 'editreply' }, interaction);
        });
}

 