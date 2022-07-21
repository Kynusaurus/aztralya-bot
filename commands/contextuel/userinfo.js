const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'Utiliser le menu contexttuel de Discord!',
    examples: ['Utiliser le menu contexttuel de Discord!'],
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const emded = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://cdn.top-serveurs.net/avatars/62aa50ec33e1f.png' : 'https://cdn.top-serveurs.net/avatars/62aa50ec33e1f.png' })
            .setColor('#4F2CDA')
            .setImage(member.user.displayAvatarURL())
            .addFields(
                { name: 'Pseudo', value: `${member.displayName}`, inline: true },
                { name: 'Staff', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true },
                { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', '')}` },
                { name: 'A créé son compte le :', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                { name: 'A rejoint le serveur le :', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
            )


        interaction.reply({ embeds: [emded], ephemeral: true });

    },
};
