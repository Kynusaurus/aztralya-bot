const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let config = require('../../config.json');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept2-button')
            .setLabel('Accepter')
            .setStyle('PRIMARY'),
    )

const welcomeEmbed = new MessageEmbed()
    .setTitle('Identité du serveur.')

    .setColor('#4F2CDA')
    .setDescription(`**Pour être considéré comme joueurs acceptés tu dois changer ton \`[prénom et nom]\` sur Discord avec le même qu'en jeu et bien évidemment lire le <#908575756433620992> du serveur. \n
    Un panel de connexion est en construction pour donner des avantages aux joueurs semi-whitelist, tu seras mis au courant sans le salon <#908578388111941652>.\n
    Au moment où tu acceptes les règles du serveur, le <@&992076481381543997> prends en compte tes choix, si ce dernier n'est pas respecté, tu subiras des conséquences allant jusqu'au bannissement du serveur définitif.\n
    Si tu as le moindre problème, nous sommes à ta disposition.
    
    L'équipe d'Aztralya te souhaite une bonne aventure parmi nous.**`)
    .setTimestamp()
    .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

module.exports = {
    name: 'welcome2',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'welcome2',
    examples: ['welcome2'],
    description: 'La commande welcome2 permet d\'envoyer l\'embed des règle du serveur.',
    async run(client, message, args) {
        await message.channel.send({ embeds: [welcomeEmbed], components: [buttons] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds: [welcomeEmbed], components: [buttons] });
    },
};