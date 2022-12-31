const { CommandInteraction, Client } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ChannelType } = require("discord-api-types/v9");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Générer un embed")
    .addChannelOption((option) =>
      option
        .setName("salon")
        .setDescription("Le salon où l'embed doit être posté")
        .setRequired(true)
        .addChannelType(ChannelType.GuildText)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    const perms = await client.checkPerms(
      {
        flags: [Discord.Permissions.FLAGS.MANAGE_MESSAGES],
        perms: ["MANAGE_MESSAGES"],
      },
      interaction
    );

    if (perms == false) return;

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("embedSelect")
        .setPlaceholder("Rien de sélectionné")
        .addOptions([
          {
            emoji: "✏️",
            label: "Titre",
            description: "Créer un titre pour votre embed",
            value: "title_embed",
          },
          {
            emoji: "💬",
            label: "Description",
            description: "Créer une description pour votre embed",
            value: "description_embed",
          },
          {
            emoji: "🕵️",
            label: "Auteur",
            description: "Créer un auteur pour votre embed",
            value: "author_embed",
          },
          {
            emoji: "🔻",
            label: "Pied de page",
            description: "Créer un en-tête pour votre embed",
            value: "footer_embed",
          },
          {
            emoji: "🔳",
            label: "Vignette",
            description: "Créer une vignette pour votre embed",
            value: "thumbnail_embed",
          },
          {
            emoji: "🕙",
            label: "Timestamp",
            description: "Créer un horodatage pour votre embed",
            value: "timestamp_embed",
          },
          {
            emoji: "🖼️",
            label: "Image",
            description: "Créer une image pour votre embed",
            value: "image_embed",
          },
          {
            emoji: "🌐",
            label: "URL",
            description: "Créer une url pour votre embed",
            value: "url_embed",
          },
          {
            emoji: "🔵",
            label: "Couleur",
            description: "Choisissez une couleur pour votre embed",
            value: "color_embed",
          },
        ])
    );

    let row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("send_embed")
        .setEmoji("✅")
        .setLabel("Embed envoyé")
        .setStyle("SUCCÈS")
    );

    let embed = new Discord.MessageEmbed().setDescription(
      `Veuillez sélectionner quelques options`
    );

    interaction.editReply({ embeds: [embed], components: [row, row2] });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "embedSelect") {
        i.deferUpdate();
        const embedData = i.message.embeds[0];
        if (embedData.description == "Veuillez sélectionner quelques options") {
          embed.setDescription(``);
        }

        if (i.values == "title_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un titre" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  embed.setTitle(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "description_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une description" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  embed.setDescription(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "author_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un auteur" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  embed.setAuthor({
                    name: `${collected.first().content}`,
                    iconURL: interaction.guild.iconURL({ size: 1024 }),
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "footer_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un pied de page" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  embed.setFooter({
                    text: `${collected.first().content}`,
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une vignette" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Lien de vignette incorrect !",
                    });
                  embed.setThumbnail(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          embed.setTimestamp();
          interaction.editReply({ embeds: [embed] });
        }

        if (i.values == "image_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une image" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Lien d'image incorrect !",
                    });
                  embed.setImage(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "url_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un url" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Url incorrecte !",
                    });
                  embed.setURL(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "color_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une couleur" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.first().delete({ timeout: 1000 });

                  embed.setColor(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }
      }
      if (i.customId == "send_embed") {
        const channel = interaction.options.getChannel("salon");
        if (!channel)
          return client.errNormal(
            { error: `Salon non trouvé` },
            collected.first().channel
          );

        channel
          .createWebhook(interaction.guild.name, {
            avatar: interaction.guild.iconURL(),
          })
          .then(async (_webhook) => {
            await _webhook.send({ embeds: [embed] });

            client.succNormal(
              {
                text: `Envoi réussi de l'embed dans ${channel}`,
                components: [],
                type: "editreply",
              },
              interaction
            );
            collector.stop();

            setTimeout(() => {
              _webhook.delete();
              i.message.delete();
            }, 5000);
          });
      }
    });
  },
};

 
