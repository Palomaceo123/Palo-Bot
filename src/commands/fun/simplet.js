
module.exports = async (client, interaction, args) => {
    var result = Math.ceil(Math.random() * 100);

    client.embed({
        title: `👀・Taux de simplet`,
        desc: `Vous êtes a ${résult}% simplet !`,
        type: 'editreply'
    }, interaction)
}

 