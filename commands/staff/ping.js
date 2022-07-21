const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'staff',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: 'La commande ping envoie la latence de azRobot et de l\`API.',
    async run(client, message, args) {
        const tryPong = await message.channel.send('On essaye de pong... un instant !');

        const emded = new MessageEmbed()
            .setTitle('Le ping de azRobot')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true, },
                { name: "Latence BOT", value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true, }
            )
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

        tryPong.edit({ content: ' ', embeds: [emded] });
    },
    async runInteraction(client, interaction) {
        const tryPong = await interaction.reply({
            content: "On essaye de pong... un instant!",
            fetchReply: true,
        });

        const embed = new MessageEmbed()
            .setTitle('Le ping de azRobot')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true, },
                { name: "Latence BOT", value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true, }
            )
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

        interaction.editReply({ content: ' ', embeds: [embed] });
    },
};
