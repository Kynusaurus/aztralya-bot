let config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
let PlayerCount = require('../../server/players');

module.exports = {
    name: 'playerlist',
    category: 'admin',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'playerlist',
    examples: ['playerlist'],
    description: 'La commande playerlist permet de voir la liste des joueurs connectés.',

    async run(client, message, args) {

        PlayerCount.getPlayerCount().then((result) => {

            let list = result.data;
            var id = "";
            var players = "";
            var ping = ""
            for (var i = 0; i < list.length; i++) {
                id += list[i].id + '\n';
                players += list[i].name + '\n';
                ping += list[i].ping + '\n';

            }
            const pListEmbed = new MessageEmbed()
                .setColor('#4F2CDA')
                .setTitle('Liste des joueurs en jeu')
                .setDescription(`Joueurs sur le serveur : ${list.length}`)
                .setThumbnail(config.SERVER_LOGO)
                .addFields(
                    { name: '🆔', value: id, inline: true },
                    { name: '🚻', value: players, inline: true },
                    { name: '📶', value: `${ping}`, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });
            message.channel.send({ embeds: [pListEmbed] });


        })
            .catch(function () {
                const errpListEmbed = new MessageEmbed()
                    .setColor('#4F2CDA')
                    .setTitle('Liste des joueurs en jeu')
                    .setDescription(`Joueurs sur le serveur : 0`)
                    .setThumbnail(config.SERVER_LOGO)
                    .addFields(
                        { name: '🆔', value: 'Aucun', inline: true },
                        { name: '🚻', value: 'Aucun', inline: true },
                        { name: '📶', value: 'Aucun', inline: true },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });
                message.channel.send({ embeds: [errpListEmbed] });
            })

    },
};