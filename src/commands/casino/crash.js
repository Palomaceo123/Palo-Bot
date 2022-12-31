const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;
        var result = Math.ceil(Math.random() * 12);

        Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
            if (data) {
                let money = parseInt(args[0]);
                if (!money) return client.errUsage({ usage: "crash [montant]", type: 'editreply' }, interaction);

                if (money > data.Money) return client.errNormal({ error: `Vous pariez plus que ce que vous avez !`, type: 'editreply' }, interaction);

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('crash_stop')
                            .setEmoji("🛑")
                            .setStyle('DANGER'),
                    )

                const disableRow = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('crash_stop')
                            .setEmoji("🛑")
                            .setStyle('DANGER')
                            .setDisabled(true),
                    )

                client.embed({
                    desc: `Crash démarré par ${user}・Réagit avec 🛑 pour arrêter`,
                    fields: [
                        {
                            name: `Multiplicateur`,
                            value: `1x`,
                            inline: true,
                        },
                        {
                            name: `Profit`,
                            value: `**0**`,
                            inline: true,
                        }
                    ],
                    components: [row],
                    type: 'editreply'
                }, interaction).then(msg => {
                    let multiplier = 1;
                    let index = 0;

                    let times = result + 1;
                    let timer = 2000 * times;

                    setInterval(() => {
                        if (index === result + 1) { return }
                        else if (index === result) {

                            Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
                                if (data) {
                                    data.Money -= money;
                                    data.save();
                                }
                            })

                            return client.embed({
                                title: `Résultats du crash de ${user}`,
                                desc: `${f} \n${msg}`,
                                edit: true,
                                fields: [
                                    {
                                        name: `Perte`,
                                        value: `**${money}**`,
                                        inline: false,
                                    }
                                ]
                            }, msg)

                        }
                        else {
                            index += 1;
                            multiplier += 0.20;

                            let calc = money * multiplier;
                            let profit = calc - money;

                            client.embed({
                                desc: `Crash démarré par ${user}・Réagit avec 🛑 pour arrêter`,
                                edit: true,
                                fields: [
                                    {
                                        name: `Multiplicateur`,
                                        value: `${multiplier.toFixed(1)}x`,
                                        inline: true,
                                    },
                                    {
                                        name: `Profit`,
                                        value: `**$${profit.toFixed(2)}**`,
                                        inline: true,
                                    }
                                ],
                                components: [row]
                            }, msg)

                            const filter = i => i.user.id === interaction.user.id;
                            interaction.channel.awaitMessageComponent({ filter, max: 1, time: timer })
                                .then(async i => {
                                    if (i.customId == "crash_stop") {
                                        i.deferUpdate();

                                        index = result + 1;

                                        Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
                                            if (data) {
                                                data.Money += parseInt(profit);
                                                data.save();
                                            }
                                        })

                                        return client.embed({
                                            desc: `Résultats du crash de${user}`,
                                            edit: true,
                                            fields: [
                                                {
                                                    name: `Profit`,
                                                    value: `**$${profit.toFixed(2)}**`,
                                                    inline: false,
                                                }
                                            ],
                                            components: [disableRow]
                                        }, msg)

                                    }
                                })
                        }
                    }, 2000)
                })

            }
            else {
                client.errNormal({ error: `Vous n'avez pas de ${client.emotes.economy.coins}!`, type: 'editreply' }, interaction);
            }
        })
}