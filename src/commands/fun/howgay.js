
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `🏳️‍🌈・Taux de gay`,
        desc: `Vous êtes a ${result}% gay !`,
        type: 'editreply'
    }, interaction)
}

 