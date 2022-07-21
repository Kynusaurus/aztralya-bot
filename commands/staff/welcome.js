const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let config = require('../../config.json');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept-button')
            .setLabel('Accepter le règlement')
            .setStyle('PRIMARY'),
    )

const welcomeEmbed = new MessageEmbed()
    .setTitle('Règlement du serveur.')
    .setURL('https://wiki.aztralya.com')
    .setColor('#4F2CDA')
    .setDescription(`**Voici le règlement à jour d'Aztralya, il est fortement conseillé de connaître les règles du serveur sous peine de sanctions. \n
    Nous considérons que tu as lu le règlement et que tu l'as bien compris dès que tu acceptes ce dernier.\n
    Si le règlement n'est pas respecté, tu feras l'objet d'un avertissement ou d'un ban permanent ou non.\n
    Le règlement peut être modifié n'importe quels moments, tu seras informé sur le salon <#908578418503847956>.\n
    Si tu as le moindre problème, nous sommes à ta disposition via les <#908568611675852810>, cependant les tickets sans un minimum de politesse et de bon sens seront supprimés instantanément. \n
    L'équipe d'Aztralya te souhaite une bonne aventure parmi nous.**`)
    .setTimestamp()
    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

module.exports = {
    name: 'welcome',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'welcome',
    examples: ['welcome'],
    description: 'La commande welcome permet d\'envoyer l\'embed des règle du serveur.',
    async run(client, message, args) {
        await message.channel.send({ embeds: [welcomeEmbed], components: [buttons] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    },
};