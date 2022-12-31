const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client) => {
  const activities = [
        { name: `${client.guilds.cache.size} Serveurs`, type: 2 }, // LISTENING
//      { name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
        { name: `${client.users.cache.size} Utilisateurs`, type: 3 }, // WATCHING
    ];
    const status = [
        'online'
    ];
    let i = 0;
    setInterval(() => {
        if(i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++;
    }, 5000);
  
    let s = 0;
    setInterval(() => {
        if(s >= activities.length) s = 0
        client.user.setStatus(status[s])
        s++;
    }, 30000);

    client.player.init(client.user.id);    
  console.log(chalk.blue(chalk.bold(`Le système`)), (chalk.white(`>>`)), chalk.red(`${client.user.username}`), chalk.green(`est prêt !`))
}

 