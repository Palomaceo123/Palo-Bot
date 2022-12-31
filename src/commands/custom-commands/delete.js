const Discord = require('discord.js');
const Schema = require("../../database/models/customCommandAdvanced");

module.exports = async (client, interaction, args) => {
    const cmdname = interaction.options.getString('commande');

    Schema.findOne({ Guild: interaction.guild.id, Name: cmdname.toLowerCase() }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Name: cmdname }).then(async () => {
                const command = await interaction.guild.commands.cache.find((cmd => cmd.name == cmdname));
                await interaction.guild.commands.delete(command.id);

                client.succNormal({
                    text: `La commande a été supprimée avec succès`,
                    fields: [{
                        name: "🔧┆Commande",
                        value: `\`\`\`${cmdname}\`\`\``,
                        inline: true,
                    }],
                    type: 'editreply'
                }, interaction);
            })
        }
        else {
            client.errNormal({ error: "Impossible de trouver cette commande !", type: 'editreply' }, interaction);
        }
    })

}

 