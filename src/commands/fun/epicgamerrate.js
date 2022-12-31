
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `🎮・Taux de joueurs épiques`,
        desc: `Vous êtes ${result}% un joueur épique !`,
        type: 'editreply'
    }, interaction)
}

 