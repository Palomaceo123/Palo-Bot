const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    const type = interaction.options.getString("type");

    if (type == "argent") {
        const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Money', 'descending']]));

        if (!rawLeaderboard) return client.errNormal({ 
            error: "Aucune donnée trouvée !",
            type: 'editreply'
        }, interaction);

        const lb = rawLeaderboard.map(e => `**${rawLeaderboard.findIndex(i => i.Guild === interaction.guild.id && i.User === e.User) + 1}** | <@!${e.User}> - ${client.emotes.economy.coins} \`$${e.Money}\``);

        await client.createLeaderboard(`🪙・Argent - ${interaction.guild.name}`, lb, interaction);
    }
    else if (type == "banque") {
        const rawLeaderboard = await Schema.find({ Guild: interaction.guild.id }).sort(([['Bank', 'descending']]));

        if (!rawLeaderboard) return client.errNormal({ 
            error: "No data found!",
            type: 'editreply'
        }, interaction);

        const lb = rawLeaderboard.map(e => `**${rawLeaderboard.findIndex(i => i.Guild === interaction.guild.id && i.User === e.User) + 1}** | <@!${e.User}> - ${client.emotes.economy.bank} \`$${e.Bank}\``);

        await client.createLeaderboard(`🏦・Banque - ${interaction.guild.name}`, lb, interaction);
    }
}

 