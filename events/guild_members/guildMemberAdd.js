const { MessageEmbed } = require('discord.js');
let config = require('../../config.json');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member, message) {
        const fetchGuild = await client.getGuild(member.guild);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setColor('#4951B2')
            .setDescription(`· Nom d'utilisatteur : ${member}
        · ID : ${member.id}
        · Créé le : <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
        · Rejoint le : <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
        `)
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

        const bvnEmbed = new MessageEmbed()
            .setTitle(`Un nouvel Astronaute a rejoint nos îles !`)
            .setColor('#4F2CDA')
            .setDescription(`**Bienvenue à toi \`${member.user.tag}\` ! \n\nPour avoir accès au serveur tu dois prendre connaissance des règles. Change ton nom et ton prénom directement sous peine d'être kick.**`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });

        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({ embeds: [embed] });

        const bvnChannel = member.guild.channels.cache.get(fetchGuild.bvnChannel);
        bvnChannel.send({ embeds: [bvnEmbed] });

        var role = member.guild.roles.cache.find(role => role.name == "Aztralya's Identity")
        member.roles.add('992439608086384710');

        const dmEmbed = new MessageEmbed()
            .setTitle(`Hello \`${member.user.username}\`, bienvenue sur Aztralya !`)
            .setColor('#4F2CDA')
            .setThumbnail(config.SERVER_LOGO)
            .setDescription(`**S'il te plaît, pense à changer ton prénom et nom roleplay sous peine d'être kick par le staff. Bonne aventure parmis nous !**`)
            .setTimestamp()
            .setFooter({ text: 'azRobot', iconURL: `${config.SERVER_LOGO}` });
        member.send({ embeds: [dmEmbed] });

        member.setNickname('[Prénom + Nom]');
    }
};