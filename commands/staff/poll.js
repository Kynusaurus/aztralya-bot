let config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'poll [question]',
    examples: ['poll', 'poll Quelle est votre planète préférée ?'],
    description: 'La commande poll permet de créer un sondage.',
    async run(client, message, args) {
        if (message.channel.id === config.CHANNELS_ID.SONDAGES) {

            let suggestion = args.join(" ");
            if (!suggestion) {
                const emptyEmbed = new MessageEmbed()
                    .setTitle("Oups!")
                    .setColor('#4F2CDA')
                    .setDescription(`Hello <@${message.author.id}>, spécifie ton sondage !`)
                await message.reply({ embeds: [emptyEmbed] }).then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 4000);
                });
                message.delete();
            }
            else {
                const pollEmbed = new MessageEmbed()
                    .setColor('#4F2CDA')
                    .setTitle(`Nouveau sondage du staff !`)
                    .setDescription("```\n " + suggestion + "\n```")
                    .setTimestamp()
                    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });
                const poll = await message.reply({ embeds: [pollEmbed] });
                poll.react('👍');
                poll.react('👎');

            }

        } 

    }
};