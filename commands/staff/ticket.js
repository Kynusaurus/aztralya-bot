const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let config = require('../../config.json');

const ticketButtons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('ticket-button')
            .setLabel('Ouvrir un ticket')
            .setEmoji('📩')
            .setStyle('PRIMARY'),
    )

const ticketEmbed = new MessageEmbed()
    .setTitle('Ouvrir un ticket')
    .setColor('#4F2CDA')
    .setThumbnail(config.SERVER_LOGO)
    .setDescription(`**Appuie sur le bouton ci-dessous pour ouvrir un ticket. S'il te plaît, utilise les tickets uniquement si tu n'as pas d'autres solutions. 
    Si tu as besoin d'aide, le salon <#908569072269144084> est fait pour ça. \n
    Un minimum de politesse est demandée, le <@&992076481381543997> se donne le droit de fermer ton ticket sans réponse.
    Merci de ta compréhension.**`)
    .setTimestamp()
    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

module.exports = {
    name: 'ticket',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ticket',
    examples: ['ticket'],
    description: 'La commande ticket permet d\'envoyer l\'embed de ticket.',
    async run(client, message, args) {
        await message.channel.send({ embeds: [ticketEmbed], components: [ticketButtons] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds: [ticketEmbed], components: [ticketButtons] });
    },
};