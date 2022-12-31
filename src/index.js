const Discord = require('discord.js');
const chalk = require('chalk');
require('dotenv').config();
const express = require('express')
const app = express()
app.get('/', function (req, res) {
res.send('Hello World')
})
app.listen(3000)
const webhook = require("./config/webhooks.json");
const config = require("./config/bot.js");

const startLogs = new Discord.WebhookClient({
    id: webhook.startLogs.id,
    token: webhook.startLogs.token,
});

const shardLogs = new Discord.WebhookClient({
    id: webhook.shardLogs.id,
    token: webhook.shardLogs.token,
});

const manager = new Discord.ShardingManager('./src/bot.js', {
    totalShards: 2,
    token: process.env.DISCORD_TOKEN,
    respawn: true
});

// const { AutoPoster } = require('topgg-autoposter');
// const poster = AutoPoster(process.env.TOPGG_TOKEN, manager);

console.clear();
console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), (chalk.green(`Démarrage`)), (chalk.white(`...`)))
console.log(`\u001b[0m`)
console.log(chalk.red(`© Uo | 2021 - ${new Date().getFullYear()}`))
console.log(chalk.red(`All rights reserved`))
console.log(`\u001b[0m`)
console.log(`\u001b[0m`)
console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version}`), (chalk.green(`chargé`)))
console.log(`\u001b[0m`);

manager.on('shardCreate', shard => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`🆙・Lancement du shard`)
        .setDescription(`Un shard vient de s'être lancé`)
        .addField("🆔┆ID", `${shard.id + 1}/${manager.totalShards}`, true)
        .addField(`📃┆État`, `Démarrage...`, true)
        .setColor(config.colors.normal)
    startLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });

    console.log(chalk.blue(chalk.bold(`System`)), (chalk.white(`>>`)), (chalk.green(`Starting`)), chalk.red(`Shard #${shard.id + 1}`), (chalk.white(`...`)))
    console.log(`\u001b[0m`);

    shard.on("death", (process) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`🚨・Fermeture du shard ${shard.id + 1}/${manager.totalShards} de façon inattendue`)
            .addFields("PID", `\`${process.pid}\``)
            .addFields("Code de sortie", `\`${process.exitCode}\``)
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed]
        });

        if (process.exitCode === null) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`🚨・Shard ${shard.id + 1}/${manager.totalShards} a cessé de fonctionner avec le code d'erreur NULL !`)
                .addFields("PID", `\`${process.pid}\``)
                .addFields("Code de sortie", `\`${process.exitCode}\``)
                .setColor(config.colors.normal)
            shardLogs.send({
                username: 'Bot Logs',
                embeds: [embed]
            });
        }
    });

    shard.on("shardDisconnect", (event) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`🚨・Shard ${shard.id + 1}/${manager.totalShards} déconnecté`)
            .setDescription("Dumping socket close event...")
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed],
        });
    });

    shard.on("shardReconnecting", () => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`🚨・Reconnexion au shard ${shard.id + 1}/${manager.totalShards}`)
            .setColor(config.colors.normal)
        shardLogs.send({
            username: 'Bot Logs',
            embeds: [embed],
        });
    });
});


manager.spawn();

 