let config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
let PlayerCount = require('../../server/players');


module.exports = {
    name: 'status',
    category: 'admin',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'status',
    examples: ['status'],
    description: 'La commande status permet de voir le status du serveur en temps réel.',
    async run(client, message, args) {
        PlayerCount.getPlayerCount().then((result) => {

            if (result.status === 200) {
                const onlineEmbed = new MessageEmbed()
                    .setColor('#4F2CDA')
                    .setTitle('Aztralya')
                    .setDescription(`**CONNEXION :** \`${config.SERVER_URL}\` \n **MOT DE PASSE :** \`az_pass!\``)
                    .setThumbnail(config.SERVER_LOGO)
                    .addField('Status du serveur :', '🟩 ㅤLe serveur est actuellement en ligne !', true)
                    .setTimestamp()
                    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

                message.channel.send({ embeds: [onlineEmbed] });
            }


        })
            .catch(function () {
                const offlineEmbed = new MessageEmbed()
                    .setColor('#4F2CDA')
                    .setTitle('Aztralya')
                    .setDescription(`**CONNEXION :** \`${config.SERVER_URL}\` \n **MOT DE PASSE :** \`az_pass!\``)
                    .setThumbnail(config.SERVER_LOGO)
                    .addField('Status du serveur :', '🟥 ㅤLe serveur est actuellement en hors ligne !', true)
                    .setTimestamp()
                    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

                message.channel.send({ embeds: [offlineEmbed] });
            })

    },

};