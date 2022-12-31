const Discord = require('discord.js');
const ms = require("ms");

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('utilisateur');
    if (!user) return client.errUsage({ usage: "rob [mentionner un utilisateur]", type: 'editreply' }, interaction);

    if (user.bot) return client.errNormal({
        error: "Tu voles un robot !",
        type: 'editreply'
    }, interaction);

    try {
        let timeout = 600000;

        Schema2.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, dataTime) => {
            if (dataTime && dataTime.Rob !== null && timeout - (Date.now() - dataTime.Rob) > 0) {
                let time = (dataTime.Rob / 1000 + timeout / 1000).toFixed(0);
                return client.errWait({ time: time, type: 'editreply' }, interaction);
            }
            else {
                Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, authorData) => {
                    if (authorData) {
                        if (authorData.Money < 200) return client.errNormal({ error: `Vous avez besoin d'au moins 200 pièces dans votre portefeuille pour voler quelqu'un !`, type: 'editreply' }, interaction);

                        Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, targetData) => {
                            if (targetData) {
                                console.log(targetData.Money)
                                if (targetData = undefined || !targetData || targetData.Money == 0 || targetData.Money < 0) {
                                    return client.errNormal({ error: `${user.user.username} n'a rien que vous puissiez voler !`, type: 'editreply' }, interaction);
                                }

                                if (dataTime) {
                                    dataTime.Rob = Date.now();
                                    dataTime.save();
                                }
                                else {
                                    new Schema2({
                                        Guild: interaction.guild.id,
                                        User: interaction.user.id,
                                        Rob: Date.now()
                                    }).save();
                                }

                                random = Math.floor(Math.random() * 100) + 1;

                                if (targetData.Money < random) {
                                    random = targetData.Money;

                                    authorData.Money += targetData.Money;
                                    authorData.save();

                                    client.removeMoney(interaction, user, targetData.Money);
                                }
                                else {
                                    authorData.Money += random;
                                    authorData.save();

                                    client.removeMoney(interaction, user, random);
                                }

                                client.succNormal({
                                    text: `Tu as volé un utilisateur et tu t'es enfui !`,
                                    fields: [
                                        {
                                            name: `👤┆Utilisateur`,
                                            value: `${user}`,
                                            inline: true
                                        },
                                        {
                                            name: `${client.emotes.economy.coins}┆Volé`,
                                            value: `$${random}`,
                                            inline: true
                                        }
                                    ],
                                    type: 'editreply'
                                }, interaction);
                            }
                            else {
                                return client.errNormal({ error: `${user.user.username} n'a rien que vous puissiez voler !`, type: 'editreply' }, interaction);
                            }
                        })
                    }
                })
            }
        })
    }
    catch { }
}

 