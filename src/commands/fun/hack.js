const fetch = require("node-fetch");
const generator = require('generate-password');

module.exports = async (client, interaction, args) => {

    const password = generator.generate({
        length: 10,
        symbols: true,
        numbers: true
    });

    const user = interaction.options.getUser('utilisateur');

    if (!user) return client.errUsage({ usage: "hack [mentionner un utilisateur]", type: 'editreply' }, interaction)

    function wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    client.embed({
        title: '💻・Piratage',
        desc: `Le piratage de ${user} a commencé....`,
        type: 'editreply'
    }, interaction).then(msg => {

        wait(140);
        client.embed({
            title: '💻・Piratage',
            desc: `Recherche d'informations sur l'utilisateur...`,
            type: 'edit',
        }, msg).then(i => {

            wait(133);
            client.embed({
                title: '💻・Piratage',
                desc: `Recherche d'une adresse IP...`,
                type: 'edit',
            }, msg).then(i => {

                wait(140);
                client.embed({
                    title: '💻・Piratage',
                    desc: `L'adresse IP de l'utilisateur a été trouvée !`,
                    fields: [
                        {
                            name: '🔗┆Adresse IP',
                            value: `\`\`\`127.0.0.1\`\`\``,
                            inline: true,
                        }
                    ],
                    type: 'edit',
                }, msg).then(i => {

                    wait(60);
                    client.embed({
                        title: '💻・Piratage',
                        desc: `Recherche de l'identifiant Discord...`,
                        type: 'edit',
                    }, msg).then(i => {

                        wait(230);
                        client.embed({
                            title: '💻・Piratage',
                            desc: `Le login discord de l'utilisateur a été trouvé !`,
                            fields: [
                                {
                                    name: '📨┆Email',
                                    value: `\`\`\`${user.username}2000@gmail.com\`\`\``
                                },
                                {
                                    name: '🔑┆Mot de passe',
                                    value: `\`\`\`${password}\`\`\``
                                }
                            ],
                            type: 'edit',
                        }, msg).then(i => {

                            wait(200);
                            client.embed({
                                title: '💻・Piratage',
                                desc: `Recherche de son token Discord...`,
                                type: 'edit'
                            }, msg).then(i => {

                                wait(200);
                                fetch(`https://some-random-api.ml/bottoken`).then((res) => res.json()).catch({}).then(async (json) => {
                                    client.embed({
                                        title: '💻・Piratage',
                                        desc: `Le token du compte discord de l'utilisateur a été trouvé !`,
                                        fields: [
                                            {
                                                name: '🔧┆Token',
                                                value: `\`\`\`${json.token}\`\`\``,
                                                inline: true
                                            }
                                        ],
                                        type: 'edit',
                                    }, msg).then(i => {

                                        wait(140);
                                        client.embed({
                                            title: '💻・Piratage',
                                            desc: `Signaler le compte à Discord pour avoir enfreint les TOS...`,
                                            type: 'edit',
                                        }, msg).then(i => {

                                            wait(180);
                                            client.succNormal({ text: `${user} a été piraté avec succès. Toutes les informations de l'utilisateur vous ont été envoyées en MP.`, type: 'edit' }, msg);
                                            client.embed({
                                                title: '😂・Pranked',
                                                image: "https://media1.tenor.com/images/05006ed09075a0d6965383797c3cea00/tenor.gif?itemid=17987788",
                                            }, interaction.user)
                                        })
                                    })
                                }).catch({})
                            })
                        })
                    })
                })
            })
        })
    })

}

 