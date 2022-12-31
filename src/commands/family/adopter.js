const Discord = require('discord.js');

const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {

    const target = interaction.options.getUser('utilisateur');
    const author = interaction.user;

    if (author.id == target.id) return client.errNormal({
        error: "Vous ne pouvez pas vous adopter vous-même",
        type: 'editreply'
    }, interaction);

    if (target.bot) return client.errNormal({
        error: "Vous ne pouvez pas adopter un bot",
        type: 'editreply'
    }, interaction);

    const familyMember = await Schema.findOne({ Guild: interaction.guild.id, User: target.id, Parent: author.id });
    const familyMember2 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Parent: target.id });
    const familyMember3 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Partner: target.id });

    if (familyMember || familyMember2 || familyMember3) {
        return client.errNormal({
            error: `Vous ne pouvez pas adopter un membre de votre famille !`,
            type: 'editreply'
        }, interaction);
    }

    const checkAdopt = await Schema.findOne({ Guild: interaction.guild.id, Children: target.username });
    if (checkAdopt) {
        return client.errNormal({
            error: `Cet utilisateur a déjà été adopté`,
            type: 'editreply'
        }, interaction);
    }

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('adopt_yes')
                .setEmoji('✅')
                .setStyle('SUCCÈS'),

            new Discord.MessageButton()
                .setCustomId('adopt_deny')
                .setEmoji('❌')
                .setStyle('DANGER'),
        );

    client.embed({
        title: `👪・Adoption`,
        desc: `${author} a demandé à ${target}  de l'adopter ! \N${target} cliquez sur l'un des boutons`,
        components: [row],
        content: `${target}`,
        type: 'editreply',
    }, interaction)

    const filter = i => i.user.id === target.id;

    interaction.channel.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 }).then(async i => {
        if (i.customId == "adopt_yes") {

            Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                if (data) {
                    data.Children.push(target.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: author.id,
                        Children: target.username
                    }).save();
                }
            })

            Schema.findOne({ Guild: interaction.guild.id, User: target.id }, async (err, data) => {
                if (data) {
                    data.Parent.push(author.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: target.id,
                        Parent: author.username
                    }).save();
                }
            })

            client.embed({
                title: `👪・Adoption - Approuvé`,
                desc: `${author} est maintenant l'heureux parent de ${target}! 🎉`,
                components: [],
                type: 'editreply'
            }, interaction);
        }

        if (i.customId == "adopt_deny") {
            client.embed({
                title: `👪・Adoption - Refusée`,
                desc: `${target} ne veulent pas être adoptés par ${author}`,
                components: [],
                type: 'editreply'
            }, interaction);
        }
    }).catch(() => {
        client.embed({
            title: `👪・Adoption - Refusée`,
            desc: `${target} n'a rien répondu ! L'adoption est annulée`,
            components: [],
            type: 'editreply'
        }, interaction);
    });
}

 