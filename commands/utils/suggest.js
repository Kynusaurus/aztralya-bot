let config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'suggest [question]',
    examples: ['suggest Quelle est votre planète préférée ?'],
    description: 'La commande suggest permet de créer une suggestion/sondage.',

    async run(client, message, args) {
        if (message.channel.id === config.CHANNELS_ID.SUGGESTIONS) {

            let suggestion = args.join(" ");
            if (!suggestion) {
                const emptyEmbed = new MessageEmbed()
                    .setTitle("Oups!")
                    .setColor('#4F2CDA')
                    .setDescription(`Hello <@${message.author.id}>, spécifie ta suggestion !`)
                await message.reply({ embeds: [emptyEmbed] }).then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 4000);
                });
                message.delete();
            }
            else {
                const SuggestEmbed = new MessageEmbed()
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                    .setColor('#4F2CDA')
                    .setTitle(`Nouvelle suggestion d'un Astronaute !`)
                    .setDescription("```\n " + suggestion + "\n```")
                    .setTimestamp()
                    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });
                const sug = await message.reply({ embeds: [SuggestEmbed] });
                sug.react('👍');
                sug.react('👎');

            }

        } 

    }
};