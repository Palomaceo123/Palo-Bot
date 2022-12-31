const axios = require('axios');

module.exports = async (client, interaction, args) => {

    const user = interaction.options.getUser('utilisateur');
    const url = 'https://some-random-api.ml/animu/hug';

    if (!user) return client.errUsage({ usage: "hug [mentionner l'utilisateur]", type: 'editreply' }, interaction);

    let response, data;
    try {
        response = await axios.get(url);
        data = response.data;
    } catch (e) {
        return client.errNormal({ error: "Une erreur s'est produite !", type: 'editreply' }, interaction);
    }

    client.embed({
        title: `${interaction.user.tag} fait un calin a ${user.tag}`,
        image: `${data.link}`,
        type: 'editreply'
    }, interaction);
}

     