const Discord = require('discord.js');

const Schema = require('../../database/models/channelList');

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString('type');
    const channel = interaction.options.getChannel('channel');

    if (type == "ajouter") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `Le salon ${channel} est déjà dans la base de données !`,
                        type: 'editreply'
                    }, interaction);
                }

                data.Channels.push(channel.id);
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channels: channel.id
                }).save();
            }
        })

        client.succNormal({
            text: `Le salon a été ajouté à la liste blanche !`,
            fields: [
                {
                    name: `<:uo_BotEvent:1015565719330627584> ┆ Salon`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
    else if (type == "retirer") {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                if (!data.Channels.includes(channel.id)) {
                    return client.errNormal({
                        error: `Le salon ${channel} n'existe pas dans la base de données !`,
                        type: 'editreply'
                    }, interaction);
                }

                const filtered = data.Channels.filter((target) => target !== channel.id);

                await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                    Guild: interaction.guild.id,
                    Channels: filtered
                });


                client.succNormal({
                    text: `Le salon a été retiré de la liste blanche !`,
                    fields: [
                        {
                            name: `<:uo_BotEvent:1015565719330627584> ┆ Salon`,
                            value: `${channel} (${channel.name})`
                        }
                    ],
                    type: 'editreply'
                }, interaction);
            }
            else {
                return client.errNormal({
                    error: `Cette guilde n'a pas de données !`,
                    type: 'editreply'
                }, interaction);
            }
        })
    }
}

 