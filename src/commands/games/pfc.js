const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const option = interaction.options.getString("option");

    let options = ["rock", "paper", "scissors"];
    const result = options[Math.floor(Math.random() * options.length)];

    switch (option) {
        case "rock":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, J'ai gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, Tu as gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, C'est un match nul !`,
                type: 'editreply'
            }, interaction);
            break;

        case "paper":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, C'est un match nul !`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, J'ai gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, Tu as gagné !`,
                type: 'editreply'
            }, interaction);
            break;

        case "scissors":
            if (result == "paper") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, Tu as gagné !`,
                type: 'editreply'
            }, interaction);

            if (result == "scissors") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, C'est un match nul !`,
                type: 'editreply'
            }, interaction);

            if (result == "rock") return client.embed({
                title: `${client.emotes.normal.paper}・Pierre, feuille, ciseaux`,
                desc: `J'ai ${result}, J'ai gagné !`,
                type: 'editreply'
            }, interaction);
            break;
    }
}

 