const Discord = require('discord.js');
const Schema = require("../../database/models/customCommandAdvanced");

module.exports = async (client, interaction, args) => {
    const cmdname = interaction.options.getString('commande');
    const cmdresponce = interaction.options.getString('texte');

    Schema.findOne({ Guild: interaction.guild.id, Name: cmdname.toLowerCase() }, async (err, data) => {
        if (data) {
            client.errNormal({ error: "Ce nom de commande est déjà ajouté dans les commandes personnalisées de la guilde !", type: 'editreply' }, interaction);
        }
        else {
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('customSelect')
                        .setPlaceholder('❌┆Rien de sélectionné')
                        .addOptions(
                            [
                                {
                                    label: `Embed`,
                                    description: `Envoyer un message dans un embed`,
                                    value: "command-embed",
                                },
                                {
                                    label: `Normal`,
                                    description: `Envoyez un message habituel`,
                                    value: "command-normal",
                                },
                                {
                                    label: `Private`,
                                    description: `Envoyer le message en MP`,
                                    value: "command-dm",
                                },
                            ]
                        )
                );

            client.embed({ desc: `Quelle action doit être attachée à cette commande ?`, components: [row], type: 'editreply' }, interaction)

            const filter = i => i.user.id === interaction.user.id;

            interaction.channel.awaitMessageComponent({ filter, max: 1 }).then(async i => {
                if (i.customId == 'customSelect') {
                    if (i.values[0] === "command-embed") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Embed"
                        }).save();

                        client.succNormal({
                            text: `La commande a été ajoutée avec succès`,
                            fields: [{
                                name: "🔧┆Commande",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-normal") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Normal"
                        }).save();

                        client.succNormal({
                            text: `La commande a été ajoutée avec succès`,
                            fields: [{
                                name: "🔧┆Commande",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-dm") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "DM"
                        }).save();

                        client.succNormal({
                            text: `La commande a été ajoutée avec succès`,
                            fields: [{
                                name: "🔧┆Commande",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            type: 'editreply'
                        }, i);
                    }

                    await interaction.guild.commands.create({
                        name: cmdname,
                        description: 'Commande de serveur personnalisée'
                    });
                }
            })
        }
    })

}

 