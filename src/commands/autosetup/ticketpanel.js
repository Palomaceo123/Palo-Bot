const Discord = require('discord.js');

const ticketSchema = require("../../database/models/tickets");

module.exports = async (client, interaction, args) => {
    ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, ticketData) => {
        if (ticketData) {
            const channel = interaction.guild.channels.cache.get(ticketData.Channel);
            const button = new Discord.MessageButton()
                .setCustomId('Bot_openticket')
                .setLabel("Tickets")
                .setStyle('PRIMARY')
                .setEmoji('🎫')

            const row = new Discord.MessageActionRow()
                .addComponents(button)

            client.embed({
                title: "Tickets",
                desc: "Cliquez sur 🎫 pour ouvrir un ticket",
                components: [row]
            }, channel)

            client.succNormal({
                text: `Le Panel de tickets a été configuré avec succès !`,
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Exécutez d'abord la configuration du ticket !`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 